// Inline link targets for organizations, schools, and teams mentioned across the
// site. Keys are the exact strings used in the other data files; `aliases` cover
// the longer variants (e.g. "Islamic Relief Canada - Türkiye Cohort 2").
// Favicons are pulled from the domain, so adding an entry only needs a domain.

export const entities = {
  'University of Waterloo': {
    url: 'https://uwaterloo.ca',
    domain: 'uwaterloo.ca',
    description:
      "Public research university in Waterloo, Ontario, home to the world's largest post-secondary co-op program.",
    aliases: ['UWaterloo', 'Waterloo']
  },
  'Muslim Student Association': {
    url: 'https://uwmsa.com',
    domain: 'uwmsa.com',
    description:
      'Student-run community for Muslim students at Waterloo, running prayer spaces, events, and campus advocacy.',
    aliases: ["Muslim Students' Association", 'UW MSA', 'MSA']
  },
  'UW Biomedical Engineering Society': {
    url: 'https://www.instagram.com/uwbmesociety/',
    domain: 'instagram.com',
    description:
      'Waterloo student society for people interested in biomedical engineering, running design projects and industry events.',
    aliases: ['UW BMES', 'Biomedical Engineering Society']
  },
  'UW Biomechatronics Design Team': {
    url: 'https://uwaterloo.ca/sedra-student-design-centre/catalogs/student-design-teams/uw-biomechatronics-design-team-biotron',
    domain: 'uwaterloo.ca',
    description:
      'Also known as Biotron: a Waterloo design team building biomechatronic devices such as prosthetics and exoskeletons.',
    aliases: ['Biotron', 'Biomechatronics']
  },
  'UW Pre-Med Club': {
    url: 'https://www.uwaterloopremed.com/',
    domain: 'uwaterloopremed.com',
    description:
      'Waterloo club for students pursuing medicine, covering MCAT prep, admissions guidance, and networking events.',
    aliases: ['Pre-Med Club', 'Pre-Medical Club']
  },
  'Islamic Relief Canada': {
    url: 'https://www.islamicreliefcanada.org',
    domain: 'islamicreliefcanada.org',
    description:
      'Canadian humanitarian organization delivering emergency relief and long-term development work worldwide.',
    aliases: ['Islamic Relief']
  },
  'Elections Canada': {
    url: 'https://www.elections.ca',
    domain: 'elections.ca',
    description:
      'The independent, non-partisan agency responsible for running federal elections and referendums in Canada.'
  },
  'Fleetway Bowling Alley - ESAM Group': {
    url: 'https://fleetwayfun.com/',
    domain: 'fleetwayfun.com',
    description:
      'London, Ontario entertainment centre with 44 bowling lanes, glow golf, billiards, and an arcade. Owned by ESAM Group.',
    aliases: ['Fleetway']
  },
  'London Islamic School Camp SHINE': {
    url: 'http://www.londonislamicschool.com/',
    domain: 'londonislamicschool.com',
    description:
      'K–8 private school in London, Ontario, operated by the London Muslim Mosque. Camp SHINE is its summer program.',
    aliases: ['London Islamic School']
  },
  'Sir Frederick Banting Secondary School': {
    url: 'https://banting.tvdsb.ca/en/index.aspx',
    domain: 'tvdsb.ca',
    description:
      'Grade 9–12 public high school in London, Ontario, part of the Thames Valley District School Board.',
    aliases: ['Banting']
  }
}

// Alias → canonical key, longest first so "Islamic Relief Canada" wins over
// "Islamic Relief" when both appear in the same string.
const aliasIndex = Object.entries(entities)
  .flatMap(([key, entity]) => [key, ...(entity.aliases || [])].map((alias) => [alias, key]))
  .sort((a, b) => b[0].length - a[0].length)

export const resolveEntity = (name) => {
  if (!name) return null
  if (entities[name]) return entities[name]

  const match = aliasIndex.find(([alias]) => name.toLowerCase().includes(alias.toLowerCase()))
  return match ? entities[match[1]] : null
}

export const faviconFor = (entity) =>
  entity?.icon || `https://www.google.com/s2/favicons?domain=${entity?.domain}&sz=64`
