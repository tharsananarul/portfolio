import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import Magnetic from './Magnetic'

const navLinks = [
  { name: 'Projets', path: '/projets' },
  { name: 'CV', path: '/cv' },
  { name: 'Compétences', path: '/competences' },
  { name: 'Contact', path: '/contact' },
]

const LogoScramble = () => {
  const [text, setText] = useState('T')
  const [isHovered, setIsHovered] = useState(false)
  const fullText = 'THARSANAN'
  const shortText = 'T'
  const chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  useEffect(() => {
    if (!isHovered) {
      setText(shortText)
      return
    }

    let frame = 0
    let timer
    const targetText = fullText
    const queue = targetText.split('').map((char, i) => ({
      to: char,
      start: Math.floor(Math.random() * 20),
      end: Math.floor(Math.random() * 20) + 20
    }))

    const update = () => {
      let out = ''
      let done = 0
      for (let i = 0; i < queue.length; i++) {
        let { to, start, end } = queue[i]
        if (frame >= end) {
          done++
          out += to
        } else if (frame >= start) {
          out += chars[Math.floor(Math.random() * chars.length)]
        } else {
          out += ' '
        }
      }
      setText(out)
      if (done < queue.length) {
        frame++
        timer = requestAnimationFrame(update)
      }
    }
    update()
    return () => cancelAnimationFrame(timer)
  }, [isHovered])

  return (
    <Link 
      to="/" 
      className="logo group p-1.5 md:p-2 min-w-[40px] md:min-w-[50px] inline-flex items-center justify-center bg-white border-2 md:border-4 border-black shadow-[4px_4px_0_0_#000] rotate-[-2deg] hover:rotate-0 hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-heading font-black text-xl md:text-3xl tracking-tighter text-black uppercase leading-none select-none">
        {text}
        <span className="text-[var(--color-creative-blue)]">.</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const linkedinUrl = "https://www.linkedin.com/in/tharsanan-arulananthaselvam/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => document.body.style.overflow = ''
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
    window.scrollTo(0, 0)
  }, [location])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-[5vw] transition-all duration-700 ease-[0.16,1,0.36,1] ${
        scrolled 
          ? 'bg-[#01081a] md:bg-[#01081a]/90 md:backdrop-blur-xl border-b border-white/5 py-3 md:py-4 shadow-2xl' 
          : 'bg-transparent py-4 md:py-8'
      }`}
    >
      {/* Logo */}
      <Magnetic>
        <LogoScramble />
      </Magnetic>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-10">
        <div className="flex items-center gap-8 nav-links">
          {navLinks.map((link, i) => {
            const color = 'blue';
            return (
            <Magnetic key={link.name}>
              <Link
                to={link.path}
                className={`text-[13px] font-semibold tracking-tight transition-all duration-300 relative group p-2 ${
                  location.pathname === link.path ? `text-[var(--color-creative-${color})]` : `text-white/80 hover:text-white`
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-2 h-[1px] bg-[var(--color-creative-${color})] transition-all duration-500 ${
                  location.pathname === link.path ? 'w-[calc(100%-16px)]' : 'w-0 group-hover:w-[calc(100%-16px)]'
                }`} />
              </Link>
            </Magnetic>
          )})}
        </div>
        
        <div className="w-px h-4 bg-white/10 mx-2" />
        
        <div className="flex items-center gap-5">
          <Magnetic>
            <a href="https://www.linkedin.com/in/tharsanan-arulananthaselvam/" target="_blank" rel="noreferrer" className="text-text-muted hover:text-white transition-all p-2" title="LinkedIn">
              <Linkedin size={20} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="https://github.com/tharsananarul" target="_blank" rel="noreferrer" className="text-text-muted hover:text-white transition-all p-2" title="GitHub">
              <Github size={20} />
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden flex flex-col gap-2 p-2 z-[110] relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-500 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-primary/60 backdrop-blur-md z-[101] md:hidden"
            />
            
            {/* Sidebar Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform' }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-[#01081a] z-[105] flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.8)] md:hidden border-l border-white/5"
            >
              <div className="flex flex-col p-10 pt-32 gap-8 items-start">
                <p className="text-white/30 font-bold tracking-[0.3em] uppercase text-[10px] mb-4">Navigation</p>
                {navLinks.map((link, i) => {
                  const color = 'blue';
                  return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-lg font-black uppercase tracking-wider block transition-all duration-300 ${
                        location.pathname === link.path 
                          ? `text-[var(--color-creative-${color})]` 
                          : `text-white hover:text-[var(--color-creative-${color})]`
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )})}
              </div>
              
              <div className="mt-auto p-10 bg-white/[0.02] border-t border-white/5">
                <div className="flex items-center gap-6 mb-10">
                  <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[var(--color-creative-blue)] transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://github.com/tharsananarul" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[var(--color-creative-blue)] transition-colors">
                    <Github size={24} />
                  </a>
                </div>
                <p className="text-white/20 font-bold tracking-[0.2em] uppercase text-[10px]">
                  © 2026 Tharsanan Arul
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
