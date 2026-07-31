// Most recently watched film via Letterboxd's public member RSS feed.
// The feed mixes diary entries with list/review posts, so we keep only the
// items that carry <letterboxd:filmTitle>.

import { fetchText, feedItems, tag, firstImage } from '../lib/rss.mjs'

// Letterboxd serves a small poster in the RSS description; bump the crop up.
const upscalePoster = (url) =>
  url ? url.replace(/-0-\d+-0-\d+-crop/, '-0-460-0-690-crop') : null

const ratingToStars = (value) => {
  const rating = Number(value)
  if (!Number.isFinite(rating) || rating <= 0) return null
  const full = Math.floor(rating)
  return '★'.repeat(full) + (rating - full >= 0.5 ? '½' : '')
}

export const fetchLetterboxd = async ({ user }) => {
  if (!user) throw new Error('missing Letterboxd user')

  const xml = await fetchText(`https://letterboxd.com/${encodeURIComponent(user)}/rss/`)

  const item = feedItems(xml).find((block) => tag(block, 'letterboxd:filmTitle'))
  if (!item) throw new Error('no film entries in the feed yet')

  const title = tag(item, 'letterboxd:filmTitle')

  return {
    title,
    year: tag(item, 'letterboxd:filmYear'),
    rating: ratingToStars(tag(item, 'letterboxd:memberRating')),
    watchedAt: tag(item, 'letterboxd:watchedDate') || tag(item, 'pubDate'),
    poster: upscalePoster(firstImage(tag(item, 'description'))),
    link: tag(item, 'link') || `https://letterboxd.com/${encodeURIComponent(user)}/films/`,
    profile: `https://letterboxd.com/${encodeURIComponent(user)}/`
  }
}
