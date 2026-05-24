import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Instagram, X } from 'lucide-react'
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
      className="logo group py-1.5 px-4 md:py-2 md:px-5 min-w-[40px] md:min-w-[50px] inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 hover:border-white/25 rounded-full transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-heading font-black text-xs md:text-sm tracking-[0.25em] text-white uppercase leading-none select-none">
        {text}
        <span className="text-[var(--color-creative-blue)]">.</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDimmed, setIsDimmed] = useState(false)
  const location = useLocation()
  const linkedinUrl = "https://www.linkedin.com/in/tharsanan-arulananthaselvam/"

  useEffect(() => {
    let previousScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 40)
      
      if (currentScrollY > previousScrollY && currentScrollY > 80) {
        setIsDimmed(true)
      } else {
        setIsDimmed(false)
      }
      previousScrollY = currentScrollY
    }
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
    <>
      <nav 
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] max-w-5xl z-[100] flex items-center justify-between px-4 md:px-6 rounded-full border transition-all duration-500 ease-[0.16,1,0.3,1] ${
          isDimmed 
            ? 'opacity-55 scale-98 bg-[#060a18]/65 backdrop-blur-[3px] border-[#0ea5e9]/15 py-2 shadow-[0_4px_20px_rgba(14,165,233,0.06)] pointer-events-auto' 
            : scrolled
              ? 'opacity-100 scale-100 bg-[#060a18]/90 backdrop-blur-lg border-[#0ea5e9]/25 py-2.5 shadow-[0_4px_30px_rgba(14,165,233,0.18)]' 
              : 'opacity-100 scale-100 bg-[#060a18]/80 backdrop-blur-md border-[#0ea5e9]/20 py-3 shadow-[0_4px_30px_rgba(14,165,233,0.12)]'
        } hover:opacity-100 hover:scale-100 hover:bg-[#060a18]/95 hover:backdrop-blur-lg hover:border-[#0ea5e9]/30 hover:py-2.5 hover:shadow-[0_4px_30px_rgba(14,165,233,0.22)]`}
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
                  className={`font-heading text-[10px] md:text-[11px] tracking-[0.15em] uppercase transition-all duration-300 relative group py-1.5 px-3 rounded-full hover:bg-white/5 ${
                    location.pathname === link.path ? `text-[var(--color-creative-${color})]` : `text-white/80 hover:text-white`
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0.5 left-3 h-[1px] bg-[var(--color-creative-${color})] transition-all duration-500 ${
                    location.pathname === link.path ? 'w-[calc(100%-24px)]' : 'w-0 group-hover:w-[calc(100%-24px)]'
                  }`} />
                </Link>
              </Magnetic>
            )})}
          </div>
          
          <div className="w-px h-4 bg-white/10 mx-2" />
          
          <div className="flex items-center gap-3">
            <Magnetic>
              <a href="https://www.linkedin.com/in/tharsanan-arulananthaselvam/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-all p-2 hover:scale-115" title="LinkedIn">
                <Linkedin size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://github.com/tharsananarul" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-all p-2 hover:scale-115" title="GitHub">
                <Github size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://www.instagram.com/tharsh.studio/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-all p-2 hover:scale-115" title="Instagram">
                <Instagram size={18} />
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
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay (Dims background gently) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[101] md:hidden"
            />
            
            {/* Floating Glass Panel Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="fixed top-20 left-4 right-4 z-[105] bg-[#071129]/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_24px_50px_rgba(0,0,0,0.6)] flex flex-col md:hidden overflow-hidden max-h-[80vh]"
            >
              {/* Header inside floating Menu */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="logo py-1 px-3 bg-white/5 border border-white/10 rounded-full font-heading font-black text-[10px] tracking-[0.2em] text-white uppercase select-none">
                  THARSANAN<span className="text-[var(--color-creative-blue)]">.</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 hover:text-white transition-all transform hover:rotate-90 duration-300"
                  aria-label="Close menu"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Staggered Navigation Links */}
              <div className="flex flex-col px-6 py-6 gap-4">
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-[0.3em] mb-1">Navigation</p>
                {navLinks.map((link, i) => {
                  const number = `0${i + 1}`;
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                      className="group"
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-baseline gap-3 py-1.5 border-b border-white/[0.01]"
                      >
                        <span className={`font-mono text-[10px] font-bold tracking-widest ${isActive ? 'text-[var(--color-creative-blue)]' : 'text-white/20 group-hover:text-white/40'} transition-all duration-300`}>
                          {number}
                        </span>
                        <span className={`font-heading text-lg font-black uppercase tracking-[0.1em] transition-all duration-300 ${isActive ? 'text-[var(--color-creative-blue)] translate-x-1.5' : 'text-white/80 group-hover:text-white group-hover:translate-x-1.5'}`}>
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Status & Local Contact Footer */}
              <div className="mt-auto px-6 py-5 flex flex-col gap-4 bg-white/[0.01] border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-white/25 font-bold uppercase tracking-[0.2em]">Statut</span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[8px] font-bold tracking-wider uppercase animate-pulse">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                      Disponible
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[var(--color-creative-blue)] transition-colors p-1.5 bg-white/5 rounded-full border border-white/5" title="LinkedIn">
                      <Linkedin size={14} />
                    </a>
                    <a href="https://github.com/tharsananarul" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[var(--color-creative-blue)] transition-colors p-1.5 bg-white/5 rounded-full border border-white/5" title="GitHub">
                      <Github size={14} />
                    </a>
                    <a href="https://www.instagram.com/tharsh.studio/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[var(--color-creative-blue)] transition-colors p-1.5 bg-white/5 rounded-full border border-white/5" title="Instagram">
                      <Instagram size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
