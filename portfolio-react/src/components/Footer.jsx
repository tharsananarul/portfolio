import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Instagram, ArrowUp, ArrowUpRight, Mail, Phone, Copy, Check, Clock, Globe, Sparkles, Smile, Compass, Heart } from 'lucide-react'
import Magnetic from './Magnetic'
import { useToast } from '../hooks/useToast'



// --- MAIN FOOTER COMPONENT ---
export default function Footer() {
  const showToast = useToast()
  const location = useLocation()
  const linkedinUrl = "https://www.linkedin.com/in/tharsanan-arulananthaselvam/"
  const [copied, setCopied] = useState(false)
  const [time, setTime] = useState('')

  // Live Paris Time Clock
  useEffect(() => {
    const updateTime = () => {
      const formatted = new Date().toLocaleTimeString('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      setTime(formatted)
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.position = "fixed"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      setCopied(true)
      if (showToast) showToast("Email copié !", "success")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Fallback copy failed', err)
    }
    document.body.removeChild(textArea)
  }

  const handleCopyEmail = () => {
    const email = "tharsananarul@gmail.com"
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true)
        if (showToast) showToast("Email copié !", "success")
        setTimeout(() => setCopied(false), 2000)
      }).catch(err => {
        console.error("Failed to copy using navigator: ", err)
        fallbackCopyText(email)
      })
    } else {
      fallbackCopyText(email)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const row1Items = ["DESIGN DIGITAL", "LICENCE PRO COM", "DIRECTION ARTISTIQUE", "CREATIVE PORTFOLIO"]

  return (
    <footer className="bg-transparent relative z-10 overflow-hidden pt-16 pb-8">
      {/* Background Decorative Blob Elements */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[var(--color-creative-blue)]/5 blur-[130px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-[50vw] h-[50vw] rounded-full bg-[var(--color-creative-blue)]/5 blur-[130px] pointer-events-none -z-10 animate-pulse" />

      <div className="w-full overflow-hidden whitespace-nowrap py-5 md:py-6 select-none relative mb-16 border-b border-white/5 bg-slate-950/20">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex flex-row flex-nowrap shrink-0 items-center gap-10 pr-10 font-heading font-black text-[10px] md:text-sm tracking-[0.25em] text-white/15 uppercase w-max"
        >
          {[...row1Items, ...row1Items].map((item, i) => (
            <div key={i} className="flex flex-row flex-nowrap shrink-0 items-center gap-10 whitespace-nowrap">
              <span className="whitespace-nowrap shrink-0">{item}</span>
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--color-creative-blue)]/40 shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* 2. BENTO GRID SYSTEM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 lg:gap-8 mb-16">
          {/* Card 1: Brand Info & Paris Time (Span 4) */}
          <div className="md:col-span-4 p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between min-h-[220px] md:min-h-[250px]">
            <div>
              <div className="logo mb-3 inline-flex items-center justify-center font-heading font-black text-sm md:text-lg tracking-[0.2em] text-white uppercase select-none">
                THARSANAN<span className="text-[var(--color-creative-blue)]">.</span>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <p className="text-white/75 text-xs md:text-[14px] leading-relaxed font-semibold">
                  Futur étudiant en Licence Pro Communication.
                </p>
                <p className="text-white/45 text-[11px] md:text-xs leading-relaxed border-l-2 border-[var(--color-creative-blue)]/30 pl-3">
                  En recherche d'une alternance dans la communication digitale.
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              {/* Paris Clock */}
              <div className="flex items-center gap-2 text-white/40 text-[11px] md:text-xs font-mono">
                <Clock size={13} className="text-[var(--color-creative-blue)] animate-pulse" />
                <span>Paris, FR :</span>
                <span className="text-white font-bold tracking-wider">{time || '00:00:00'}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-white/20 text-[9px] md:text-[10px] font-mono">
                <Globe size={11} />
                <span>GMT+2</span>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Navigation Sitemap (Span 4) */}
          <div className="md:col-span-4 p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between min-h-[220px] md:min-h-[250px]">
            <p className="text-white/30 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 font-mono">Navigation</p>
            <div className="flex flex-col gap-2 md:gap-3">
              {[
                { name: 'Accueil', path: '/' },
                { name: 'Projets', path: '/projets' },
                { name: 'CV', path: '/cv' },
                { name: 'Compétences', path: '/competences' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`text-xs md:text-[14px] font-semibold flex items-center justify-between group transition-colors py-1 border-b border-white/[0.02] hover:border-white/10 ${
                    location.pathname === link.path ? 'text-[var(--color-creative-blue)]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-white/40" />
                </Link>
              ))}
            </div>
          </div>

          {/* Card 3: Contact Details & Socials (Span 4) */}
          <div className="md:col-span-4 p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between min-h-[220px] md:min-h-[250px]">
            <div>
              <p className="text-white/30 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 font-mono">Contact</p>
              <div className="flex flex-col gap-2.5">
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 p-2.5 md:p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all group w-full text-left cursor-pointer"
                >
                  <Mail size={15} className="text-[11px] md:text-xs font-mono text-white/80 group-hover:text-white truncate" />
                  <span className="text-[11px] md:text-xs font-mono text-white/80 group-hover:text-white truncate">
                    {copied ? "Email copié !" : "tharsananarul@gmail.com"}
                  </span>
                </button>

                <a 
                  href="tel:0749878775" 
                  className="flex items-center gap-3 p-2.5 md:p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all group"
                >
                  <Phone size={15} className="text-sky-400 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs font-mono text-white/80 group-hover:text-white">07 49 87 87 75</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-4 border-t border-white/5 mt-4">
              <div className="flex items-center gap-2">
                <Smile size={13} className="text-[var(--color-creative-yellow)]" />
                <span className="text-[9px] md:text-[10px] text-white/30 font-bold uppercase tracking-wider">Socials</span>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/[0.01] hover:bg-blue-500/10 border border-white/5 hover:border-sky-400/50 text-sky-400 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                  title="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
                <a 
                  href="https://www.instagram.com/tharsh.studio/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/[0.01] hover:bg-gradient-to-tr hover:from-yellow-500/10 hover:to-pink-500/10 border border-white/5 hover:border-sky-400/50 text-sky-400 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                  title="Instagram"
                >
                  <Instagram size={15} />
                </a>
                <a 
                  href="https://github.com/tharsananarul" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/[0.01] hover:bg-white/10 border border-white/5 hover:border-sky-400/50 text-sky-400 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                  title="GitHub"
                >
                  <Github size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM BAR WITH SCROLL TO TOP */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-8 border-t border-white/5">
          <p className="text-[10px] md:text-xs text-white/35 font-semibold tracking-wider uppercase">
            © 2026 Tharsanan. Tous droits réservés.
          </p>
          
          <Magnetic>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-3 text-[10px] md:text-xs font-bold text-white/45 hover:text-white transition-colors group uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] cursor-pointer"
            >
              <span>Retour en haut</span> 
              <div className="p-1 rounded-full bg-white/5 group-hover:bg-[var(--color-creative-blue)]/20 group-hover:text-[var(--color-creative-blue)] transition-all duration-300">
                <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
