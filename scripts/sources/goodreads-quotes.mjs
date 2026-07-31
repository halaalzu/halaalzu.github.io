// Every quote saved on the public Goodreads "my quotes" page.
//
// There is a quotes RSS feed (/quotes/list_rss/<id>), but it only carries the
// text and the author — the book a quote comes from lives in the HTML list, and
// the hero wants "Author (Book)". So we parse the HTML instead, one page at a
// time, and pull the numeric book id out of the `quote_book_link_<id>` span
// (that id is the /book/show/ id, unlike the /work/quotes/ href beside it).

import { fetchText, decodeEntities } from '../lib/rss.mjs'
import { resolveUserId } from './goodreads.mjs'

const BASE = 'https://www.goodreads.com'
const MAX_PAGES = 20 // ~20 quotes per page; a guard, not an expected limit

/** Absolute URL for a Goodreads href, which comes back site-relative. */
const absolute = (href) => (href?.startsWith('http') ? href : `${BASE}${href}`)

/** Markup blob → plain text, keeping the line breaks the quote was written with. */
const toText = (html) =>
  decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .trim()

const parseQuote = (chunk) => {
  const quoteBlock = chunk.match(/<div class="quoteText">([\s\S]*?)(?:<script|<\/div>)/i)?.[1]
  if (!quoteBlock) return null

  // Structure: text <br /> &#8213; <span class="authorOrTitle">Author,</span>
  //            <span id=quote_book_link_ID><a ...>Book</a></span>
  // The quote text itself can contain <br />, so split on the ― separator
  // rather than on the first line break.
  const separator = quoteBlock.search(/&#8213;|―/)
  if (separator === -1) return null

  const body = quoteBlock.slice(0, separator)
  const attribution = quoteBlock.slice(separator)

  const text = toText(body)
    .replace(/\n?―\s*$/, '')
    .replace(/^[“"']+|[”"']+$/g, '')
    .trim()
  if (!text) return null

  const author = toText(
    attribution.match(/<span class="authorOrTitle">([\s\S]*?)<\/span>/i)?.[1] || ''
  ).replace(/,$/, '')

  const bookMatch = attribution.match(
    /<span id=["']?quote_book_link_(\d+)["']?[^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/i
  )
  const book = bookMatch
    ? { title: toText(bookMatch[2]), id: bookMatch[1], link: `${BASE}/book/show/${bookMatch[1]}` }
    : null

  const permalink = chunk.match(/href="(\/quotes\/[^"]+)"[^>]*>\s*[\d,]+ likes/i)?.[1]
  const authorPath = chunk.match(/href="(\/author\/show\/[^"]+)"/i)?.[1]

  return {
    text,
    author: author || null,
    authorLink: authorPath ? absolute(authorPath) : null,
    book: book?.title ? book : null,
    link: permalink ? absolute(permalink) : null
  }
}

/** One page of the list → the quotes on it, in the order Goodreads shows them. */
const parsePage = (html) =>
  html
    .split('userQuoteContainer')
    .slice(1)
    .map(parseQuote)
    .filter(Boolean)

export const fetchGoodreadsQuotes = async ({ user, limit = 60 }) => {
  if (!user) throw new Error('missing Goodreads user')

  const userId = await resolveUserId(user)
  const profile = `${BASE}/quotes/list/${userId}`
  const quotes = []
  const seen = new Set()

  for (let page = 1; page <= MAX_PAGES && quotes.length < limit; page += 1) {
    const html = await fetchText(`${profile}?page=${page}`)
    const parsed = parsePage(html)
    if (!parsed.length) break

    // Past the last page Goodreads re-serves the final one, so stop on repeats.
    const fresh = parsed.filter((quote) => {
      const key = quote.link || quote.text
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    if (!fresh.length) break

    quotes.push(...fresh)
  }

  if (!quotes.length) throw new Error('no saved quotes found (is the profile private?)')

  return {
    items: quotes.slice(0, limit),
    profile: `${BASE}/${encodeURIComponent(user)}`
  }
}
