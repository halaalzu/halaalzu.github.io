import { motion } from 'framer-motion'
import NavBar from '../components/NavBar'
import { projects } from '../data/projects'
import './Projects.css'

const Projects = () => {
  return (
    <div className="projects-page">
      <NavBar />
      <div className="notebook-background" />
      
      <motion.div
        className="projects-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Projects
        </motion.h1>

        {/* Projects Grid - Matching alzureiqi.dev format */}
        <div className="projects-grid-main">
          {projects.completed.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card-main"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              {/* Header with title and links */}
              <div className="project-header">
                <h3 className="project-title-main">{project.title}</h3>
                <div className="project-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label="GitHub"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.033-5.478 5.43.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {project.liveDemo && (
                    <a 
                      href={project.liveDemo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label="Live Demo"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="project-description-main">{project.description}</p>

              {/* Tech Tags */}
              <div className="project-tech-main">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-badge-main">{tech}</span>
                ))}
              </div>

              {/* Type */}
              <div className="project-type-section">
                <span className="project-label">Type</span>
                <p className="project-type">{project.type}</p>
              </div>

              {/* Key Achievements */}
              {project.keyAchievements && project.keyAchievements.length > 0 && (
                <div className="project-achievements-section">
                  <span className="project-label">Key Achievements</span>
                  <ul className="project-achievements-list">
                    {project.keyAchievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Details */}
              {project.details && project.details.length > 0 && (
                <div className="project-details-section">
                  <span className="project-label">Details</span>
                  <ul className="project-details-list">
                    {project.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {projects.completed.length === 0 && (
          <div className="empty-projects">
            <p>Check back soon for projects!</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Projects
