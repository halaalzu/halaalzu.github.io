import { useEffect, useMemo, useState } from 'react'
import { extracurricularExperience } from '../data/experience'
import ContactModal from '../components/ContactModal'
import './Home.css'

const asset = (fileName) => `/assets/${encodeURIComponent(fileName)}`

const Home = () => {
  const [activeGallery, setActiveGallery] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isNameGlitched, setIsNameGlitched] = useState(false)

  const iconConfigs = [
    {
      id: 'about',
      label: 'About',
      target: 'about',
      image: '/assets/ChatGPT Image Jan 16, 2026 at 10_51_58 PM.png'
    },
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

  const projectsPreview = useMemo(
    () => [
      {
        title: 'SineWave',
        photos: [],
        cover: '/assets/RS450277_IMG_3763_hpr.webp',
        github: 'https://github.com/halaalzu/SineWave',
        demo: 'https://devpost.com/software/flowstate-zhvg0m',
        summary: 'Hand-gesture rhythm game for motor rehab using real-time CV + PyTorch.'
      },
      {
        title: 'BookTok',
        photos: ['/assets/booktok-logo.jpeg', '/assets/1768250233760.jpeg'],
        cover: '/assets/1768250233760.jpeg',
        github: 'https://github.com/ishashenoy/booktok-frontend',
        demo: null,
        summary: 'AI pipeline that turns book summaries into short-form scrollable videos.'
      },
      {
        title: 'Accessible Catan',
        photos: [
          asset('SolidWroks 3D Version Assembly.jpg'),
          asset('Painted Final Prints.jpg'),
          asset('Painted 3D Version .jpg')
        ],
        cover: asset('Painted Final Prints.jpg'),
        github: 'https://github.com/halaalzu/Accessible-Catan-3D-Print',
        demo: null,
        summary: 'A redesigned Catan kit with accessible, stable, low-dexterity-friendly parts.'
      },
      {
        title: 'To-Do List',
        photos: [],
        cover: '/assets/IMG_6426.JPG',
        github: 'https://github.com/halaalzu/To-Do-List',
        demo: 'https://to-do-list-22no.onrender.com/login',
        summary: 'Full-stack Flask task manager with clean CRUD flow.'
      }
    ],
    []
  )

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

  const scrollToSection = (targetId) => {
    const node = document.getElementById(targetId)
    if (!node) return
    node.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleStickerClick = (item) => {
    if (item.action === 'modal') {
      setIsContactOpen(true)
      return
    }

    if (item.target) {
      scrollToSection(item.target)
    }
  }

  const quotePool = useMemo(
    () => [
      'Goodreads quote placeholder: "The cure for boredom is curiosity."',
      'Goodreads quote placeholder: "What we think, we become."',
      'Goodreads quote placeholder: "Do what you can, with what you have, where you are."',
      'Goodreads quote placeholder: "Small steps compound into big outcomes."'
    ],
    []
  )
  const [activeQuote] = useState(() => quotePool[Math.floor(Math.random() * quotePool.length)])

  useEffect(() => {
    const glitchTimer = setInterval(() => {
      setIsNameGlitched(true)
      window.setTimeout(() => setIsNameGlitched(false), 900)
    }, 10000)

    return () => clearInterval(glitchTimer)
  }, [])

  return (
    <main className="home-one-page">
      <header className="hero-wrap-min" id="top">
        <div className="hero-inner-min">
          <h1 className={`name-glitch ${isNameGlitched ? 'glitched' : ''}`}>
            {isNameGlitched ? 'هلا الزريقي' : 'Hala Alzureiqi'}
          </h1>
          <p className="hero-subtitle">Biomedical Engineering @ University of Waterloo</p>
          <p className="hero-line">I build at the intersection of healthcare, design, and software.</p>
          <p className="hero-prompt">(Click an object)</p>

          <div className="hero-stickers-row">
            {iconConfigs.map((item) => (
              <button
                key={item.id}
                type="button"
                className="hero-sticker"
                onClick={() => handleStickerClick(item)}
                aria-label={`Go to ${item.label}`}
              >
                <img src={item.image} alt={item.label} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="quote-stage" aria-live="polite">
            <p>{activeQuote}</p>
          </div>
        </div>
      </header>

      <section className="content-wrap" id="about">
        <div className="section-head">
          <p>About</p>
          <h2>Hey, I'm Hala.</h2>
        </div>
        <p className="about-text">
          I'm a Biomedical Engineering student focused on practical healthcare tools for low-resource settings.
          My work combines embedded systems, software, and human-centered design to make medical technology
          more useful in real conditions.
        </p>
      </section>

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
                  {role.title} <span>@ {role.organization}</span>
                </h3>
                <p>{role.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-wrap" id="projects">
        <div className="section-head">
          <p>Projects</p>
          <h2>Things I've built</h2>
        </div>
        <div className="projects-grid-min">
          {projectsPreview.map((project) => (
            <button
              key={project.title}
              type="button"
              className={`project-tile-min ${activeProject?.title === project.title ? 'selected' : ''}`}
              onClick={() => setActiveProject(project)}
              aria-label={`Open project details for ${project.title}`}
            >
              <img src={project.cover} alt={project.title} />
            </button>
          ))}
        </div>
        {activeProject && (
          <div className="project-reveal-min">
            <h3>{activeProject.title}</h3>
            <p>{activeProject.summary}</p>
            <div className="project-reveal-actions">
              {activeProject.photos.length > 0 && (
                <button type="button" onClick={() => setActiveGallery(activeProject)}>
                  Photos
                </button>
              )}
              <a href={activeProject.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              {activeProject.demo && (
                <a href={activeProject.demo} target="_blank" rel="noopener noreferrer">
                  Demo
                </a>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="content-wrap" id="donate">
        <div className="section-head">
          <p>Causes</p>
          <h2>Causes I support</h2>
        </div>
        <div className="row-list-min">
          {causes.map((cause) => (
            <article key={cause.label} className="row-min donate-row">
              <h3>{cause.label}</h3>
              <a href={cause.href} target="_blank" rel="noopener noreferrer">
                Donate
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="content-wrap" id="me">
        <div className="section-head">
          <p>Me!</p>
          <h2>Me!</h2>
        </div>
        <p className="about-text">
          Outside of engineering, I care deeply about storytelling, community service, and design that feels human.
          This is where I will keep adding snapshots of the ideas and moments that shape how I build.
        </p>
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

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {activeGallery && (
        <div className="gallery-overlay-min" onClick={() => setActiveGallery(null)}>
          <div className="gallery-modal-min" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setActiveGallery(null)}>
              Close
            </button>
            <h3>{activeGallery.title} Photos</h3>
            <div className="gallery-grid-min">
              {activeGallery.photos.map((src) => (
                <img key={src} src={src} alt={`${activeGallery.title} project`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Home
