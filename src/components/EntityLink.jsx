import { useState } from 'react'
import { faviconFor, resolveEntity } from '../data/entities'
import './EntityLink.css'

// Inline link for an organization / school / team: favicon + text, with a small
// hover tooltip. Falls back to plain text when the name isn't in the registry.
const EntityLink = ({ name, label, className = '' }) => {
  const [iconFailed, setIconFailed] = useState(false)
  const entity = resolveEntity(name)
  const text = label || name

  if (!entity) return <>{text}</>

  return (
    <a
      className={`entity-link ${className}`.trim()}
      href={entity.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {!iconFailed && (
        <img
          className="entity-link-favicon"
          src={faviconFor(entity)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={() => setIconFailed(true)}
        />
      )}
      <span className="entity-link-label">{text}</span>
      {entity.description && (
        <span className="entity-link-tip" role="tooltip">
          {entity.description}
        </span>
      )}
    </a>
  )
}

export default EntityLink
