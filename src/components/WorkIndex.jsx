import { useState } from 'react'
import { Link } from 'react-router-dom'
import { workCollections } from '../data/work'
import './WorkIndex.css'

const pad = (n) => String(n + 1).padStart(2, '0')

/**
 * Compact index of projects / initiatives for the home page: one line each,
 * with a panel that follows whichever line you're pointing at. Nothing is
 * featured — the panel is just a viewer, and the row itself is the real link.
 *
 * The panel is aria-hidden because everything in it is either duplicated in the
 * row (title) or reachable by following the row's link (blurb, tags, images).
 * On narrow screens the panel is dropped entirely and each row shows its blurb.
 */
const WorkIndex = () => {
  const [collectionId, setCollectionId] = useState(workCollections[0].id)
  const [activeIndex, setActiveIndex] = useState(0)

  const collection = workCollections.find((c) => c.id === collectionId)
  const items = collection.items
  const active = items[Math.min(activeIndex, items.length - 1)]

  const switchCollection = (id) => {
    setCollectionId(id)
    setActiveIndex(0)
  }

  return (
    <div className="work-index">
      <div className="work-switch" role="tablist" aria-label="Projects or initiatives">
        {workCollections.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === collectionId}
            onClick={() => switchCollection(c.id)}
          >
            {c.label} <span className="work-switch-count">{c.items.length}</span>
          </button>
        ))}
      </div>

      <div className="work-index-body">
        <ul className="work-index-list">
          {items.map((item, index) => (
            <li key={item.slug}>
              <Link
                to={`/work/${item.slug}`}
                className={`work-index-row ${index === activeIndex ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <span className="work-index-num">{pad(index)}</span>
                <span className="work-index-main">
                  <span className="work-index-name">{item.title}</span>
                  <span className="work-index-kind">{item.kind}</span>
                  {/* only rendered on narrow screens, where there is no panel */}
                  <span className="work-index-blurb">{item.blurb}</span>
                </span>
                <span className="work-index-year">{item.year}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="work-index-panel" aria-hidden="true">
          {/* keyed so swapping items replays the fade */}
          <div className="work-index-panel-inner" key={active.slug}>
            <div
              className="work-index-thumb"
              data-empty={active.cover ? undefined : 'true'}
              style={active.cover ? { backgroundImage: `url(${active.cover})` } : undefined}
            />
            <h3>{active.title}</h3>
            <p>{active.blurb}</p>
            {active.tags.length > 0 && (
              <div className="work-index-tags">
                {active.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="work-index-tag">{tag}</span>
                ))}
              </div>
            )}
            <span className="work-index-go">Read more →</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkIndex
