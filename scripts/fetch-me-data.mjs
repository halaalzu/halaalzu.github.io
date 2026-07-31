#!/usr/bin/env node
// Builds public/data/me.json — the data behind the "Me!" carousel on the home page.
//
// Run locally:  npm run me:fetch
// In CI:        .github/workflows/me-data.yml (cron + manual dispatch)
//
// Every source is independent and failure-tolerant: if one feed is down, its
// previous value is carried over from the existing me.json so a widget never
// goes blank because Pinterest had a bad afternoon.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

import { loadEnv, projectRoot as root } from './lib/env.mjs'
import { fetchGoodreads } from './sources/goodreads.mjs'
import { fetchGoodreadsQuotes } from './sources/goodreads-quotes.mjs'
import { fetchLetterboxd } from './sources/letterboxd.mjs'
import { fetchPinterest } from './sources/pinterest.mjs'
import { fetchSpotify } from './sources/spotify.mjs'

loadEnv() // local runs read credentials from .env.local; CI injects them directly

const OUTPUT = path.join(root, 'public', 'data', 'me.json')

const config = {
  goodreadsUser: process.env.GOODREADS_USER || 'halaalzu',
  goodreadsShelf: process.env.GOODREADS_SHELF || 'currently-reading',
  goodreadsQuoteLimit: Number(process.env.GOODREADS_QUOTE_LIMIT) || 60,
  letterboxdUser: process.env.LETTERBOXD_USER || 'halaalzu',
  pinterestUser: process.env.PINTEREST_USER || 'halaalzu',
  pinterestBoard: process.env.PINTEREST_BOARD || '',
  spotifyUser: process.env.SPOTIFY_USER || '',
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID || '',
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
  spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN || ''
}

const readPrevious = async () => {
  try {
    return JSON.parse(await readFile(OUTPUT, 'utf8'))
  } catch {
    return {}
  }
}

/**
 * Run one source. On success returns its value; on failure logs and returns the
 * previous value (flagged as stale) so the site keeps rendering something real.
 */
const withFallback = async (name, previousValue, run) => {
  try {
    const value = await run()
    console.log(`  ✓ ${name}`)
    return { value, status: { ok: true } }
  } catch (error) {
    const message = error?.message || String(error)
    console.warn(`  ✗ ${name}: ${message}`)
    return {
      value: previousValue ?? null,
      status: { ok: false, error: message, stale: Boolean(previousValue) }
    }
  }
}

const main = async () => {
  const previous = await readPrevious()
  console.log('Fetching "Me!" carousel data…')

  const [book, quotes, movie, pinterest, spotify] = await Promise.all([
    withFallback('goodreads', previous.book, () =>
      fetchGoodreads({ user: config.goodreadsUser, shelf: config.goodreadsShelf })
    ),
    withFallback('goodreads-quotes', previous.quotes, () =>
      fetchGoodreadsQuotes({ user: config.goodreadsUser, limit: config.goodreadsQuoteLimit })
    ),
    withFallback('letterboxd', previous.movie, () =>
      fetchLetterboxd({ user: config.letterboxdUser })
    ),
    withFallback('pinterest', previous.pinterest, () =>
      fetchPinterest({ user: config.pinterestUser, board: config.pinterestBoard })
    ),
    withFallback('spotify', previous.spotify, () =>
      fetchSpotify({
        clientId: config.spotifyClientId,
        clientSecret: config.spotifyClientSecret,
        refreshToken: config.spotifyRefreshToken,
        user: config.spotifyUser
      })
    )
  ])

  const payload = {
    updatedAt: new Date().toISOString(),
    book: book.value,
    quotes: quotes.value,
    movie: movie.value,
    spotify: spotify.value,
    pinterest: pinterest.value,
    sources: {
      goodreads: book.status,
      goodreadsQuotes: quotes.status,
      letterboxd: movie.status,
      spotify: spotify.status,
      pinterest: pinterest.status
    }
  }

  await mkdir(path.dirname(OUTPUT), { recursive: true })
  await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

  const failed = Object.entries(payload.sources).filter(([, s]) => !s.ok)
  console.log(`\nWrote ${path.relative(root, OUTPUT)}`)
  if (failed.length) {
    console.log(`${failed.length} source(s) fell back to the previous value: ${failed.map(([n]) => n).join(', ')}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
