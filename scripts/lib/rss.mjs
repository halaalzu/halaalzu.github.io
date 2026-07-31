// Tiny dependency-free helpers for reading RSS/Atom feeds.
// The feeds we hit (Goodreads, Letterboxd, Pinterest) are small and well-formed,
// so regex extraction is enough and keeps the Action install-free.

const stripCdata = (value) =>
  value
    .replace(/^\s*<!\[CDATA\[/, '')
    .replace(/\]\]>\s*$/, '')
    .trim()

const NAMED_ENTITIES = {
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ldquo: '“',
  rdquo: '”',
  lsquo: '‘',
  rsquo: '’',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  amp: '&'
}

export const decodeEntities = (value) =>
  value
    // numeric refs first (&#8213; &#x2015;), then named, &amp; last so that a
    // double-encoded "&amp;lt;" resolves the way the feed meant it to.
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => {
      const replacement = NAMED_ENTITIES[name.toLowerCase()]
      return replacement === undefined ? match : replacement
    })

/** Pull the text content of the first <name> tag inside a chunk of XML. */
export const tag = (block, name) => {
  const match = block.match(
    new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i')
  )
  if (!match) return null
  const text = decodeEntities(stripCdata(match[1]))
  return text.length ? text : null
}

/** Every <item> (RSS) or <entry> (Atom) block in a feed, in feed order. */
export const feedItems = (xml) => {
  const rss = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((m) => m[0])
  if (rss.length) return rss
  return [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((m) => m[0])
}

/** First <img src="..."> inside an (entity-decoded) description blob. */
export const firstImage = (html) => {
  if (!html) return null
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : null
}

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36'

/** GET a URL as text, with a browser UA (several of these hosts 403 bare fetches). */
export const fetchText = async (url, init = {}) => {
  const response = await fetch(url, {
    ...init,
    headers: {
      'user-agent': USER_AGENT,
      accept: 'application/rss+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.8',
      ...init.headers
    }
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`)
  }

  return response.text()
}
