import { motion } from 'framer-motion'
import NavBar from '../components/NavBar'
import EntityLink from '../components/EntityLink'
import { education, technicalSkills } from '../data/experience'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <NavBar />
      <div className="about-background" />
      
      <motion.div
        className="about-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          About Me
        </motion.h1>

        <div className="about-content">
          {/* Personal Blurb - Less boxy, more open */}
          <motion.section
            className="about-section-open"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title-open">Hey, I'm Hala!</h2>
            <div className="section-content-open">
              <p style={{ textIndent: '2em' }}>
                I'm passionate about biomedical design, healthcare innovation, and making a positive impact in underprivileged communities. Through my work and research, I strive to bridge the gap between technology and healthcare to improve patient outcomes, especially by creating health tech that's accessible in low-resource settings where care is limited and small, affordable solutions can save lives.
              </p>
              <p style={{ textIndent: '2em' }}>
                When I'm not working on medical devices or conducting research, you'll find me reading, exploring new ideas, and supporting causes that matter. I believe in the power of interdisciplinary collaboration and continuous learning, and I'm especially interested in AI/ML in healthcare, prosthetics, nuclear medicine, and research that pushes healthcare forward.
              </p>
            </div>
          </motion.section>

          {/* Education Section - Moved from Resume */}
          {education && education.length > 0 && (
            <motion.section
              className="about-section-open"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="section-title-open">Education</h2>
              <div className="education-list">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    className="education-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="education-degree">{edu.degree}</h3>
                    <div className="education-institution">
                      <EntityLink name={edu.institution} />
                    </div>
                    <div className="education-location">{edu.location}</div>
                    <div className="education-date">{edu.date}</div>
                    {edu.details && (
                      <div className="education-details">{edu.details}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Technical Skills - Moved from Resume */}
          {technicalSkills && technicalSkills.length > 0 && (
            <motion.section
              className="about-section-open"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="section-title-open">Technical Skills</h2>
              <div className="skills-list-open">
                {technicalSkills.map((category, index) => (
                  <div key={index} className="skill-category-open">
                    <h4 className="skill-category-title">{category.category}</h4>
                    <div className="skill-tags-open">
                      {category.skills.map((skill, i) => (
                        <span key={i} className="skill-tag-open">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Core Competencies - Less boxy */}
          <motion.section
            className="about-section-open"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <h2 className="section-title-open">Core Values</h2>
            <div className="competencies-list-open">
              <div className="competency-item-open">
                <h3>Biomedical Design</h3>
                <p>Innovative medical device design and development</p>
              </div>
              <div className="competency-item-open">
                <h3>Research</h3>
                <p>Medical research and data analysis</p>
              </div>
              <div className="competency-item-open">
                <h3>Healthcare Innovation</h3>
                <p>Developing accessible healthcare solutions</p>
              </div>
              <div className="competency-item-open">
                <h3>Community Impact</h3>
                <p>Supporting underserved communities</p>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  )
}

export default About
