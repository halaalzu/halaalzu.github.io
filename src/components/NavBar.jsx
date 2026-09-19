import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './NavBar.css'

const NavBar = () => {
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

  return (
    <motion.nav
      className={`nav-bar ${isHome ? 'nav-home' : ''} ${isScrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="nav-home-link-hala" aria-label="Home">
        <img src="/assets/ChatGPT Image Jan 18, 2026 at 01_07_29 PM.png" alt="Home" className="nav-home-image" />
      </Link>
    </motion.nav>
  )
}

export default NavBar
