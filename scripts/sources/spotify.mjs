// Top tracks of the last ~4 weeks via the Spotify Web API, so the carousel can
// cycle "my top 5 songs this month". Falls back to recently-played if the top
// list is empty (a brand new account, or not enough listening history yet).
//
// Uses the refresh-token grant so the Action never needs an interactive login:
// run `npm run me:spotify-auth` once to mint SPOTIFY_REFRESH_TOKEN.

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const API = 'https://api.spotify.com/v1'
// Spotify stopped returning preview_url for effectively everyone in Nov 2024
// (it's null on every track in practice now, regardless of app age). Apple's
// unauthenticated iTunes Search API still hands back a 30s preview clip for
// most mainstream tracks, so it's the fallback that keeps the vinyl playable.
const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search'

const formatDuration = (ms) => {
  if (!Number.isFinite(ms)) return null
  const total = Math.round(ms / 1000)
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}

const getAccessToken = async ({ clientId, clientSecret, refreshToken }) => {
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

const api = async (accessToken, path) => {
  const response = await fetch(`${API}${path}`, {
    headers: { authorization: `Bearer ${accessToken}` }
  })

  if (response.status === 204) return null // nothing playing
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}))
    throw new Error(
      `GET ${path} failed: ${response.status} ${detail.error?.message || response.statusText}`
    )
  }
  return response.json()
}

const fetchItunesPreview = async (artist, title) => {
  // "artist" can be several credits joined with ", " (e.g. a brand-tie-in
  // collab like "TUL8TE, Vodafone") — iTunes' search matches on all terms,
  // so a non-musical credit like a brand name zeroes out the results. Search
  // on the primary artist only.
  const primaryArtist = (artist || '').split(',')[0].trim()
  const term = `${primaryArtist} ${title}`
  const url = `${ITUNES_SEARCH_URL}?term=${encodeURIComponent(term)}&media=music&entity=song&limit=1`
  try {
    const response = await fetch(url)
    if (!response.ok) return null
    const body = await response.json()
    return body.results?.[0]?.previewUrl || null
  } catch {
    return null
  }
}

/** Spotify's preview_url is gone; fill the gap from iTunes so playback still works. */
const withPlayablePreview = async (track) => {
  if (track.previewUrl) return track
  const previewUrl = await fetchItunesPreview(track.artist, track.title)
  return previewUrl ? { ...track, previewUrl, previewSource: 'itunes' } : track
}

const normalizeTrack = (track, extra = {}) => ({
  title: track.name,
  artist: (track.artists || []).map((a) => a.name).join(', '),
  album: track.album?.name || null,
  art: track.album?.images?.[0]?.url || null,
  duration: formatDuration(track.duration_ms),
  previewUrl: track.preview_url || null,
  link: track.external_urls?.spotify || null,
  ...extra
})

export const fetchSpotify = async ({ clientId, clientSecret, refreshToken, user, limit = 5 }) => {
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET / SPOTIFY_REFRESH_TOKEN')
  }

  const accessToken = await getAccessToken({ clientId, clientSecret, refreshToken })

  // short_term ≈ the last 4 weeks, which is the "this month" list.
  const top = await api(accessToken, `/me/top/tracks?time_range=short_term&limit=${limit}`)

  let tracks = (top?.items || []).map((track, i) =>
    normalizeTrack(track, { rank: i + 1, range: 'month' })
  )

  if (!tracks.length) {
    const recent = await api(accessToken, `/me/player/recently-played?limit=${limit}`)
    const seen = new Set()
    tracks = (recent?.items || [])
      .map((entry) => entry.track)
      .filter((track) => {
        if (!track || seen.has(track.id)) return false
        seen.add(track.id)
        return true
      })
      .map((track, i) => normalizeTrack(track, { rank: i + 1, range: 'recent' }))
  }

  if (!tracks.length) throw new Error('no top or recent tracks returned')

  // Flag whichever of them is playing right now, if any.
  const current = await api(accessToken, '/me/player/currently-playing').catch(() => null)
  const currentUrl = current?.is_playing ? current.item?.external_urls?.spotify : null
  if (currentUrl) {
    tracks = tracks.map((track) => ({ ...track, isPlaying: track.link === currentUrl }))
  }

  tracks = await Promise.all(tracks.map(withPlayablePreview))

  return {
    tracks: tracks.slice(0, limit),
    range: tracks[0]?.range || 'month',
    profile: user ? `https://open.spotify.com/user/${encodeURIComponent(user)}` : 'https://open.spotify.com'
  }
}
