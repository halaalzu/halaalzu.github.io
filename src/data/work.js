// One shape for both projects and initiatives, so the home index and the
// /work/<slug> detail page render either without branching on which it is.

import { projects } from './projects'
import { initiatives } from './initiatives'

/** Projects carry repo/demo URLs as loose fields; initiatives carry a links array. */
const toLinks = (item) => {
  if (item.links) return item.links
  return [
    item.github && { label: 'GitHub', href: item.github },
    item.githubBackend && { label: 'Backend repo', href: item.githubBackend },
    item.liveDemo && { label: 'Live demo', href: item.liveDemo }
  ].filter(Boolean)
}

const normalize = (item) => ({
  slug: item.slug,
  title: item.title,
  kind: item.kind || item.type,
  year: item.year || item.date,
  date: item.date || item.year,
  cover: item.cover || null,
  blurb: item.blurb || item.description,
  description: item.description,
  organization: item.organization || null,
  location: item.location || null,
  tags: item.tech || [],
  achievements: item.keyAchievements || [],
  details: item.details || [],
  images: item.images || [],
  links: toLinks(item)
})

export const workCollections = [
  {
    id: 'projects',
    label: 'Projects',
    backLabel: 'All projects',
    items: projects.completed.map(normalize)
  },
  {
    id: 'initiatives',
    label: 'Initiatives',
    backLabel: 'All initiatives',
    items: initiatives.map(normalize)
  }
]

/**
 * Look up one item by slug, along with the collection it belongs to and its
 * neighbours, so the detail page can offer prev/next without re-scanning.
 */
export const findWorkItem = (slug) => {
  for (const collection of workCollections) {
    const index = collection.items.findIndex((item) => item.slug === slug)
    if (index === -1) continue
    return {
      item: collection.items[index],
      collection,
      previous: collection.items[index - 1] || null,
      next: collection.items[index + 1] || null
    }
  }
  return null
}
