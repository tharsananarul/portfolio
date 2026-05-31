import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { ArrowRight, Code, Layout, Palette, Terminal, ExternalLink, Download, ArrowUpRight, Smartphone, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import Magnetic from '../components/Magnetic'
import PassionSection from '../components/PassionSection'
import InfiniteMarquee from '../components/InfiniteMarquee'
import Counter from '../components/Counter'
import LazyImage from '../components/ui/LazyImage'
import HeroBackground3D from '../components/HeroBackground3D'

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
const roles = ['Design Graphique', 'Développement Web', 'Communication Digitale']
const RoleCycler = () => {
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
  }, [])

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

const featuredProjects = [
  {
    title: "Futsal Drancy",
    category: "Web Dev & Communication",
    desc: "Conception intégrale du site web et branding du club. Un projet de site interactif développé en Vibe Coding (Antigravity).",
    img: "images/couvertures/futsal-drancy.png",
    path: "/projets/futsal"
  },
  {
    title: "UI/UX Works",
    category: "Design & Développement",
    desc: "Plateforme BTS Révision et projet HopePower. Des sites web conçus en Vibe Coding (Antigravity/Framer) pour une interactivité optimale.",
    img: "images/couvertures/ui-ux-designs.png",
    path: "/projets/ux"
  }
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const baseUrl = import.meta.env.BASE_URL

  const mousePosRef = useRef({ x: 0, y: 0 })

  // Mouse-tracking spotlight
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)
  const springX = useSpring(spotX, { stiffness: 60, damping: 20 })
  const springY = useSpring(spotY, { stiffness: 60, damping: 20 })

  const handleHeroMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    spotX.set(((e.clientX - rect.left) / rect.width) * 100)
    spotY.set(((e.clientY - rect.top) / rect.height) * 100)
  }, [spotX, spotY])

  // Reactive spotlight background via motion template
  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${springX}% ${springY}%, rgba(14,165,233,0.11) 0%, transparent 65%)`

  return (
    <main className="relative overflow-hidden bg-transparent">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none -z-10">
      </div>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-16 md:pt-0 md:pb-0 bg-transparent"
      >
        {/* Cursor spotlight */}
        <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ background: spotlightBg }} />

        {/* Main Hero Container - 2-Column Layout */}
        <div className="relative z-10 w-full section-container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center mt-2 md:mt-0 px-4 md:px-8">
          
          {/* LEFT COLUMN: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8 order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
              <span className="w-4 h-px bg-white/30 hidden sm:block" />
              <span className="text-white/80 font-black tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                BTS Communication · Design Graphique
              </span>
              <span className="w-4 h-px bg-white/30 hidden sm:block" />
            </div>

            {/* Main Title Area */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-creative-blue)] animate-pulse shadow-[0_0_10px_var(--color-creative-blue)]" />
                <h2 className="text-white/60 font-medium tracking-[0.3em] uppercase text-sm md:text-lg">
                  Bienvenue, je suis
                </h2>
              </div>
              
              <h1 className="text-[11vw] sm:text-[10vw] md:text-6xl lg:text-[7vw] xl:text-[90px] font-black text-white leading-[0.9] tracking-tight drop-shadow-xl uppercase whitespace-nowrap">
                THARSANAN
              </h1>
            </div>

            {/* Tagline */}
            <p className="flex items-center gap-3 text-white/90 font-bold text-xs sm:text-sm md:text-base uppercase tracking-[0.2em]">
              <Sparkles size={18} className="text-[var(--color-creative-blue)] shrink-0" />
              Design · Développement · Communication
              <Sparkles size={18} className="text-[var(--color-creative-blue)] shrink-0 lg:hidden" />
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <Link to="/projets" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase text-xs sm:text-sm tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Découvrir mes projets
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white/90 hover:text-white hover:bg-white/10 font-bold uppercase text-xs sm:text-sm tracking-widest transition-colors backdrop-blur-sm">
                Me contacter
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Photo & Circle */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative flex justify-center items-center h-[350px] sm:h-[450px] lg:h-[600px] order-1 lg:order-2 mt-4 lg:mt-0"
          >
              <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.4, duration: 2, delay: 0.3 }}
                  className="absolute z-0 h-[280px] w-[280px] sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px] rounded-full bg-[var(--color-creative-blue)]/80 blur-xl shadow-[0_0_100px_rgba(14,165,233,0.4)]"
              />
              <motion.img
                  src="/photo_heros_section_nobg.png"
                  alt="Tharsanan"
                  className="relative z-10 h-auto w-[240px] sm:w-[300px] lg:w-[400px] xl:w-[450px] drop-shadow-2xl object-contain origin-bottom"
                  style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
                  initial={{ opacity: 0, scale: 0.5, y: 150, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ type: "spring", bounce: 0.5, duration: 2, delay: 0.4 }}
              />
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
          <div className="grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center mb-16 md:mb-24">
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
                  {/* Changed brutalist border to elegant glow/glass backplate */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-creative-blue)]/30 to-transparent rounded-3xl blur-xl transition-all group-hover:blur-2xl"></div>
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm">
                    <LazyImage 
                      src={`${baseUrl}images/ma-photo/photo-studio-bleu-final.png`}
                      alt="Tharsanan"
                      className="w-full h-auto object-contain grayscale-0 hover:grayscale transition-all duration-500"
                      skeletonClassName="rounded-3xl"
                    />
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
              className="text-center lg:text-left relative"
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl rounded-[40px] -m-8 md:-m-12 border border-white/5 shadow-2xl -z-10" />

              <p className="text-white/60 font-black tracking-widest uppercase text-[11px] md:text-sm mb-6 flex items-center gap-3 justify-center lg:justify-start">
                <span className="w-8 h-px bg-[var(--color-creative-blue)]/50" />
                Qui suis-je ?
              </p>

              <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter leading-tight uppercase relative inline-block text-white">
                Un parcours entre <br />
                <span className="mt-2 inline-block text-[var(--color-creative-blue)]">technique</span> et <br />
                <span className="relative inline-block mt-2">
                   <span className="absolute inset-0 bg-[var(--color-creative-blue)]/20 blur-md rounded-lg"></span>
                   <span className="relative z-10 px-2 py-1 bg-[var(--color-creative-blue)]/20 border border-[var(--color-creative-blue)]/50 rounded-xl backdrop-blur-md">communication</span>
                </span>
              </h2>
              <div className="space-y-4 md:space-y-6 text-white/80 font-medium text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start">

                <p>
                  Après un début en BUT Métiers du Multimédia et de l'Internet, j'ai choisi de me spécialiser en communication. 
                  Ce parcours m'a permis de développer à la fois des compétences techniques et une vision créative orientée vers le digital.
                </p>

                {/* Availability badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-full border border-emerald-500/20 bg-black/40 backdrop-blur-md shadow-lg hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-emerald-300 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
                    En recherche d'alternance · Sept. 2026
                  </span>
                </div>
              </div>
              <Link to="/cv" className="mt-10 md:mt-12 inline-flex items-center justify-center lg:justify-start gap-3 font-bold text-white/70 hover:text-white transition-colors group">
                <span className="border-b border-white/20 group-hover:border-white transition-colors pb-1">Voir mon parcours complet</span>
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
                 <span className="relative text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-[var(--color-creative-blue)] transition-colors">Ans d'études</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="group bg-[var(--color-creative-blue)]/10 backdrop-blur-2xl border border-[var(--color-creative-blue)]/20 hover:border-[var(--color-creative-blue)]/60 transition-all duration-500 p-6 md:p-8 rounded-3xl text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-creative-blue)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <span className="relative text-4xl md:text-5xl font-black text-white block mb-2 drop-shadow-md"><Counter to={1} /></span>
                 <span className="relative text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">An d'expérience</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group bg-[var(--color-creative-blue)]/10 backdrop-blur-2xl border border-[var(--color-creative-blue)]/20 hover:border-[var(--color-creative-blue)]/60 transition-all duration-500 p-6 md:p-8 rounded-3xl text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-creative-blue)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <span className="relative text-4xl md:text-5xl font-black text-white block mb-2 drop-shadow-md"><Counter to={6} /></span>
                 <span className="relative text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Logiciels</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="group bg-black/30 backdrop-blur-2xl border border-white/5 hover:border-white/20 transition-all duration-500 p-6 md:p-8 rounded-3xl text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <span className="relative text-4xl md:text-5xl font-black text-white block mb-2 drop-shadow-md"><Counter to={100} suffix="%" /></span>
                 <span className="relative text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-[var(--color-creative-blue)] transition-colors">Passionné</span>
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
              Projets Phares
            </p>

            <h2 className="font-black mb-3 md:mb-4 tracking-tighter leading-[1.1] uppercase text-white" style={{ fontSize: 'clamp(2.2rem, 8vw, 5.5rem)' }}>
                Une sélection <br />
                <span className="text-[var(--color-creative-blue)]" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>des travaux</span> <br />
                <span className="relative inline-block mt-2">
                   <span className="absolute inset-0 bg-[var(--color-creative-blue)]/20 blur-md rounded-lg"></span>
                   <span className="relative z-10 px-3 py-1 bg-[var(--color-creative-blue)]/20 border border-[var(--color-creative-blue)]/50 rounded-xl backdrop-blur-md rotate-1 inline-block">phares</span>
                </span>
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
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-24 items-center group`}
            >
              <Link to={project.path} className="w-full lg:w-[60%] aspect-[16/9] rounded-3xl overflow-hidden relative block border border-white/5 bg-black/40 backdrop-blur-md shadow-2xl hover:border-[var(--color-creative-blue)]/50 hover:shadow-[0_0_40px_rgba(29,78,216,0.2)] transition-all duration-500 group/image">
                <LazyImage 
                   src={`${baseUrl}${project.img}`} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-700 ease-out"
                  skeletonClassName="opacity-20"
                />
                <div className={`absolute top-4 right-4 font-black uppercase px-4 py-1.5 text-[10px] md:text-xs rounded-full border backdrop-blur-md z-10 ${i === 0 ? 'bg-[var(--color-creative-blue)]/80 text-white border-white/20' : 'bg-black/50 text-white border-white/10'}`}>
                  {project.category}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-500 bg-black/20 backdrop-blur-[2px]">
                  <span className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white font-bold tracking-wider uppercase text-sm transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-500">
                    Explorer le projet
                  </span>
                </div>
              </Link>
              <div className="w-full lg:w-[40%]">
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
                <h3 className="text-xl sm:text-2xl md:text-6xl font-black mb-4 md:mb-8 tracking-tighter text-white group-hover:text-[var(--color-creative-blue)] transition-colors duration-500 leading-none">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-6 md:mb-12 text-xs sm:text-sm md:text-xl leading-relaxed max-w-md font-medium">
                  {project.desc}
                </p>
                <Magnetic>
                  <Link to={project.path} className="inline-flex items-center gap-4 font-bold text-white group/link text-sm md:text-base px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-[var(--color-creative-blue)]/20 hover:border-[var(--color-creative-blue)]/50 backdrop-blur-md transition-all duration-300 shadow-lg">
                    Détails du projet 
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
              Explorer d'autres projets 
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
                    Ambition
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1] uppercase text-white">
                    Mon Projet <br />
                    <span className="text-[var(--color-creative-blue)]" style={{ WebkitTextStroke: '1px white' }}>Futur.</span>
                  </h2>
                </div>
                
                {/* Right Side: Text & Actions */}
                <div className="w-full lg:w-[55%] flex flex-col justify-center gap-8 lg:border-l lg:border-white/10 lg:pl-10">
                  <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium" style={{ textTransform: 'none' }}>
                    Après l'obtention de mon BTS Communication, je souhaite poursuivre mon parcours en Licence Pro Communication. Pour accompagner ce projet, je suis à la recherche d'une <span className="text-white font-bold border-b border-[var(--color-creative-blue)]/50">alternance en Communication Digitale ou Design Graphique</span> pour la rentrée de septembre 2026.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link to="/cv" className="btn-premium-orange px-6 md:px-8 py-3.5 md:py-4 gap-3 w-full sm:w-auto justify-center group">
                      <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
                      Mon CV
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

                <h2 className="text-5xl md:text-[6rem] lg:text-[7rem] font-black mb-12 text-white tracking-tighter leading-[0.9] uppercase relative inline-block">
                  Un projet <br className="hidden md:block" /> en tête ? <br />
                  <span className="editorial-title-outline text-[var(--color-creative-blue)] mt-4 inline-block -rotate-2 transform hover:rotate-0 transition-transform duration-500">Parlons-en.</span>
                  
                  <div className="absolute -top-6 -right-6 md:-right-12 sticker-shape sticker-blue rotate-[12deg] shadow-[0_0_30px_rgba(14,165,233,0.4)] cursor-default">Hello! 👋</div>
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-4">
                  <Link to="/contact" className="btn-premium-orange px-10 md:px-12 py-4 md:py-5 w-full sm:w-auto text-sm md:text-base group shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)]">
                    Me contacter
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
