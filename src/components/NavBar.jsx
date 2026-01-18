import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './NavBar.css'

const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/about', label: 'About Me' },
    { path: '/projects', label: 'Projects' },
    { path: '/resume', label: 'Experience' },
    { path: '/donate', label: 'Donate!' }
  ]


  return (
    <motion.nav
      className={`nav-bar ${isHome ? 'nav-home' : ''} ${isScrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Link to="/" className="nav-home-link-hala" aria-label="Home">
        <img src="/assets/ChatGPT Image Jan 18, 2026 at 01_07_29 PM.png" alt="Home" className="nav-home-image" />
      </Link>

      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            className="nav-items"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default NavBar
