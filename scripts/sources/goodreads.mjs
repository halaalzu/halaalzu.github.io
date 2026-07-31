// Currently-reading shelf via Goodreads' public per-shelf RSS feed.
// No API key needed, but the feed is keyed by numeric user id, so we resolve
// the vanity profile URL (goodreads.com/halaalzu) to that id first.

import { fetchText, feedItems, tag, firstImage } from '../lib/rss.mjs'

export const resolveUserId = async (user) => {
  if (/^\d+$/.test(user)) return user

  const html = await fetchText(`https://www.goodreads.com/${encodeURIComponent(user)}`)
  const match = html.match(/goodreads\.com\/user\/show\/(\d+)/)
  if (!match) {
    throw new Error(`could not resolve a numeric Goodreads id for "${user}"`)
  }
  return match[1]
}

const bestCover = (block) =>
  tag(block, 'book_large_image_url') ||
  tag(block, 'book_medium_image_url') ||
  tag(block, 'book_image_url') ||
  firstImage(tag(block, 'description'))

export const fetchGoodreads = async ({ user, shelf = 'currently-reading' }) => {
  if (!user) throw new Error('missing Goodreads user')

  const userId = await resolveUserId(user)
  const xml = await fetchText(
    `https://www.goodreads.com/review/list_rss/${userId}?shelf=${encodeURIComponent(shelf)}&sort=date_added&order=d`
  )

  const [item] = feedItems(xml)
  if (!item) throw new Error(`the "${shelf}" shelf is empty or private`)

  const title = tag(item, 'title')
  if (!title) throw new Error('feed item had no title')

  return {
    title,
    author: tag(item, 'author_name'),
    cover: bestCover(item),
    link: tag(item, 'link') || `https://www.goodreads.com/${encodeURIComponent(user)}`,
    profile: `https://www.goodreads.com/${encodeURIComponent(user)}`,
    shelf
  }
}
