import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import NavBar from '../components/NavBar'
import ImageCarousel from '../components/ImageCarousel'
import { findWorkItem } from '../data/work'
import './WorkDetail.css'

/**
 * Full write-up for one project or initiative, reached from the home page index.
 * Both kinds share this page — src/data/work.js normalizes them to one shape.
 */
const WorkDetail = () => {
  const { slug } = useParams()
  const found = findWorkItem(slug)

  if (!found) {
    return (
      <div className="work-detail-page">
        <NavBar />
        <div className="work-detail-container work-detail-missing">
          <h1>Not found</h1>
          <p>There's nothing here — the link may be out of date.</p>
          <Link to="/" className="work-detail-back">← Back home</Link>
        </div>
      </div>
    )
  }

  const { item, collection, previous, next } = found
  const meta = [item.organization, item.location, item.date].filter(Boolean)

  return (
    <div className="work-detail-page">
      <NavBar />
      <div className="work-detail-background" />

      <motion.article
        className="work-detail-container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/#projects" className="work-detail-back">← {collection.backLabel}</Link>

        <header className="work-detail-head">
          <p className="work-detail-kind">{item.kind}</p>
          <h1>{item.title}</h1>
          {meta.length > 0 && <p className="work-detail-meta">{meta.join(' · ')}</p>}

          {item.links.length > 0 && (
            <div className="work-detail-links">
              {item.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </header>

        {item.images.length > 0 && (
          <div className="work-detail-media">
            <ImageCarousel images={item.images} />
          </div>
        )}

        <p className="work-detail-description">{item.description}</p>

        {item.tags.length > 0 && (
          <div className="work-detail-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="work-detail-tag">{tag}</span>
            ))}
          </div>
        )}

        {item.achievements.length > 0 && (
          <section className="work-detail-section">
            <h2>What I did</h2>
            <ul>
              {item.achievements.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {item.details.length > 0 && (
          <section className="work-detail-section">
            <h2>At a glance</h2>
            <ul className="work-detail-glance">
              {item.details.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {(previous || next) && (
          <nav className="work-detail-nav">
            {previous ? (
              <Link to={`/work/${previous.slug}`} className="work-detail-prev">
                <span>Previous</span>
                {previous.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/work/${next.slug}`} className="work-detail-next">
                <span>Next</span>
                {next.title}
              </Link>
            )}
          </nav>
        )}
      </motion.article>
    </div>
  )
}

export default WorkDetail
