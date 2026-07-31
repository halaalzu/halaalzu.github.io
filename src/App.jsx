import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import WorkDetail from './pages/WorkDetail'
import Resume from './pages/Resume'
import Charity from './pages/Charity'
import './App.css'

// Scroll to top on route change — unless the link carried a hash, in which case
// go to that section instead (e.g. /#projects, coming back from a work page).
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/donate" element={<Charity />} />
      </Routes>
    </Router>
  )
}

export default App
