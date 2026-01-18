import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import TypingAnimation from '../components/TypingAnimation'
import ContactModal from '../components/ContactModal'
import { projects } from '../data/projects'
import { workExperience } from '../data/experience'
import './Home.css'

// Images from Figma export - place these in /public/assets/
const image1 = '/assets/image-1.png'
const image2 = '/assets/image-2.png'
const stethoscopeImg = '/assets/chatgpt-image-jan-16-2026-at-10-42-50-PM-1.png'
const resumeImg = '/assets/chatgpt-image-jan-16-2026-at-10-38-42-PM-1.png'
const soccerImg = '/assets/ChatGPT Image Jan 16, 2026 at 10_52_26 PM.png'
const envelopeImg = '/assets/ChatGPT Image Jan 16, 2026 at 10_51_34 PM.png'
const vector4 = '/assets/vector-4.svg'
const vector5 = '/assets/vector-5.svg'
const vector6 = '/assets/vector-6.svg'

const Home = () => {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [hoveredIcon, setHoveredIcon] = useState(null)
  const navigate = useNavigate()

  const iconConfigs = [
    { 
      id: 'stethoscope',
      label: 'About Me', 
      path: '/about',
      position: { top: '80px', left: '0px' },
      size: { width: '517px', height: '359px' },
      image: '/assets/ChatGPT Image Jan 16, 2026 at 10_51_58 PM.png'
    },
    { 
      id: 'resume',
      label: 'Resume', 
      path: '/resume',
      position: { top: '0px', left: '1052px' },
      size: { width: '460px', height: '385px' },
      image: '/assets/ChatGPT Image Jan 16, 2026 at 10_51_38 PM.png'
    },
    { 
      id: 'laptop',
      label: 'Projects', 
      path: '/projects',
      position: { top: '500px', left: '440px' },
      size: { width: '632px', height: '422px' },
      image: '/assets/ChatGPT Image Jan 16, 2026 at 10_51_36 PM.png'
    },
    { 
      id: 'soccer',
      label: 'Donate!', 
      path: '/donate',
      position: { top: '454px', left: '967px' },
      size: { width: '545px', height: '528px' },
      image: soccerImg
    },
    { 
      id: 'envelope',
      label: 'Contact', 
      onClick: () => setIsContactOpen(true),
      position: { top: '432px', left: '-60px' },
      size: { width: '568px', height: '550px' },
      image: envelopeImg
    }
  ]

  // Get 3 featured projects
  const featuredProjectsData = [
    ...projects.featured.slice(0, 3).map(project => ({ ...project, linkTo: '/projects' }))
  ]

  const handleIconClick = (config) => {
    if (config.onClick) {
      config.onClick()
    } else if (config.path) {
      navigate(config.path)
    }
  }

  const handleFeaturedClick = (project) => {
    if (project.linkTo) {
      navigate(project.linkTo)
    }
  }

  return (
    <div className="home-page">
      <NavBar />
      
      {/* Hero Section - Exact Figma Layout */}
      <section className="home-hero-figma">
        {/* Main background image */}
        <img
          className="hero-background"
          alt="Background"
          src={image2}
        />

        {/* Center Rotated "Hala" Text */}
        <div className="center-hala-text">
          Hala
        </div>

        {/* Center Rotated "Alzureiqi" Text */}
        <div className="center-alzureiqi-text">
          Alzureiqi
        </div>

        {/* Click Prompt Text */}
        <div className="click-prompt-text">
          (Click on an Object)
        </div>

        {/* Icon Stickers - Responsive grid on mobile, absolute on desktop */}
        <div className="icons-container">
          {iconConfigs.map((config, index) => (
            <motion.div
              key={config.id}
              className={`icon-sticker-figma ${config.id} ${hoveredIcon === config.id ? 'hovered' : ''}`}
              style={{
                position: 'absolute',
                ...config.position,
                ...config.size,
                zIndex: 10,
                cursor: 'pointer'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ 
                delay: 1.1 + (index * 0.08), 
                duration: 0.4 }}
              onHoverStart={() => setHoveredIcon(config.id)}
              onHoverEnd={() => setHoveredIcon(null)}
              onClick={() => handleIconClick(config)}
              whileHover={{ scale: 1.03 }}
            >
              <img 
                src={config.image} 
                alt={config.label}
                className="sticker-image-figma"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {hoveredIcon === config.id && (
                <motion.div
                  className="icon-label-pill"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {config.label}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Purple Section - Starting at 982px from top */}
      <section className="home-bottom-figma">
        {/* Decorative Vectors */}
        <div className="purple-decorative-vectors">
          <img src="/assets/ChatGPT Image Jan 16, 2026 at 09_47_56 PM copy.png" alt="Flower" className="vector vector-6" />
          <img src="/assets/ChatGPT Image Jan 16, 2026 at 09_47_56 PM copy 2.png" alt="Flower" className="vector vector-5" />
          <img src="/assets/ChatGPT Image Jan 16, 2026 at 09_47_56 PM.png" alt="Flower" className="vector vector-4" />
        </div>


        <div className="bottom-content-figma">
          <motion.h2
            className="greeting"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Hey, I'm Hala!
          </motion.h2>

          <motion.div
            className="passionate-section"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="passionate-text">I'm passionate about</h3>
            <TypingAnimation />
          </motion.div>

          {/* Blurb Section - Normal writing style */}
          <motion.div
            className="blurb-section"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="blurb-text">
              I'm a biomedical designer and researcher passionate about creating innovative healthcare solutions. 
              Through my work, I bridge the gap between technology and medicine to improve patient outcomes and 
              make healthcare more accessible to underserved communities.
            </p>
          </motion.div>

          {/* Space for external flowers */}
          <div className="flower-space">
            {/* Add your flower images here */}
          </div>

          {/* Featured Work Section */}
          <motion.div
            className="featured-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="featured-title">Featured</h3>
            <div className="featured-grid">
              {featuredProjectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="featured-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleFeaturedClick(project)}
                  style={{ cursor: project.linkTo ? 'pointer' : 'default' }}
                >
                  <h4 className="featured-card-title">{project.title}</h4>
                  <p className="featured-card-type">{project.type}</p>
                  <p className="featured-card-desc">{project.description || ''}</p>
                  <div className="featured-tech-tags">
                    {project.tech && project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}

// Animated Name Component (continuous writing animation - less shaky)
const AnimatedName = ({ text }) => {
  return (
    <span className="animated-name">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="name-char"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            delay: index * 0.03,
            ease: 'easeOut'
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default Home
