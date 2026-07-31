#!/usr/bin/env node
// One-time helper: mints the long-lived Spotify refresh token used by the
// GitHub Action, and writes it straight into .env.local (gitignored).
//
//   1. Create an app at https://developer.spotify.com/dashboard
//   2. Add this exact redirect URI to it: http://127.0.0.1:8888/callback
//   3. Put the credentials in .env.local:
//        SPOTIFY_CLIENT_ID=...
//        SPOTIFY_CLIENT_SECRET=...
//   4. npm run me:spotify-auth

import http from 'node:http'
import { loadEnv, saveEnv } from './lib/env.mjs'

loadEnv()

const PORT = 8888
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`
const SCOPES = [
  'user-top-read', // top tracks of the month
  'user-read-recently-played', // fallback when the top list is empty
  'user-read-currently-playing' // "now playing" flag
].join(' ')

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

if (!clientId || !clientSecret) {
  console.error(
    'Missing credentials. Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to .env.local first.'
  )
  process.exit(1)
}

const authorizeUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    show_dialog: 'true'
  })

const exchange = async (code) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    })
  })

  const body = await response.json()
  if (!response.ok) throw new Error(body.error_description || body.error || 'token exchange failed')
  return body
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`)
  if (url.pathname !== '/callback') {
    res.writeHead(404).end('not found')
    return
  }

  const error = url.searchParams.get('error')
  const code = url.searchParams.get('code')

  if (error || !code) {
    res.writeHead(400, { 'content-type': 'text/plain' }).end(`Spotify returned: ${error || 'no code'}`)
    server.close()
    process.exitCode = 1
    return
  }

  try {
    const tokens = await exchange(code)
    const file = saveEnv('SPOTIFY_REFRESH_TOKEN', tokens.refresh_token)

    res.writeHead(200, { 'content-type': 'text/html' }).end(
      '<h1>Connected.</h1><p>Refresh token saved to .env.local. You can close this tab.</p>'
    )

    console.log(`\n✓ Saved SPOTIFY_REFRESH_TOKEN to ${file}`)
    console.log('  Next: npm run me:fetch')
    console.log('  For CI, copy that value into the SPOTIFY_REFRESH_TOKEN repository secret.\n')
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' }).end(String(err.message))
    console.error(err)
    process.exitCode = 1
  } finally {
    server.close()
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log('Open this URL, approve access, then come back here:\n')
  console.log(authorizeUrl.toString())
  console.log('')
})
