import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { ArrowRight, Code, Layout, Palette, Terminal, ExternalLink, Download, ArrowUpRight, Smartphone, Sparkles, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import Magnetic from '../components/Magnetic'
import PassionSection from '../components/PassionSection'
import InfiniteMarquee from '../components/InfiniteMarquee'
import Counter from '../components/Counter'
import LazyImage from '../components/ui/LazyImage'
import HeroBackground3D from '../components/HeroBackground3D'
import HeroPhoto from '../components/HeroPhoto'
import useSEO from '../hooks/useSEO'

// HeroScene removed for creative portfolio layout

// --- Components ---

const TextScramble = ({ text }) => {
  const [displayText, setDisplayText] = useState('')
  const chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  
  useEffect(() => {
    let frame = 0
    const queue = text.split('').map((char, i) => ({
      to: char,
      start: Math.floor(Math.random() * 20),
      end: Math.floor(Math.random() * 20) + 20
    }))
    
    let timer
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
          out += to
        }
      }
      setDisplayText(out)
      if (done < queue.length) {
        frame++
        timer = requestAnimationFrame(update)
      }
    }
    update()
    return () => cancelAnimationFrame(timer)
  }, [text])

  return <span>{displayText || text}</span>
}

// Animated cycling role display
const RoleCycler = () => {
  const { t } = useTranslation()
  const roles = [
    t('hero.roles.graphic'),
    t('hero.roles.web'),
    t('hero.roles.comm')
  ]
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % roles.length)
        setVisible(true)
      }, 350)
    }, 2800)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <span
      className="inline-block text-[var(--color-creative-blue)] font-black tracking-tight transition-all duration-300"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(6px)' }}
    >
      {roles[idx]}
    </span>
  )
}

// Letter-by-letter hero name animation
const AnimatedLetter = ({ char, delay, outline = false }) => (
  <motion.span
    initial={{ opacity: 0, y: 90 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    className={outline ? 'hero-letter-outline' : 'hero-letter-solid'}
  >
    {char}
  </motion.span>
)

const StatCard = ({ number, label, suffix = "+", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.4 } }}
      className="glass-card p-5 md:p-6 rounded-2xl flex flex-col items-center text-center group border-white/5"
    >
      <span className="text-4xl md:text-5xl font-extrabold text-accent-light mb-2 tracking-tighter font-heading">
        <Counter to={parseInt(number)} suffix={suffix} />
      </span>
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">
        {label}
      </span>
    </motion.div>
  )
}

// featuredProjects is now declared inside the Home component to support multi-language translation

