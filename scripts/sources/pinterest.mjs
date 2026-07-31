// Recently saved pins via Pinterest's public RSS feeds.
// This is the only no-OAuth way to read saves; if Pinterest ever drops it the
// build keeps the previous pins (see the merge in fetch-me-data.mjs).
//
// Two feed shapes exist:
//   https://www.pinterest.com/<user>/feed.rss          all recent saves
//   https://www.pinterest.com/<user>/<board>/rss/      a single board
// Set PINTEREST_BOARD to pin the carousel to one board.

import { fetchText, feedItems, tag, firstImage } from '../lib/rss.mjs'

// i.pinimg.com serves the same image at several widths; the feed hands back
// the 236px thumbnail, which is too small for a 220px-wide polaroid on retina.
const upscale = (url) => (url ? url.replace(/\/\d+x\d*\//, '/564x/') : null)

// Pin captions can be an entire recipe; they are only used as hover text.
const shorten = (title) =>
  !title ? null : title.length > 90 ? `${title.slice(0, 89).trimEnd()}…` : title

const parsePins = (xml, { profile, limit }) =>
  feedItems(xml)
    .map((block) => ({
      image: upscale(firstImage(tag(block, 'description'))),
      link: tag(block, 'link') || profile,
      title: shorten(tag(block, 'title'))
    }))
    .filter((pin) => pin.image)
    .slice(0, limit)

export const fetchPinterest = async ({ user, board = '', limit = 6 }) => {
  if (!user) throw new Error('missing Pinterest user')

  const profile = board
    ? `https://www.pinterest.com/${encodeURIComponent(user)}/${encodeURIComponent(board)}/`
    : `https://www.pinterest.com/${encodeURIComponent(user)}/`

  const feedUrl = board
    ? `${profile}rss/`
    : `https://www.pinterest.com/${encodeURIComponent(user)}/feed.rss`

  let xml
  try {
    xml = await fetchText(feedUrl)
  } catch (error) {
    if (String(error.message).startsWith('404')) {
      throw new Error(
        `no RSS feed at ${feedUrl} — check the username in your profile URL, and that the account is public`
      )
    }
    throw error
  }

  const pins = parsePins(xml, { profile, limit })
  if (!pins.length) throw new Error('feed had no pins with images')

  return { pins, profile }
}
