import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'

import Loader from './components/Loader'
import CharacterGraphic from './components/CharacterGraphic'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import ServiceDetail from './pages/ServiceDetail'
import AboutDetail from './pages/AboutDetail'
import PageTransition from './components/PageTransition'
import CustomCursor from './components/CustomCursor'

// ═══════════════════════════════════════════════
// GLOBAL LAYOUT (Cursor & Lenis)
// ═══════════════════════════════════════════════
function Layout({ children }) {
  // We handle lenis here to refresh it on route change if needed
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <div className="grain-overlay" />
      <CustomCursor />
      <CharacterGraphic />
      {children}
    </>
  )
}

function AnimatedRoutes({ loaded }) {
  const location = useLocation()

  return (
    <>
      <Loader loaded={loaded} />
      <PageTransition />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/about" element={<AboutDetail />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <Layout>
        <AnimatedRoutes loaded={loaded} />
      </Layout>
    </Router>
  )
}