export default function Home() {
  const { t, i18n } = useTranslation()
  useSEO('seo.home.title', 'seo.home.desc')

  const featuredProjects = [
    {
      title: "Tharsh Studio",
      category: t('projects.roles.branding'),
      desc: t('projects.desc.tharsh_studio'),
      img: "images/couvertures/tharsh-studio.webp",
      path: "/projets/tharsh-studio",
      imgStyle: { objectPosition: 'center' },
      imgMobileStyle: { objectPosition: 'center' }
    },
    {
      title: "Futsal Drancy",
      category: t('projects.roles.web'),
      desc: t('projects.desc.futsal'),
      img: "images/couvertures/futsal-drancy.webp",
      path: "/projets/futsal",
      imgStyle: { objectPosition: 'center' },
      imgMobileStyle: { objectPosition: 'center' }
    }
  ]

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)')
    setIsMobile(media.matches)
    const listener = (e) => setIsMobile(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const [heroVariant, setHeroVariant] = useState('grain') // 'grain' or 'spotlight'
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const baseUrl = import.meta.env.BASE_URL
  return (
    <main className="relative overflow-hidden bg-transparent">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none -z-10">
      </div>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-16 md:pt-0 md:pb-0 hero-grain-bg bg-transparent"
      >
        {/* Fine grid background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-[0.035]" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} 
          />
        </div>

        {/* Main Hero Container - 2-Column Layout */}
        <div className="relative z-10 w-full section-container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center mt-2 md:mt-0 px-4 md:px-8">
          
          {/* LEFT COLUMN: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8 order-2 lg:order-1 mt-8 lg:mt-0"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-sky-950/30 border border-sky-500/30 text-sky-200/90 shadow-[0_0_20px_rgba(14,165,233,0.15)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-sky-100/90 font-bold uppercase text-[10px] sm:text-xs tracking-[0.2em]">
                BTS Communication · Design Graphique
              </span>
            </div>

            {/* Main Title Area */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <h2 className="text-white/75 font-bold tracking-[0.3em] uppercase text-xs sm:text-sm">
                  {t('hero.welcome')}
                </h2>
              </div>
              <h1 className="font-black animate-text-gradient leading-[0.95] tracking-tight uppercase whitespace-nowrap" style={{ fontSize: 'clamp(2.2rem, 9vw, 5rem)' }}>
                THARSANAN
              </h1>
            </div>

            {/* Tagline */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-white/70 hover:text-white hover:border-sky-500/20 hover:bg-sky-950/10 transition-all duration-300 shadow-sm">
                <Palette size={13} className="text-sky-400" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]">{t('hero.badges.design')}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-white/70 hover:text-white hover:border-sky-500/20 hover:bg-sky-950/10 transition-all duration-300 shadow-sm">
                <Code size={13} className="text-sky-400" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]">{t('hero.badges.dev')}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-white/70 hover:text-white hover:border-sky-500/20 hover:bg-sky-950/10 transition-all duration-300 shadow-sm">
                <Sparkles size={13} className="text-sky-400" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]">{t('hero.badges.comm')}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6 w-full sm:w-auto">
              <Link to="/projets" className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-sky-500/30 bg-sky-950/15 text-white hover:bg-[var(--color-creative-blue)] hover:border-[var(--color-creative-blue)] hover:text-white font-bold uppercase text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(14,165,233,0.1)] hover:shadow-[0_0_35px_rgba(14,165,233,0.45)] group/btn-prim">
                <span>{t('hero.buttons.projects')}</span>
                <ArrowUpRight size={16} className="text-sky-400 group-hover/btn-prim:text-white group-hover/btn-prim:translate-x-0.5 group-hover/btn-prim:-translate-y-0.5 transition-transform duration-300" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-sky-500/35 hover:bg-sky-950/25 font-bold uppercase text-xs tracking-wider transition-all group/btn-sec">
                <span>{t('hero.buttons.contact')}</span>
                <Send size={13} className="text-white/40 group-hover/btn-sec:text-sky-400 group-hover/btn-sec:translate-x-0.5 group-hover/btn-sec:-translate-y-0.5 transition-all duration-300" />
              </Link>

              {/* Language Switcher */}
              <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md self-center sm:self-auto shadow-lg">
                <button 
                  onClick={() => i18n.changeLanguage('fr')}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-wider transition-all uppercase ${i18n.language === 'fr' ? 'bg-[var(--color-creative-blue)] text-white shadow-md shadow-sky-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  FR
                </button>
                <button 
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-wider transition-all uppercase ${i18n.language === 'en' ? 'bg-[var(--color-creative-blue)] text-white shadow-md shadow-sky-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  EN
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Photo & Frame */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative flex justify-center items-center h-[380px] sm:h-[480px] lg:h-[600px] order-1 lg:order-2 mt-4 lg:mt-0"
          >
            <div className="relative z-10">
              <HeroPhoto src={`${baseUrl}images/ma-photo/photo_heros_section_nobg.webp`} alt="Tharsanan" />

              {/* Floating Badge (Bottom Right) */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-4 sm:-right-6 z-30 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-black/90 border-2 border-[var(--color-creative-blue)] shadow-[0_0_25px_rgba(14,165,233,0.45)] text-left flex flex-col gap-1 max-w-[150px] sm:max-w-[190px] pointer-events-none"
              >
                <span className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-wider leading-tight">{t('hero.alternance')}</span>
                <span className="text-[7.5px] sm:text-[9.5px] text-[var(--color-creative-blue)] font-black uppercase tracking-widest leading-none">{t('hero.date')}</span>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
        >
          {/* Desktop Mouse Indicator */}
          <div className="hidden md:flex w-5 h-9 border border-white/20 rounded-full justify-center pt-1.5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-0.5 h-2 bg-[var(--color-creative-blue)] rounded-full shadow-[0_0_8px_var(--color-creative-blue)]"
            />
          </div>

          {/* Mobile Phone Swipe Indicator */}
          <div className="flex md:hidden w-7 h-11 border-2 border-white/20 rounded-[10px] justify-center items-end pb-2 shadow-[0_0_15px_rgba(255,255,255,0.05)] relative">
            {/* Speaker line */}
            <div className="absolute top-1.5 w-2.5 h-[2px] bg-white/30 rounded-full" />
            {/* Swiping dot going UP */}
            <motion.div
              animate={{ y: [0, -12, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 bg-[var(--color-creative-blue)] rounded-full shadow-[0_0_8px_var(--color-creative-blue)]"
            />
          </div>
        </motion.div>

      </section>

      {/* QUICK ABOUT / STATS SECTION */}
      <section className="bg-transparent text-white relative py-12 md:py-20 lg:py-32 z-10">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="section-container relative z-10">
          {/* Section Color Blobs */}
          <div style={{ backgroundColor: '#1e3a8a' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-[0.10] -z-10" />
          

          {/* Top Row: Photo + Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch mb-12 md:mb-20">
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="relative mx-auto lg:mx-0 flex-shrink-0"
            >
              {/* Glow behind photo */}
              <div className="absolute -inset-6 bg-[var(--color-creative-blue)]/20 blur-[60px] rounded-full" />
              
              {/* Floating animation wrapper with mouse tracking */}
              <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] h-auto group mx-auto">
                  {/* Glowing background aura behind image */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-creative-blue)]/30 to-blue-600/5 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 -z-10"></div>
                  
                  {/* Outer container with animated gradient border */}
                  <div className="profile-about-card">
                    <div className="profile-about-inner shadow-2xl">
                      <LazyImage 
                        src={`${baseUrl}images/ma-photo/photo-studio-bleu-final.webp`}
                        alt="Tharsanan"
                        className="w-full h-auto object-contain transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                        skeletonClassName="rounded-[22px]"
                        width={800}
                        height={800}
                      />
                      {/* Sheen sweep ray */}
                      <div className="profile-about-sheen" />
                    </div>
                  </div>
                  
                  {/* Sticker changed to pill */}
                  <div className="absolute bottom-6 -left-4 z-20 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg text-white font-black text-[10px] tracking-widest uppercase rotate-[-5deg] hover:rotate-0 hover:scale-105 transition-all">Design</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative px-6 py-8 md:p-12 bg-black/20 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl text-center lg:text-left w-full self-stretch"
            >


              <p className="text-white/60 font-black tracking-widest uppercase text-[11px] md:text-sm mb-6 flex items-center gap-3 justify-center lg:justify-start">
                <span className="w-8 h-px bg-[var(--color-creative-blue)]/50 shrink-0" />
                {t('about.eyebrow')}
                <span className="w-8 h-px bg-[var(--color-creative-blue)]/50 shrink-0 lg:hidden" />
              </p>

              <h2 className="font-extrabold mb-5 md:mb-8 tracking-normal leading-snug uppercase text-white" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}>
                {t('about.title_start')} <br />{" "}
                <span className="text-[var(--color-creative-blue)]">{t('about.title_tech')}</span>{t('about.title_middle')} <br />{" "}
                <span className="relative inline-block mt-2 px-2 py-1 bg-[var(--color-creative-blue)]/20 border border-[var(--color-creative-blue)]/50 rounded-xl backdrop-blur-md">
                   <span className="absolute inset-0 bg-[var(--color-creative-blue)]/20 blur-md rounded-lg -z-10"></span>
                   <span className="relative z-10">{t('about.title_comm')}</span>
                 </span>
              </h2>
              <div className="space-y-4 md:space-y-6 text-white/80 font-medium text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start">

                <p>
                  {t('about.paragraph')}
                </p>

                {/* Availability badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-full border border-emerald-500/20 bg-black/40 backdrop-blur-md shadow-lg hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-emerald-300 font-bold uppercase tracking-wide sm:tracking-widest text-[8px] xs:text-[9px] md:text-[10px]">
                    {t('about.alternance_pill')}
                  </span>
                </div>
              </div>
              <Link to="/cv" className="mt-10 md:mt-12 inline-flex items-center justify-center lg:justify-start gap-3 font-bold text-white/70 hover:text-white transition-colors group">
                <span className="border-b border-white/20 group-hover:border-white transition-colors pb-1">{t('about.cv_link')}</span>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[var(--color-creative-blue)]/20 group-hover:border-[var(--color-creative-blue)]/50 transition-all">
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Stats Row - Bento Grid Style */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 relative">
             <div className="absolute -top-6 left-6 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/60 font-black text-[9px] uppercase tracking-widest z-20">Analytics</div>
             
             <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group bg-black/30 backdrop-blur-2xl border border-white/5 hover:border-white/20 transition-all duration-500 p-6 md:p-8 rounded-3xl text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <span className="relative text-4xl md:text-5xl font-black text-white block mb-2 drop-shadow-md"><Counter to={4} /></span>
                 <span className="relative text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-[var(--color-creative-blue)] transition-colors">{t('about.stats.studies')}</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="group bg-[var(--color-creative-blue)]/10 backdrop-blur-2xl border border-[var(--color-creative-blue)]/20 hover:border-[var(--color-creative-blue)]/60 transition-all duration-500 p-6 md:p-8 rounded-3xl text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-creative-blue)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <span className="relative text-4xl md:text-5xl font-black text-white block mb-2 drop-shadow-md"><Counter to={1} /></span>
                 <span className="relative text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{t('about.stats.exp')}</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group bg-[var(--color-creative-blue)]/10 backdrop-blur-2xl border border-[var(--color-creative-blue)]/20 hover:border-[var(--color-creative-blue)]/60 transition-all duration-500 p-6 md:p-8 rounded-3xl text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-creative-blue)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <span className="relative text-4xl md:text-5xl font-black text-white block mb-2 drop-shadow-md"><Counter to={6} /></span>
                 <span className="relative text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{t('about.stats.software')}</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="group bg-black/30 backdrop-blur-2xl border border-white/5 hover:border-white/20 transition-all duration-500 p-6 md:p-8 rounded-3xl text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <span className="relative text-4xl md:text-5xl font-black text-white block mb-2 drop-shadow-md"><Counter to={100} suffix="%" /></span>
                 <span className="relative text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-[var(--color-creative-blue)] transition-colors">{t('about.stats.passion')}</span>
              </motion.div>
          </div>
        </div>
      </section>

      {/* INFINITE SKILLS MARQUEE */}
      <InfiniteMarquee />

      {/* FEATURED PROJECTS */}
      <section className="bg-transparent relative py-12 md:py-24">
        <div className="section-container relative">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[var(--color-creative-blue)] rounded-full blur-[140px] opacity-[0.06] -z-10" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-accent-light font-bold tracking-widest uppercase text-[11px] md:text-sm mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-accent-light/60" />
              {t('projects.eyebrow')}
            </p>

            <h2 className="font-black mb-3 md:mb-4 tracking-tighter leading-[1.1] uppercase text-white" style={{ fontSize: 'clamp(1.8rem, 5.5vw, 4rem)' }}>
                {t('projects.title')}
            </h2>
          </motion.div>
        </div>

        <div className="grid gap-12 md:gap-32 mt-12">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center group`}
            >
              <Link to={project.path} className="w-full lg:flex-1 aspect-[16/9] rounded-3xl overflow-hidden relative block border border-white/5 bg-black/40 backdrop-blur-md shadow-2xl hover:border-[var(--color-creative-blue)]/50 hover:shadow-[0_0_40px_rgba(29,78,216,0.2)] transition-all duration-500 group/image">
                <LazyImage 
                   src={`${baseUrl}${project.img}`} 
                  alt={project.title} 
                  className="w-full h-full group-hover/image:scale-105 transition-transform duration-700 ease-out"
                  imgStyle={isMobile ? (project.imgMobileStyle ?? project.imgStyle ?? {}) : (project.imgStyle ?? {})}
                  skeletonClassName="opacity-20"
                  width={800}
                  height={500}
                />
                <div className={`absolute top-4 right-4 font-black uppercase px-4 py-1.5 text-[10px] md:text-xs rounded-full border backdrop-blur-md z-10 ${i === 0 ? 'bg-[var(--color-creative-blue)]/80 text-white border-white/20' : 'bg-black/50 text-white border-white/10'}`}>
                  {project.category}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-500 bg-black/20 backdrop-blur-[2px]">
                  <span className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white font-bold tracking-wider uppercase text-sm transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-500">
                    {t('projects.explore_project')}
                  </span>
                </div>
              </Link>
              <div className="w-full lg:w-[420px] lg:shrink-0">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 mb-4 md:mb-6"
                >
                  <span className="w-8 h-px bg-[var(--color-creative-blue)]/50" />
                  <span className="text-white/50 font-bold text-[11px] md:text-sm tracking-[0.3em] uppercase">
                    {project.category}
                  </span>

                </motion.div>
                <h3 className="font-black mb-4 md:mb-8 tracking-tighter text-white group-hover:text-[var(--color-creative-blue)] transition-colors duration-500 leading-none" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)' }}>
                  {project.title}
                </h3>
                <p className="text-white/70 mb-6 md:mb-12 text-xs sm:text-sm md:text-xl leading-relaxed max-w-md font-medium">
                  {project.desc}
                </p>
                <Magnetic>
                  <Link to={project.path} className="inline-flex items-center gap-4 font-bold text-white group/link text-sm md:text-base px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-[var(--color-creative-blue)]/20 hover:border-[var(--color-creative-blue)]/50 backdrop-blur-md transition-all duration-300 shadow-lg">
                    {t('projects.project_details')}
                    <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </Magnetic>

              </div>
            </motion.div>
          ))}
        </div>

        {/* EXPLORE MORE BUTTON */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 text-center"
        >
          <Magnetic>
            <Link to="/projets" className="btn-outline px-10 py-5 gap-3 group text-base md:text-lg border-accent-light/20 hover:border-accent-light">
              {t('projects.explore_others')}
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </Magnetic>
        </motion.div>
        </div>
      </section>

      {/* MON PROJET FUTUR SECTION */}
      <section className="relative py-24 md:py-40 bg-transparent">
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[var(--color-creative-blue)] rounded-full blur-[160px] opacity-[0.05] -z-10 pointer-events-none" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            {/* The Glass Card Wrapper */}
            <div className="relative rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(14,165,233,0.15)] overflow-hidden">
              {/* Internal glow */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-creative-blue)] opacity-20 blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#06b6d4] opacity-10 blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center lg:items-start text-center lg:text-left">
                {/* Left Side: Title */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center">
                  <p className="text-[var(--color-creative-blue)] font-bold tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 flex items-center justify-center lg:justify-start gap-3">
                    <span className="w-8 h-px bg-[var(--color-creative-blue)]/60" />
                    {t('ambition.tag')}
                  </p>
                  <h2 className="font-black tracking-tighter leading-[1] uppercase text-white" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)' }}>
                    {t('ambition.title_start')}<br className="block md:hidden" />{" "}
                    <span className="text-[var(--color-creative-blue)]" style={{ WebkitTextStroke: '1px white' }}>{t('ambition.title_end')}</span>
                  </h2>
                </div>
                
                {/* Right Side: Text & Actions */}
                <div className="w-full lg:w-[55%] flex flex-col justify-center gap-8 lg:border-l lg:border-white/10 lg:pl-10">
                  <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium" style={{ textTransform: 'none' }}>
                    {i18n.language === 'fr' ? (
                      <>
                        Admis en Licence Professionnelle à l'UPEC pour me spécialiser dans la communication d'intérêt général, je serai <span className="text-white font-bold border-b border-[var(--color-creative-blue)]/50">alternant chargé de communication à l'Association Gaïa</span> (La Courneuve) pour la rentrée de septembre 2026.
                      </>
                    ) : (
                      <>
                        Admitted to the Professional Licence at UPEC to specialize in public interest communication, I will be an <span className="text-white font-bold border-b border-[var(--color-creative-blue)]/50">apprentice Communication Officer at Association Gaïa</span> (La Courneuve) starting September 2026.
                      </>
                    )}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link to="/cv" className="btn-premium-orange px-6 md:px-8 py-3.5 md:py-4 gap-3 w-full sm:w-auto justify-center group">
                      <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
                      {t('ambition.cv_btn')}
                    </Link>
                    <a href="https://www.linkedin.com/in/tharsanan-arulananthaselvam/" target="_blank" rel="noreferrer" className="btn-outline px-6 md:px-8 py-3.5 md:py-4 w-full sm:w-auto justify-center border-[var(--color-creative-blue)]/30 hover:border-[var(--color-creative-blue)] hover:bg-[var(--color-creative-blue)]/10 text-white">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PASSION SECTION */}
      <PassionSection />

      {/* CTA SECTION */}
      <section className="bg-transparent py-32 md:py-48 lg:py-64 relative">
        <div className="absolute inset-0 bg-[var(--color-creative-blue)] opacity-[0.02] mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, var(--color-creative-blue) 0%, transparent 70%)' }} />
        
        <div className="section-container text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            {/* The stunning CTA block */}
            <div className="relative group rounded-[3rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-creative-blue)]/0 via-[var(--color-creative-blue)]/10 to-[var(--color-creative-blue)]/0 blur-2xl group-hover:opacity-100 opacity-50 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative py-16 md:py-24 px-6 md:px-12 border border-white/10 bg-black/30 backdrop-blur-md rounded-[3rem]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-[var(--color-creative-blue)]/10 blur-[120px] -z-10 pointer-events-none" />
                
                <p className="text-white/40 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 flex justify-center items-center gap-4">
                  <span className="w-12 h-px bg-white/20" />
                  Contact
                  <span className="w-12 h-px bg-white/20" />
                </p>

                <h2 className="font-black mb-12 text-white tracking-tighter leading-[0.95] uppercase relative" style={{ fontSize: 'clamp(2rem, 7vw, 6rem)' }}>
                  {t('home_cta.title')} <br />
                  <span className="editorial-title-outline text-[var(--color-creative-blue)] mt-4 inline-block -rotate-2 transform hover:rotate-0 transition-transform duration-500">{t('home_cta.highlight')}</span>
                  
                  <div className="absolute -top-6 -right-6 md:-right-12 sticker-shape sticker-blue rotate-[12deg] shadow-[0_0_30px_rgba(14,165,233,0.4)] cursor-default hidden sm:block">Hello! 👋</div>
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-4">
                  <Link to="/contact" className="btn-premium-orange px-10 md:px-12 py-4 md:py-5 w-full sm:w-auto text-sm md:text-base group shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)]">
                    {t('home_cta.btn')}
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <a href="mailto:tharsananarul@gmail.com" className="px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all text-sm md:text-base flex items-center justify-center gap-3 backdrop-blur-md w-full sm:w-auto group">
                    tharsananarul@gmail.com
                    <ArrowRight size={18} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[var(--color-creative-blue)]" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
