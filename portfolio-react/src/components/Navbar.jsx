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

  useEffect(() => {
    setIsOpen(false)
    window.scrollTo(0, 0)
  }, [location])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-[5vw] transition-all duration-700 ease-[0.16,1,0.3,1] ${
        scrolled 
          ? 'bg-[#080e1a]/95 md:bg-[#080e1a]/80 backdrop-blur-[20px] border-b border-white/5 py-3 md:py-5' 
          : 'bg-transparent py-6 md:py-12'
      }`}
    >
      {/* Logo */}
      <Magnetic>
        <Link to="/" className="logo group p-2">
          T<span className="group-hover:text-white transition-colors duration-500">.</span>
        </Link>
      </Magnetic>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-10">
        <div className="flex items-center gap-8 nav-links">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <Link
                to={link.path}
                className={`text-sm font-bold tracking-tight transition-all duration-300 hover:text-white relative group p-2 ${
                  location.pathname === link.path ? 'text-white' : 'text-text-muted'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-1 left-2 h-px bg-accent-light transition-all duration-500 ${
                  location.pathname === link.path ? 'w-[calc(100%-16px)]' : 'w-0 group-hover:w-[calc(100%-16px)]'
                }`} />
              </Link>
            </Magnetic>
          ))}
        </div>
        
        <div className="w-px h-4 bg-white/10 mx-2" />
        
        <div className="flex items-center gap-5">
          <Magnetic>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-text-muted hover:text-white transition-all p-2" title="LinkedIn">
              <Linkedin size={20} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-text-muted hover:text-white transition-all p-2" title="GitHub (Redirects to LinkedIn)">
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
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 10%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#080e1a] z-[105] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              >
                <Link
                  to={link.path}
                  className={`text-5xl font-heading font-extrabold tracking-tighter ${
                    location.pathname === link.path ? 'text-accent-light' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-10 mt-8"
            >
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Linkedin size={32} />
              </a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Github size={32} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
