import { motion } from 'framer-motion'
import NavBar from '../components/NavBar'
import { workExperience, volunteerExperience, extracurricularExperience, technicalSkills, certifications } from '../data/experience'
import { contactInfo } from '../data/contact'
import './Resume.css'

const Resume = () => {
  const handleDownload = () => {
    window.open(contactInfo.resumeUrl, '_blank')
  }

  return (
    <div className="resume-page">
      <NavBar />
      <div className="notebook-background" />
      
      <motion.div
        className="resume-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="resume-header"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="page-title">Experience</h1>
          <motion.button
            className="download-btn"
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.button>
        </motion.div>

        {/* Work Experience */}
        <motion.section
          className="resume-section"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-header">
            <h2 className="section-title">Work Experience</h2>
          </div>
          <div className="resume-content">
            {workExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="resume-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="item-header">
                  <h3 className="item-title">{exp.title}</h3>
                  <span className="item-date">{exp.date}</span>
                </div>
                <div className="item-subtitle">{exp.company}</div>
                <div className="item-location">{exp.location}</div>
                <p className="item-description">{exp.description}</p>
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-header">
              <h2 className="section-title">Extracurricular Experience</h2>
            </div>
            <div className="resume-content">
              {extracurricularExperience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="resume-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="item-header">
                    <h3 className="item-title">{exp.title}</h3>
                    <span className="item-date">{exp.date}</span>
                  </div>
                  <div className="item-subtitle">{exp.organization}</div>
                  <div className="item-location">{exp.location}</div>
                  <p className="item-description">{exp.description}</p>
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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-header">
              <h2 className="section-title">Volunteer Experience</h2>
            </div>
            <div className="resume-content">
              {volunteerExperience.map((vol, index) => (
                <motion.div
                  key={vol.id}
                  className="resume-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="item-header">
                    <h3 className="item-title">{vol.title}</h3>
                    <span className="item-date">{vol.date}</span>
                  </div>
                  <div className="item-subtitle">{vol.organization}</div>
                  <div className="item-location">{vol.location}</div>
                  <p className="item-description">{vol.description}</p>
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
