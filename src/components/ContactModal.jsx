import { motion, AnimatePresence } from 'framer-motion'
import { contactInfo } from '../data/contact'
import './ContactModal.css'

const ContactModal = ({ isOpen, onClose }) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}`
  }

  const handleResumeClick = () => {
    window.open(contactInfo.resumeUrl, '_blank')
  }

  const handleGithubClick = () => {
    window.open(contactInfo.github, '_blank')
  }

  const handleLinkedInClick = () => {
    window.open(contactInfo.linkedin, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="contact-modal-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="contact-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button className="modal-close" onClick={onClose} aria-label="Close modal">
              ×
            </button>
            <h2 id="modal-title" className="modal-title">Connect with Me</h2>
            <div className="contact-icons-grid">
              <motion.button
                className="contact-icon-button github"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGithubClick}
                aria-label="GitHub"
              >
                <div className="contact-icon-image">
                  {/* Add your GitHub icon image here */}
                  <img src="/assets/github-icon.png" alt="GitHub" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <span className="contact-icon-label">GitHub</span>
              </motion.button>

              <motion.button
                className="contact-icon-button linkedin"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLinkedInClick}
                aria-label="LinkedIn"
              >
                <div className="contact-icon-image">
                  {/* Add your LinkedIn icon image here */}
                  <img src="/assets/linkedin-icon.png" alt="LinkedIn" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <span className="contact-icon-label">LinkedIn</span>
              </motion.button>

              <motion.button
                className="contact-icon-button email"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEmailClick}
                aria-label="Email"
              >
                <div className="contact-icon-image">
                  {/* Add your Email icon image here */}
                  <img src="/assets/email-icon.png" alt="Email" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <span className="contact-icon-label">Email</span>
              </motion.button>

              <motion.button
                className="contact-icon-button resume"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResumeClick}
                aria-label="Resume"
              >
                <div className="contact-icon-image">
                  {/* Add your Resume icon image here */}
                  <img src="/assets/resume-icon.png" alt="Resume" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <span className="contact-icon-label">Resume</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactModal
