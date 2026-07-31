import { motion } from 'framer-motion'
import NavBar from '../components/NavBar'
import EntityLink from '../components/EntityLink'
import { workExperience, volunteerExperience, extracurricularExperience } from '../data/experience'
import { contactInfo } from '../data/contact'
import './Resume.css'

const Resume = () => {
  const handleDownload = () => {
    window.open(contactInfo.resumeUrl, '_blank')
  }
const renderSkillTags = (skills) => {
    if (!skills || skills.length === 0) return null
    return (
      <div className="skill-tags">
        {skills.map((skill) => (
          <span key={skill} className="skill-tag">{skill}</span>
        ))}
      </div>
    )
  }


  return (
    <div className="resume-page">
      <NavBar />
      <div className="experience-background" />
      
      <motion.div
        className="resume-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="resume-header"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <h1 className="page-title">Experience</h1>
          <motion.button
            className="download-btn"
            onClick={handleDownload}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Resume
          </motion.button>
        </motion.div>

        {/* Work Experience */}
        <motion.section
          className="resume-section"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <h2 className="section-title">Work Experience</h2>
          </div>
          <div className="resume-content resume-grid-3">
            {workExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="resume-item"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="item-header">
                  <h3 className="item-title">{exp.title}</h3>
                  <span className="item-date">{exp.date}</span>
                </div>
                <div className="item-subtitle">
                  <EntityLink name={exp.company} />
                </div>
                <div className="item-location">{exp.location}</div>
                {renderSkillTags(exp.skills)}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="item-list">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Extracurricular Experience */}
        {extracurricularExperience && extracurricularExperience.length > 0 && (
          <motion.section
            className="resume-section"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-header">
              <h2 className="section-title">Extracurricular Experience</h2>
            </div>
            <div className="resume-content resume-grid-2x2">
              {extracurricularExperience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="resume-item"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="item-header">
                    <h3 className="item-title">{exp.title}</h3>
                    <span className="item-date">{exp.date}</span>
                  </div>
                  <div className="item-subtitle">
                    <EntityLink name={exp.organization} />
                  </div>
                  <div className="item-location">{exp.location}</div>
                  {renderSkillTags(exp.skills)}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="item-list">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Volunteer Experience */}
        {volunteerExperience && volunteerExperience.length > 0 && (
          <motion.section
            className="resume-section"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-header">
              <h2 className="section-title">Volunteer Experience</h2>
            </div>
            <div className="resume-content resume-grid-3">
              {volunteerExperience.map((vol, index) => (
                <motion.div
                  key={vol.id}
                  className="resume-item"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="item-header">
                    <h3 className="item-title">{vol.title}</h3>
                    <span className="item-date">{vol.date}</span>
                  </div>
                  <div className="item-subtitle">
                    <EntityLink name={vol.organization} />
                  </div>
                  <div className="item-location">{vol.location}</div>
                  {renderSkillTags(vol.skills)}
                  {vol.achievements && vol.achievements.length > 0 && (
                    <ul className="item-list">
                      {vol.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  )
}

export default Resume
