// Data behind the "Me!" carousel on the home page.
//
// The live values come from public/data/me.json, which is regenerated every few
// hours by .github/workflows/me-data.yml (see scripts/README.md). Everything
// below is the shape contract plus the fallback used before that file loads —
// or if it 404s during local dev.

/** Profile pages each widget links to when it has no item-specific link yet. */
export const meProfiles = {
  goodreads: 'https://www.goodreads.com/halaalzu',
  spotify: 'https://open.spotify.com',
  letterboxd: 'https://letterboxd.com/halaalzu/',
  pinterest: 'https://www.pinterest.com/halaalzu/'
}

export const meFallback = {
  updatedAt: null,
  book: {
    title: 'Nothing on the shelf yet',
    author: 'Goodreads',
    cover: null,
    link: meProfiles.goodreads,
    profile: meProfiles.goodreads
  },
  // Saved Goodreads quotes, scraped by scripts/sources/goodreads-quotes.mjs.
  // The hero picks one at random per visit, so the bundled copy below is a real
  // (if small) slice of the shelf rather than a placeholder — if me.json is slow
  // or missing, the hero still shows something true. `book` is null for quotes
  // Goodreads files under an author but no title.
  quotes: {
    items: [
      {
        text: 'This I want to believe implicitly: Man was born for love and revolution.',
        author: 'Osamu Dazai',
        authorLink: 'https://www.goodreads.com/author/show/113561.Osamu_Dazai',
        book: { title: 'The Setting Sun', id: '194740', link: 'https://www.goodreads.com/book/show/194740' },
        link: 'https://www.goodreads.com/quotes/1179015-this-i-want-to-believe-implicitly-man-was-born-for'
      },
      {
        text: 'One day, may we all meet together in the light of understanding.',
        author: 'Malcolm X',
        authorLink: 'https://www.goodreads.com/author/show/17435.Malcolm_X',
        book: {
          title: 'The Autobiography of Malcolm X',
          id: '92057',
          link: 'https://www.goodreads.com/book/show/92057'
        },
        link: 'https://www.goodreads.com/quotes/326541-one-day-may-we-all-meet-together-in-the-light'
      },
      {
        text: 'Hope is the only thing stronger than fear.',
        author: 'Suzanne Collins',
        authorLink: 'https://www.goodreads.com/author/show/153394.Suzanne_Collins',
        book: { title: 'The Hunger Games', id: '2767052', link: 'https://www.goodreads.com/book/show/2767052' },
        link: 'https://www.goodreads.com/quotes/531796-hope-is-the-only-thing-stronger-than-fear'
      }
    ],
    profile: meProfiles.goodreads
  },
  movie: {
    title: 'Nothing logged yet',
    year: null,
    rating: null,
    poster: null,
    link: meProfiles.letterboxd,
    profile: meProfiles.letterboxd
  },
  spotify: {
    // the live payload holds the top 5 tracks of the last ~4 weeks, in order
    tracks: [
      {
        title: 'Not connected yet',
        artist: 'Spotify',
        album: null,
        art: null,
        duration: null,
        previewUrl: null,
        link: meProfiles.spotify,
        rank: null,
        range: 'month',
        isPlaying: false
      }
    ],
    range: 'month',
    profile: meProfiles.spotify
  },
  pinterest: {
    pins: [],
    profile: meProfiles.pinterest
  },
  sources: {}
}
