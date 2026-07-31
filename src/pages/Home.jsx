import { useEffect, useMemo, useRef, useState } from 'react'
import { extracurricularExperience } from '../data/experience'
import ContactModal from '../components/ContactModal'
import EntityLink from '../components/EntityLink'
import WorkIndex from '../components/WorkIndex'
import { charities } from '../data/charities'
import { meFallback, meProfiles } from '../data/me'
import useMeData from '../hooks/useMeData'
import useRotatingQuote from '../hooks/useRotatingQuote'
import './Charity.css'
import './Home.css'

const clamp01 = (value) => Math.min(Math.max(value, 0), 1)

// Hero name, one entry per rendered line. The lines animate on a stagger, so
// they have to be separate elements rather than a single pre-line string.
const NAME_EN = ['Hala', 'Alzureiqi']
const NAME_AR = ['هلا', 'الزريقي']

/** Short "how stale is the Me! data" stamp, e.g. 3h ago. */
const timeAgo = (iso) => {
  if (!iso) return null
  const diff = Date.now() - new Date(iso).getTime()
  if (!Number.isFinite(diff)) return null
  const minutes = Math.max(1, Math.round(diff / 60000))
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

const Home = () => {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isNameGlitched, setIsNameGlitched] = useState(false)
  const heroRef = useRef(null)

  // Me! carousel — live data lives in public/data/me.json, refreshed every few
  // hours by .github/workflows/me-data.yml (Goodreads, Spotify, Letterboxd, Pinterest).
  const { data: meData } = useMeData()

  // Hero quote: a random pick from the saved Goodreads quotes in that same file,
  // re-rolled on every reload and whenever the hero is scrolled back into view.
  const quotes = meData.quotes?.items?.length ? meData.quotes.items : meFallback.quotes.items
  const { quote: activeQuote, index: quoteIndex } = useRotatingQuote(quotes, heroRef)
  // saved quotes range from one line to a paragraph — step the type size down
  // with length so a long one still fits the panel
  const quoteLength = activeQuote?.text?.length || 0
  const quoteLengthClass =
    quoteLength > 450 ? 'is-huge' : quoteLength > 200 ? 'is-xlong' : quoteLength > 90 ? 'is-long' : ''
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [pinOffset, setPinOffset] = useState(0)
  // index of the pin currently being flicked off the top of the stack, so it
  // can animate out and around instead of teleporting to the back
  const [tossedPin, setTossedPin] = useState(null)
  // Notes stay mounted for a beat after pause so they can fade out instead of
  // vanishing mid-flight; unmounting also restarts them cleanly on the next play.
  const [notesVisible, setNotesVisible] = useState(false)
  // where each hero sticker has been dragged to, keyed by sticker id
  const [stickerOffsets, setStickerOffsets] = useState({})
  const [draggingSticker, setDraggingSticker] = useState(null)
  const audioRef = useRef(null)
  const dragRef = useRef(null)
  const stickerDragRef = useRef(null)

  const widgets = useMemo(
    () => [
      { id: 'book', type: 'book' },
      { id: 'spotify', type: 'spotify' },
      { id: 'movie', type: 'movie' },
      { id: 'polaroid', type: 'polaroid' }
    ],
    []
  )

  // Fixed note layout. These used to be re-rolled with Math.random() on every
  // render, so any unrelated re-render (track change, data refresh, carousel
  // move) teleported every note mid-flight — that was the glitch.
  const noteConfigs = useMemo(
    () => [
      { glyph: '♪', left: 16, dx: -62, rot: -22, delay: 0, dur: 3200, size: 20, drift: 0.35 },
      { glyph: '♫', left: 34, dx: 34, rot: 16, delay: 520, dur: 2700, size: 26, drift: 0.6 },
      { glyph: '♪', left: 50, dx: -18, rot: -8, delay: 1080, dur: 3000, size: 22, drift: 0.45 },
      { glyph: '♬', left: 64, dx: 58, rot: 24, delay: 1600, dur: 3400, size: 18, drift: 0.55 },
      { glyph: '♫', left: 78, dx: 24, rot: 12, delay: 2150, dur: 2900, size: 24, drift: 0.4 },
      { glyph: '♪', left: 26, dx: 72, rot: -14, delay: 2650, dur: 3100, size: 19, drift: 0.5 }
    ],
    []
  )

  const book = meData.book || meFallback.book
  const movie = meData.movie || meFallback.movie
  const tracks = meData.spotify?.tracks?.length ? meData.spotify.tracks : meFallback.spotify.tracks
  const track = tracks[trackIndex % tracks.length]
  const pins = meData.pinterest?.pins || []
  const pinterestProfile = meData.pinterest?.profile || meProfiles.pinterest

  // The deck is the real pins padded out to three with blank frames, so it both
  // reads and shuffles as a deck while the Pinterest feed is empty (it is right
  // now — me.json's sources block explains why).
  const deck = [
    ...pins.map((pin, i) => ({ key: pin.link || pin.image || `pin-${i}`, pin })),
    ...Array.from({ length: Math.max(0, 3 - pins.length) }, (_, i) => ({
      key: `blank-${i}`,
      pin: null
    }))
  ]

  // Every card stays mounted in deck order and only its depth changes, so React
  // reuses the same nodes and the CSS transition carries each one up a slot.
  // Re-keying by position instead would remount them and the shuffle would be an
  // instant image swap.
  // normalised because the deck can grow or shrink under a stale offset when
  // the feed loads or fails
  const frontPin = deck.length ? pinOffset % deck.length : 0
  const polaroids = deck.map((card, index) => ({
    ...card,
    index,
    depth: (index - frontPin + deck.length) % deck.length
  }))

  // Front card to the back, one press at a time.
  const advancePolaroid = () => {
    if (deck.length < 2) return
    setTossedPin(frontPin)
    setPinOffset((offset) => (offset + 1) % deck.length)
  }

  const stepTrack = (delta) => {
    setTrackIndex((i) => (i + delta + tracks.length) % tracks.length)
  }

  const stepCarousel = (delta) => {
    setActiveIndex((i) => (i + delta + widgets.length) % widgets.length)
  }

  const openExternal = (url) => {
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Each carousel item links out to the thing it is showing.
  const widgetLink = (type) => {
    if (type === 'book') return book.link || meProfiles.goodreads
    if (type === 'movie') return movie.link || meProfiles.letterboxd
    if (type === 'spotify') return track?.link || meData.spotify?.profile || meProfiles.spotify
    return pinterestProfile
  }

  const iconConfigs = [
    {
      id: 'resume',
      label: 'Experience',
      target: 'work',
      image: '/assets/ChatGPT Image Jan 16, 2026 at 10_51_38 PM.png'
    },
    {
      id: 'projects',
      label: 'Projects',
      target: 'projects',
      image: '/assets/ChatGPT Image Jan 16, 2026 at 10_51_36 PM.png'
    },
    {
      id: 'donate',
      label: 'Causes',
      target: 'donate',
      image: '/assets/ChatGPT Image Jan 16, 2026 at 10_52_26 PM.png'
    },
    {
      id: 'contact',
      label: 'Contact',
      action: 'modal',
      image: '/assets/ChatGPT Image Jan 16, 2026 at 10_51_34 PM.png'
    }
  ]

  const causes = [
    {
      label: 'Help an Orphan Thrive - Islamic Relief Canada',
      href: 'https://fundraise.islamicreliefcanada.org/en_US/campaign/support-syrian-and-uygur-orphans-and-refugees-in-turkiye-with-hala-alzureiqi-3771'
    },
    {
      label: 'Gaza Emergency Appeal',
      href: 'https://www.islamicreliefcanada.org/emergencies/palestine-appeal'
    },
    {
      label: 'Sudan Emergency Appeal',
      href: 'https://www.islamicreliefcanada.org/emergencies/sudan-appeal'
    }
  ]

  // Only where there is a purple half to dissolve: below 901px the hero stacks
  // into one column, and reduced motion opts out entirely.
  const isSweepActive = () =>
    window.matchMedia('(min-width: 901px)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const scrollToSection = (targetId) => {
    const node = document.getElementById(targetId)
    if (!node) return
    node.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleStickerClick = (item) => {
    // a drag ends in a click too — that one isn't a press on the sticker
    if (stickerDragRef.current?.moved) return

    if (item.action === 'modal') {
      setIsContactOpen(true)
      return
    }

    if (item.target) {
      scrollToSection(item.target)
    }
  }

  // ── Draggable stickers ──────────────────────────────────────────────────
  // Each one carries an offset from wherever the row put it, so you can peel it
  // off and drop it anywhere in the hero. Offsets are per session — a reload
  // lays them back out in a row.
  const stickerOffset = (id) => stickerOffsets[id] || { x: 0, y: 0 }

  const startStickerDrag = (e, item) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    stickerDragRef.current = {
      id: item.id,
      startX: e.clientX,
      startY: e.clientY,
      origin: stickerOffset(item.id),
      moved: false
    }
    // capture so the sticker keeps following the pointer even once it has been
    // dragged out from under it
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setDraggingSticker(item.id)
  }

  const moveStickerDrag = (e) => {
    const drag = stickerDragRef.current
    if (!drag) return
    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY
    // a few pixels of slop, so a press with a shaky finger still counts as a tap
    if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 5) return
    drag.moved = true
    setStickerOffsets((prev) => ({
      ...prev,
      [drag.id]: { x: drag.origin.x + dx, y: drag.origin.y + dy }
    }))
  }

  const endStickerDrag = () => {
    const drag = stickerDragRef.current
    setDraggingSticker(null)
    // hold the flag through the click that follows, then drop it
    if (drag?.moved) window.setTimeout(() => { stickerDragRef.current = null }, 0)
    else stickerDragRef.current = null
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // The swap itself runs ~750ms each way, so the Arabic has to hold long
    // enough to actually be read before it hands back to the English.
    let holdTimer
    const swapTimer = setInterval(() => {
      setIsNameGlitched(true)
      holdTimer = window.setTimeout(() => setIsNameGlitched(false), 2200)
    }, 6500)

    return () => {
      clearInterval(swapTimer)
      window.clearTimeout(holdTimer)
    }
  }, [])

  // Play the 30s Spotify preview when the API gave us one; otherwise the vinyl
  // just spins and the notes fly (Spotify omits preview_url on plenty of tracks).
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!isPlaying) {
      audio.pause()
      return
    }

    if (!track?.previewUrl) return
    audio.play().catch(() => setIsPlaying(false))
  }, [isPlaying, track?.previewUrl])

  // Mount the notes on play, keep them alive through the CSS fade-out on pause.
  useEffect(() => {
    if (isPlaying) {
      setNotesVisible(true)
      return
    }
    const timer = window.setTimeout(() => setNotesVisible(false), 700)
    return () => window.clearTimeout(timer)
  }, [isPlaying])

  // Section headings below the hero fill left-to-right whenever they scroll
  // into view and drain back out when they leave, so the effect replays every
  // pass in either direction. CSS owns the gradient; this only flips a class.
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll('.home-body .section-head h2')
    )
    if (!headings.length) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      headings.forEach((node) => node.classList.add('is-filled'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-filled', entry.isIntersecting)
        })
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.2 }
    )

    headings.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  // Dissolves the purple half of the hero as you scroll, so the page is all
  // cream by the time the hero leaves the screen and there is no purple edge
  // left to cut off. Nothing here moves layout — the values are written
  // straight to CSS custom properties, so scrolling never re-renders React.
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let frame = 0
    const update = () => {
      frame = 0

      if (!isSweepActive()) {
        hero.style.setProperty('--hero-fade', '1')
        hero.style.setProperty('--wipe-top', '0%')
        hero.style.setProperty('--wipe-bottom', '0%')
        hero.dataset.heroFaded = 'false'
        return
      }

      // the sweep runs over roughly the first two thirds of the hero
      const travel = (hero.offsetHeight || window.innerHeight) * 0.66
      const progress = clamp01(window.scrollY / travel)

      // quote and stickers clear out ahead of the edge reaching them, since
      // their cream-coloured text would be unreadable once the purple is gone
      const fade = 1 - clamp01((progress - 0.02) / 0.3)

      // Leading edge crossing the purple half. It leaves the centre split line
      // vertical, tilts to its widest around halfway, and straightens back out
      // as it exits — so it starts and ends flush with the layout's own lines.
      const eased = progress * progress * (3 - 2 * progress)
      const tilt = Math.sin(Math.PI * eased) * 14
      const x = eased * 114

      hero.style.setProperty('--hero-fade', fade.toFixed(3))
      hero.style.setProperty('--wipe-top', `${(x + tilt / 2).toFixed(2)}%`)
      hero.style.setProperty('--wipe-bottom', `${(x - tilt / 2).toFixed(2)}%`)

      // faded-out stickers are still buttons — stop them catching clicks
      const faded = String(fade < 0.05)
      if (hero.dataset.heroFaded !== faded) hero.dataset.heroFaded = faded
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <main className="home-one-page">
      <header className="hero-wrap-min" id="top" ref={heroRef}>
        <div className="hero-wipe-bg" aria-hidden="true">
          <div className="hero-wipe-cream" />
          {/* the purple half, dissolved away on scroll by a tilted edge */}
          <div className="hero-wipe-sweep" />
        </div>
        <div className="hero-inner-min hero-split">
          <div className="hero-left">
            {/* Both names are always mounted and stacked in the same grid cell,
                so the swap never reflows the column beneath it. */}
            <h1 className={`name-swap ${isNameGlitched ? 'is-arabic' : ''}`} aria-label="Hala Alzureiqi">
              <span className="name-face name-en" aria-hidden="true">
                {NAME_EN.map((line, i) => (
                  <span className="name-line" key={line} style={{ '--i': i }}>{line}</span>
                ))}
              </span>
              <span className="name-face name-ar" lang="ar" aria-hidden="true">
                {NAME_AR.map((line, i) => (
                  <span className="name-line" key={line} style={{ '--i': i }}>{line}</span>
                ))}
              </span>
            </h1>
            <p className="hero-subtitle">
              Biomedical Engineering @ <EntityLink name="University of Waterloo" />
            </p>
            <p className="hero-line">
              <span className="hero-line-jots" aria-hidden="true">
                <span>&gt;</span>
                <span>&gt;</span>
                <span>&gt;</span>
              </span>
              I'm a biomedical engineering student focused on practical healthcare tools for low-resource settings.
              My work combines embedded systems, software, and human-centered design.
            </p>
          </div>

          <div className="hero-right">
            <div className="quote-stage quote-stage-panel" aria-live="polite">
              {/* keyed on the index so each pick fades in rather than snapping */}
              <blockquote className="site-quote" key={quoteIndex}>
                <p className={`quote-text ${quoteLengthClass}`}>
                  {activeQuote?.text ? `“${activeQuote.text}”` : ''}
                </p>
                <footer className="quote-author">
                  — {activeQuote?.author}
                  {activeQuote?.book && (
                    <>
                      {' ('}
                      <a
                        className="quote-book"
                        href={activeQuote.book.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {activeQuote.book.title}
                      </a>
                      {')'}
                    </>
                  )}
                </footer>
              </blockquote>

              <a
                className="goodreads-link"
                href={meData.quotes?.profile || meProfiles.goodreads}
                target="_blank"
                rel="noreferrer"
              >
                visit my goodreads!
              </a>
            </div>

            <div className="hero-stickers-row hero-stickers-panel">
              {iconConfigs.map((item) => {
                const offset = stickerOffset(item.id)
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`hero-sticker${draggingSticker === item.id ? ' is-dragging' : ''}`}
                    /* the offset rides in as variables so the hover and drag
                       scales in CSS can compose with it instead of being
                       overwritten by an inline transform */
                    style={{ '--dx': `${offset.x}px`, '--dy': `${offset.y}px` }}
                    onPointerDown={(e) => startStickerDrag(e, item)}
                    onPointerMove={moveStickerDrag}
                    onPointerUp={endStickerDrag}
                    onPointerCancel={endStickerDrag}
                    onClick={() => handleStickerClick(item)}
                    aria-label={`Go to ${item.label}`}
                  >
                    <img src={item.image} alt={item.label} draggable="false" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>

            <p className="hero-click-object">(Click an Object)</p>
          </div>
        </div>
      </header>

      <div className="home-body">
        <section className="content-wrap" id="work">
          <div className="section-head">
            <p>Experience</p>
            <h2>Experience & Community</h2>
          </div>
          <div className="timeline-list">
            {extracurricularExperience.slice(0, 4).map((role) => (
              <article key={role.id} className="timeline-item">
                <time className="timeline-date">{role.date}</time>
                <span className="timeline-marker" aria-hidden="true" />
                <div className="timeline-content">
                  <h3>
                    {role.title}{' '}
                    <span>
                      @ <EntityLink name={role.organization} />
                    </span>
                  </h3>
                  <p>{role.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-wrap" id="projects">
          <div className="section-head">
            <p>Work</p>
            <h2>Things I've built</h2>
          </div>
          <WorkIndex />
        </section>

        <section className="content-wrap" id="donate">
          <div className="section-head">
            <p>Causes</p>
            <h2>Causes I support</h2>
          </div>

          <div className="charity-list">
            {charities.map((charity, idx) => (
              <div
                key={charity.id}
                className="charity-row"
                tabIndex={0}
                aria-label={charity.name}
              >
                {/* background image faded in on hover */}
                {charity.image && (
                  <div
                    className="charity-bg"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(124,58,237,0.36), rgba(245,241,255,0.03)), url(${charity.image})`
                    }}
                    aria-hidden
                  />
                )}

                <div className="charity-row-inner">
                  <div className="charity-bullet" aria-hidden>•</div>
                  <div className="charity-main">
                    <div className="charity-head">
                      <h3 className="charity-title">{charity.name}</h3>
                      <div className="charity-year">{charity.year || ''}</div>
                    </div>
                    <div className="charity-sub">
                      {(charity.country || '') + (charity.country && charity.organization ? ' · ' : '') + (charity.organization || '')}
                    </div>
                    <p className="charity-short">{charity.description}</p>
                  </div>
                  {charity.link && (
                    <a href={charity.link} target="_blank" rel="noopener noreferrer" className="charity-link-inline">Donate</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="content-wrap" id="me">
          <div className="section-head">
            <p>Me!</p>
            <h2>Me!</h2>
          </div>

          {/* Simple horizontal carousel (no boxed cards) containing 4 widgets */}
          <div className="me-carousel" aria-roledescription="carousel">
            <div
              className="me-track-viewport"
              onPointerDown={(e) => {
                if (e.pointerType === 'mouse' && e.button !== 0) return
                dragRef.current = { x: e.clientX, y: e.clientY, handled: false, dragged: false }
              }}
              onPointerMove={(e) => {
                const drag = dragRef.current
                if (!drag || drag.handled) return
                const dx = e.clientX - drag.x
                const dy = e.clientY - drag.y
                if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
                drag.handled = true
                drag.dragged = true
                stepCarousel(dx < 0 ? 1 : -1)
              }}
              onPointerUp={() => {
                // Keep the flag around for the click that follows a drag, then drop it.
                const drag = dragRef.current
                if (drag?.dragged) window.setTimeout(() => { dragRef.current = null }, 0)
                else dragRef.current = null
              }}
              onPointerCancel={() => { dragRef.current = null }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') { e.preventDefault(); stepCarousel(-1) }
                if (e.key === 'ArrowRight') { e.preventDefault(); stepCarousel(1) }
              }}
            >
              <div className="me-track">
                {widgets.map((w, idx) => {
                  // compute relative position with wrap-around
                  let rel = idx - activeIndex
                  const len = widgets.length
                  if (rel > len / 2) rel -= len
                  if (rel < -len / 2) rel += len
                  const posClass = `pos${rel}`.replace('-', 'm') // e.g. pos-1 -> posm1 as CSS class naming
                  const isCentre = rel === 0
                  const activate = () => {
                    if (rel === -1) return stepCarousel(-1)
                    if (rel === 1) return stepCarousel(1)
                    if (isCentre) openExternal(widgetLink(w.type))
                  }
                  return (
                    <div
                      key={w.id}
                      className={`me-item ${posClass} ${isCentre ? 'is-centre' : ''}`}
                      data-rel={rel}
                      role={isCentre ? 'link' : 'button'}
                      tabIndex={Math.abs(rel) <= 1 ? 0 : -1}
                      onClick={() => {
                        // a swipe already moved the carousel — don't also open the link
                        if (dragRef.current?.dragged) return
                        activate()
                      }}
                      onKeyDown={(e) => {
                        if (e.key !== 'Enter' && e.key !== ' ') return
                        e.preventDefault()
                        activate()
                      }}
                    >
                    <div className="me-item-inner">
                    {w.type === 'book' && (
                      <div className="me-book">
                        <div
                          className="me-book-cover"
                          data-empty={book.cover ? undefined : 'true'}
                          style={book.cover ? { backgroundImage: `url(${book.cover})` } : undefined}
                          aria-hidden="true"
                        />
                        <div className="me-label">Currently reading</div>
                        <div className="me-title">{book.title}</div>
                        <div className="me-sub">{book.author}</div>
                        <span className="me-link">View on Goodreads</span>
                      </div>
                    )}

                    {w.type === 'movie' && (
                      <div className="me-movie">
                        <div
                          className="me-movie-poster"
                          data-empty={movie.poster ? undefined : 'true'}
                          style={movie.poster ? { backgroundImage: `url(${movie.poster})` } : undefined}
                          aria-hidden="true"
                        />
                        <div className="me-label">Last watched</div>
                        <div className="me-title">{movie.title}</div>
                        <div className="me-sub">
                          {[movie.year, movie.rating].filter(Boolean).join(' · ')}
                        </div>
                        <span className="me-link">View on Letterboxd</span>
                      </div>
                    )}

                    {w.type === 'spotify' && (
                      <div className="me-spotify">
                        <audio
                          ref={audioRef}
                          src={track?.previewUrl || undefined}
                          preload="none"
                          onEnded={() => setIsPlaying(false)}
                        />
                        <div className={`me-vinyl ${isPlaying ? 'spinning' : ''}`}>
                          <div
                            className="me-vinyl-art"
                            data-empty={track?.art ? undefined : 'true'}
                            style={track?.art ? { backgroundImage: `url(${track.art})` } : undefined}
                          />
                          <button
                            type="button"
                            className="me-vinyl-play-overlay"
                            tabIndex={isCentre ? 0 : -1}
                            onClick={(e) => { e.stopPropagation(); setIsPlaying(p => !p) }}
                            aria-label="play/pause"
                          >
                            <span className="me-vinyl-play-icon">{isPlaying ? '⏸' : '▶'}</span>
                          </button>
                        </div>
                        {notesVisible && (
                          <div className={`music-notes ${isPlaying ? 'playing' : ''}`} aria-hidden>
                            {noteConfigs.map((note, i) => (
                              <div
                                key={`note-${i}`}
                                className="note"
                                style={{
                                  left: `${note.left}%`,
                                  fontSize: `${note.size}px`,
                                  animationDelay: `${note.delay}ms`,
                                  animationDuration: `${note.dur}ms`,
                                  // diagonal drift + spin, read by the fly keyframes
                                  ['--dx']: `${note.dx}px`,
                                  ['--dx-mid']: `${Math.round(note.dx * note.drift)}px`,
                                  ['--rot']: `${note.rot}deg`
                                }}
                              >
                                {note.glyph}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="me-spotify-controls">
                          <button
                            type="button"
                            className="me-prev"
                            tabIndex={isCentre ? 0 : -1}
                            onClick={(e) => { e.stopPropagation(); stepTrack(-1) }}
                            disabled={tracks.length < 2}
                            aria-label="previous track"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            className="me-play"
                            tabIndex={isCentre ? 0 : -1}
                            onClick={(e) => { e.stopPropagation(); setIsPlaying(p => !p) }}
                            aria-label="play/pause"
                          >
                            {isPlaying ? '⏸' : '▶'}
                          </button>
                          <button
                            type="button"
                            className="me-next"
                            tabIndex={isCentre ? 0 : -1}
                            onClick={(e) => { e.stopPropagation(); stepTrack(1) }}
                            disabled={tracks.length < 2}
                            aria-label="next track"
                          >
                            ›
                          </button>
                        </div>
                        <div className="me-label">
                          {track?.isPlaying
                            ? 'Now playing'
                            : track?.range === 'recent'
                              ? 'Recently played'
                              : 'Top this month'}
                          {track?.rank ? ` · #${track.rank}` : ''}
                        </div>
                        <div className="me-title">{track?.title}</div>
                        <div className="me-sub">
                          {track?.artist}
                          {track?.duration && <> · <span className="me-duration">{track.duration}</span></>}
                        </div>
                        <span className="me-link">Open in Spotify</span>
                      </div>
                    )}

                    {w.type === 'polaroid' && (
                      <div className="me-polaroid">
                        {/* the stack itself shuffles; the link below goes to the board */}
                        <div
                          className="polaroid-stack"
                          role="button"
                          /* off the centre this is inert (see Home.css) so the
                             tap can rotate the carousel instead */
                          tabIndex={isCentre ? 0 : -1}
                          aria-label="Shuffle photos"
                          onClick={(e) => { e.stopPropagation(); advancePolaroid() }}
                          onKeyDown={(e) => {
                            if (e.key !== 'Enter' && e.key !== ' ') return
                            if (!isCentre) return
                            e.preventDefault()
                            e.stopPropagation()
                            advancePolaroid()
                          }}
                        >
                          {polaroids.map(({ key, pin, index, depth }) => (
                            <div
                              key={key}
                              className={`polaroid-piece${depth === 0 ? ' is-top' : ''}${
                                tossedPin === index ? ' is-tossed' : ''
                              }`}
                              /* --d is the slot in the stack and drives the whole
                                 resting transform; past the fourth card they all
                                 share a slot and just thicken the edge */
                              style={{ '--d': Math.min(depth, 4), '--z': 100 - depth }}
                              onAnimationEnd={() => setTossedPin((i) => (i === index ? null : i))}
                              title={pin?.title || undefined}
                              aria-hidden={pin ? undefined : 'true'}
                            >
                              <span
                                className="polaroid-photo"
                                data-empty={pin?.image ? undefined : 'true'}
                                style={pin?.image ? { backgroundImage: `url(${pin.image})` } : undefined}
                              />
                              <span className="polaroid-caption">{pin?.title || ''}</span>
                            </div>
                          ))}
                        </div>
                        <div className="me-label">Recently saved</div>
                        <div className="me-sub">click to shuffle</div>
                        <a
                          className="me-link"
                          href={pinterestProfile}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          my interests →
                        </a>
                      </div>
                    )}
                    </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="me-indicators" aria-hidden>
              {widgets.map((_, i) => (
                <span
                  key={i}
                  className={`bar ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>

            {meData.updatedAt && (
              <p className="me-updated">synced from Goodreads, Spotify, Letterboxd &amp; Pinterest · {timeAgo(meData.updatedAt)}</p>
            )}

          </div>
        </section>

        <footer className="content-wrap footer-min" id="contact">
          <div className="contact-inline-min">
            <a href="mailto:halzureiqi@gmail.com">halzureiqi@gmail.com</a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/hala-alzureiqi/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <span>·</span>
            <a href="https://github.com/halaalzu" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span>·</span>
            <a href="/assets/Hala_Alzureiqi___Resume__Software_.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>
        </footer>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  )
}

export default Home
