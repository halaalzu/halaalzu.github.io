import { useEffect } from 'react'
import { motion } from 'framer-motion'
import NavBar from '../components/NavBar'
import { charities } from '../data/charities'
import './Charity.css'

const Charity = () => {
  useEffect(() => {
    // Soccer ball rolling animation trigger on mount
  }, [])

  return (
    <div className="charity-page">
      <NavBar />
      <div className="notebook-background" />
      
      {/* Rolling Soccer Ball Animation */}
      <motion.div
        className="rolling-soccer-ball"
        initial={{ x: -200, rotate: -360 }}
        animate={{ x: '50vw', rotate: 0 }}
        transition={{
          duration: 1.5,
          ease: 'easeOut',
          delay: 0.5
        }}
      >
        <img src="/assets/soccer-ball.png" alt="Soccer Ball" className="soccer-ball-img" />
      </motion.div>

      <motion.div
        className="charity-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          Charities I Support
        </motion.h1>

        <motion.p
          className="charity-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          These are the organizations and causes I'm passionate about supporting. 
          Each charity works to make a meaningful difference in communities and lives around the world.
        </motion.p>

        <div className="charities-grid">
          {charities.map((charity, index) => (
            <motion.div
              key={charity.id}
              className="charity-card"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {charity.image ? (
                <div className="charity-image">
                  <img src={charity.image} alt={charity.name} />
                </div>
              ) : (
                <div className="charity-placeholder">
                  <span className="placeholder-icon">🤲</span>
                </div>
              )}
              
              <div className="charity-content">
                <h3 className="charity-name">{charity.name}</h3>
                <p className="charity-description">{charity.description}</p>
                
                {charity.link && (
                  <motion.a
                    href={charity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="charity-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More →
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {charities.length === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="empty-icon">🤲</span>
            <p>Check back soon for charities I'm supporting!</p>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative Elements */}
      <div className="decorative-elements">
        <div className="decor decor-1">❤️</div>
        <div className="decor decor-2">🌍</div>
        <div className="decor decor-3">🤝</div>
      </div>
    </div>
  )
}

export default Charity
