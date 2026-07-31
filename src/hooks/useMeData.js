import { useEffect, useState } from 'react'
import { meFallback } from '../data/me'

const DATA_URL = `${import.meta.env.BASE_URL}data/me.json`

/** Merge the fetched payload over the fallback so a missing section never crashes a widget. */
const merge = (payload) => ({
  ...meFallback,
  ...payload,
  book: payload.book || meFallback.book,
  quotes: payload.quotes?.items?.length ? payload.quotes : meFallback.quotes,
  movie: payload.movie || meFallback.movie,
  spotify: payload.spotify?.tracks?.length ? payload.spotify : meFallback.spotify,
  pinterest: payload.pinterest || meFallback.pinterest,
  sources: payload.sources || {}
})

/**
 * Loads public/data/me.json — the file the "Refresh Me! carousel data" Action
 * regenerates from Goodreads, Spotify, Letterboxd and Pinterest.
 */
export const useMeData = () => {
  const [data, setData] = useState(meFallback)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    fetch(DATA_URL, { signal: controller.signal, cache: 'no-cache' })
      .then((response) => {
        if (!response.ok) throw new Error(`me.json responded ${response.status}`)
        return response.json()
      })
      .then((payload) => {
        setData(merge(payload))
        setStatus('ready')
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        console.warn('[me] falling back to bundled data:', error.message)
        setStatus('error')
      })

    return () => controller.abort()
  }, [])

  return { data, status }
}

export default useMeData
