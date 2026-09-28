#!/usr/bin/env node
// Rebuilds a public "Top 10 This Month" playlist from the last ~4 weeks of
// listening (time_range=short_term). Run monthly by
// .github/workflows/top-playlist.yml, or by hand with:
//
//   npm run me:spotify-playlist
//
// Needs SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET / SPOTIFY_REFRESH_TOKEN with
// the playlist-modify-public scope (npm run me:spotify-auth mints this).

import { loadEnv } from './lib/env.mjs'

loadEnv()

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const API = 'https://api.spotify.com/v1'

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
const playlistName = process.env.SPOTIFY_PLAYLIST_NAME || 'Top 10 This Month'
const limit = Number(process.env.SPOTIFY_PLAYLIST_SIZE) || 10

if (!clientId || !clientSecret || !refreshToken) {
  console.error('Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET / SPOTIFY_REFRESH_TOKEN')
  process.exit(1)
}

const getAccessToken = async () => {
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken })
  })

  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(
      `token refresh failed: ${response.status} ${body.error_description || body.error || ''}`.trim()
    )
  }
  return body.access_token
}

const api = async (accessToken, method, path, body) => {
  const response = await fetch(path.startsWith('http') ? path : `${API}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })

  if (response.status === 204) return null
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(`${method} ${path} failed: ${response.status} ${data.error?.message || response.statusText}`)
  }
  return data
}

const findExistingPlaylist = async (accessToken) => {
  let url = `/me/playlists?limit=50`
  while (url) {
    const page = await api(accessToken, 'GET', url)
    const found = (page.items || []).find((p) => p.name === playlistName)
    if (found) return found.id
    url = page.next
  }
  return null
}

const main = async () => {
  const accessToken = await getAccessToken()

  const top = await api(accessToken, 'GET', `/me/top/tracks?time_range=short_term&limit=${limit}`)
  let tracks = top.items || []

  if (!tracks.length) {
    const recent = await api(accessToken, 'GET', `/me/player/recently-played?limit=${limit}`)
    const seen = new Set()
    tracks = (recent.items || [])
      .map((entry) => entry.track)
      .filter((track) => {
        if (!track || seen.has(track.id)) return false
        seen.add(track.id)
        return true
      })
  }

  if (!tracks.length) throw new Error('no top or recent tracks returned')

  const uris = tracks.slice(0, limit).map((t) => t.uri)

  let playlistId = await findExistingPlaylist(accessToken)

  if (!playlistId) {
    const created = await api(accessToken, 'POST', '/me/playlists', {
      name: playlistName,
      public: true,
      description: 'Auto-updated monthly with my top 10 tracks from the last 4 weeks.'
    })
    playlistId = created.id
    console.log(`Created playlist "${playlistName}" (${playlistId})`)
  }

  await api(accessToken, 'PUT', `/playlists/${playlistId}/items`, { uris })
  console.log(`Updated "${playlistName}" with ${uris.length} track(s):`)
  tracks.slice(0, limit).forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.name} — ${(t.artists || []).map((a) => a.name).join(', ')}`)
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
