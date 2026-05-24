import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Code, Layout, Palette, Terminal, ExternalLink, Download, ArrowUpRight, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, lazy, Suspense } from 'react'
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
    desc: "Conception intégrale du site web et gestion de l'image de marque du club. Un projet alliant design moderne et performance.",
    img: "images/couvertures/futsal-drancy.png",
    path: "/projets/futsal"
  },
  {
    title: "UI/UX Works",
    category: "Design & Développement",
    desc: "Plateforme de révisions BTS Com & Projet HopePower. Une exploration de l'ergonomie et de l'interactivité.",
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

  return (
    <main className="relative overflow-hidden bg-transparent">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none -z-10">
      </div>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-start md:justify-center overflow-hidden pt-32 pb-16 md:pt-0 md:pb-0">
        
        {/* Interactive 3D Background */}
        <HeroBackground3D />
        
        {/* Hero Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/60 pointer-events-none z-0" />

        {/* Hero Text Content */}
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 section-container text-center flex flex-col items-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/80 font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase mb-8 md:mb-12 text-[10px] md:text-sm flex items-center justify-center gap-2 md:gap-3">
              <span className="w-6 md:w-10 h-px bg-white/40" />
              BTS Communication · Design Graphique
              <span className="w-6 md:w-10 h-px bg-white/40" />
            </p>
          </motion.div>

          {/* Decorative Stickers - pointer-events-none, z-0 so they never block text/clicks */}
          <motion.div 
            initial={{ scale: 0, rotate: 20 }}
            animate={{ scale: 1, rotate: -15 }}
            transition={{ delay: 1.7, type: "spring" }}
            className="absolute sticker-shape sticker-blue-dark top-8 sm:top-4 md:top-[15%] left-2 sm:left-6 md:left-12 rotate-[-15deg] z-10 scale-90 sm:scale-110 origin-top-left pointer-events-none select-none opacity-100 shadow-[4px_4px_0_0_var(--color-creative-blue)]"
          >
            Portfolio
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 10 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="absolute sticker-shape sticker-blue-dark bottom-[12%] sm:bottom-[15%] md:bottom-[20%] right-0 sm:right-6 md:right-12 rotate-[10deg] z-10 scale-90 sm:scale-110 origin-bottom-right pointer-events-none select-none opacity-100 shadow-[4px_4px_0_0_var(--color-creative-blue)]"
          >
            Creative
          </motion.div>

          {/* Main Title Group */}
          <div className="relative mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <span className="h-px w-8 bg-[var(--color-creative-blue)]" />
              <h2 className="text-xl md:text-3xl font-black tracking-tight uppercase">
                Bienvenue, je suis
              </h2>
              <span className="h-px w-8 bg-[var(--color-creative-blue)]" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h1 
                className="font-heading text-[12vw] md:text-[8.5vw] leading-[0.85] tracking-tighter font-black uppercase mx-auto text-white"
                style={{
                  textShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 50px rgba(14, 165, 233, 0.2)'
                }}
              >
                Tharsanan
              </h1>
              <div className="absolute -bottom-4 md:-bottom-8 left-1/2 -translate-x-1/2 w-full opacity-20 pointer-events-none select-none">
                <h1 className="font-heading text-[12vw] md:text-[8.5vw] leading-[0.85] tracking-tighter font-black uppercase editorial-title-outline">
                  Tharsanan
                </h1>
              </div>
            </motion.div>
          </div>



          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center"
          >
            <Magnetic>
              <Link to="/projets" className="btn-dark-blue-dark gap-3 group w-full sm:w-auto px-8">
                Découvrir mes projets
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className="btn-outline-blue-dark-black w-full sm:w-auto px-8">
                Me contacter
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-10"
        >
          <div className="hidden md:flex flex-col items-center gap-2">
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-white/60 rounded-full"
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-text-muted font-black">Scroll</span>
          </div>
          {/* Mobile Scroll Indicator */}
          <div className="md:hidden flex flex-col items-center gap-3">
            <div className="relative w-6 h-10 border-2 border-white/20 rounded-md flex justify-center p-1">
              {/* Speaker/Top part of phone */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-white/20 rounded-full" />
              
              {/* Swipe animation dot */}
              <motion.div 
                animate={{ y: [2, 18, 2], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-[var(--color-creative-blue)] rounded-full"
              />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-black">Scroll</span>
          </div>
        </motion.div>

      </section>

      {/* QUICK ABOUT / STATS SECTION - Opaque bg to hide global 3D background */}
      <section className="bg-primary text-white relative py-12 md:py-20 lg:py-32 overflow-hidden border-y-[6px] border-black z-10">
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
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
              <div className="absolute -inset-6 bg-accent/20 blur-[60px] rounded-full" />
              
              {/* Floating animation wrapper with mouse tracking */}
              <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] h-auto group mx-auto">
                  <div className="absolute inset-0 bg-[var(--color-creative-blue)] translate-x-4 translate-y-4 border-2 border-white -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
                  <LazyImage 
                    src={`${baseUrl}images/ma-photo/photo-studio-bleu-final.png`}
                    alt="Tharsanan"
                    className="w-full h-auto object-contain border-2 border-white grayscale-0 hover:grayscale transition-all duration-500 bg-[var(--color-primary)]"
                    skeletonClassName="rounded-none"
                  />
                  <div className="sticker-shape sticker-blue-dark bottom-4 -left-6 rotate-[-12deg] z-20">Design</div>
                  <div className="tape-effect -top-4 left-1/2 -translate-x-1/2"></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-center lg:text-left"
            >
              <p className="text-white font-black tracking-widest uppercase text-[11px] md:text-sm mb-4 flex items-center gap-3 justify-center lg:justify-start">
                <span className="w-8 h-1 bg-white" />
                Qui suis-je ?
              </p>

              <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter leading-tight uppercase relative inline-block text-white">
                Un parcours entre <br />
                <span className="mt-2 inline-block text-[var(--color-creative-blue)]">technique</span> et <br />
                <span className="bg-[var(--color-creative-orange)] text-white px-2 mt-2 inline-block -rotate-2 border-2 border-white shadow-[4px_4px_0_0_#fff]">communication</span>
              </h2>
              <div className="space-y-4 md:space-y-6 text-white/90 font-bold text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">

                <p>
                  Après un début en BUT Métiers du Multimédia et de l'Internet, j'ai choisi de me spécialiser en communication. 
                  Ce parcours m'a permis de développer à la fois des compétences techniques et une vision créative orientée vers le digital.
                </p>
              </div>
              <Link to="/cv" className="mt-8 md:mt-10 inline-flex items-center gap-2 font-black text-white hover:text-[var(--color-creative-blue)] transition-colors group">
                Voir mon parcours complet 
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform border-2 border-current rounded-full p-1" />
              </Link>
            </motion.div>
          </div>

          {/* Stats Row - Updated for Light Theme */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 relative">
             {/* Decorative stickers around stats */}
             <div className="sticker-shape sticker-blue absolute -top-8 left-2 rotate-[-5deg] z-20">Analytics</div>
             
             <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/5 backdrop-blur-sm border-[3px] border-white/10 shadow-[6px_6px_0_0_var(--color-creative-blue)] p-6 rounded-none text-center">
                 <span className="text-4xl md:text-5xl font-heading font-black text-white block mb-2"><Counter to={4} /></span>
                 <span className="text-xs font-bold uppercase tracking-widest text-white/60">Ans d'études</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[var(--color-creative-orange)] border-[3px] border-black shadow-[6px_6px_0_0_#000] p-6 rounded-none text-center relative top-4">
                 <span className="text-4xl md:text-5xl font-heading font-black text-white block mb-2"><Counter to={1} /></span>
                 <span className="text-xs font-bold uppercase tracking-widest text-white/80">An d'expérience</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-[var(--color-creative-blue)] border-[3px] border-black shadow-[6px_6px_0_0_#000] p-6 rounded-none text-center relative -top-2">
                 <span className="text-4xl md:text-5xl font-heading font-black text-white block mb-2"><Counter to={6} /></span>
                 <span className="text-xs font-bold uppercase tracking-widest text-white">Logiciels</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-white/5 backdrop-blur-sm border-[3px] border-white/10 shadow-[6px_6px_0_0_var(--color-creative-orange)] p-6 rounded-none text-center relative top-2">
                 <span className="text-4xl md:text-5xl font-heading font-black text-white block mb-2"><Counter to={100} suffix="%" /></span>
                 <span className="text-xs font-bold uppercase tracking-widest text-white/60">Passionné</span>
              </motion.div>
          </div>
        </div>
      </section>

      {/* INFINITE SKILLS MARQUEE */}
      <InfiniteMarquee />

      {/* FEATURED PROJECTS */}
      <section className="bg-gradient-to-b from-primary via-[#0a1e4a]/50 to-primary relative pb-32">
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

            <h2 className="font-black mb-3 md:mb-4 tracking-tighter leading-[1.1] uppercase" style={{ fontSize: 'clamp(2.2rem, 8vw, 5.5rem)' }}>
                Une sélection <br />
                <span className="text-[var(--color-creative-blue)]" style={{ WebkitTextStroke: '2px white' }}>des travaux</span> <br />
                <span className="bg-[var(--color-creative-orange)] text-white px-3 inline-block rotate-1 shadow-[4px_4px_0_0_#fff] border-2 border-white">phares</span>
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
              <Link to={project.path} className="w-full lg:w-[60%] aspect-[16/9] rounded-none overflow-hidden relative block border-2 sm:border-4 border-black shadow-[4px_4px_0_0_#000] md:shadow-[8px_8px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] md:hover:shadow-[4px_4px_0_0_#000] transition-all duration-300">
                <LazyImage 
                  src={`${baseUrl}${project.img}`} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  skeletonClassName="opacity-20"
                />
                <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 text-black font-black uppercase px-2 py-0.5 sm:px-3 sm:py-1 text-[7px] sm:text-[10px] md:text-xs border sm:border-2 border-black rotate-[-5deg] ${i === 0 ? 'bg-[var(--color-creative-blue)]' : 'bg-[var(--color-creative-orange)] text-white'}`}>
                  {project.category}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="btn-premium scale-90 md:scale-100 backdrop-blur-md bg-accent/80 border border-white/20">
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
                  <span className="w-8 h-px bg-accent-light/40" />
                  <span className="text-accent-light font-bold text-[11px] md:text-sm tracking-[0.3em] uppercase">
                    {project.category}
                  </span>

                </motion.div>
                <h3 className="text-xl sm:text-2xl md:text-6xl font-bold mb-4 md:mb-8 tracking-tighter group-hover:text-white transition-colors duration-500 leading-none">
                  {project.title}
                </h3>
                <p className="text-white/80 mb-6 md:mb-12 text-xs sm:text-sm md:text-xl leading-relaxed max-w-md font-bold">
                  {project.desc}
                </p>
                <Magnetic>
                  <Link to={project.path} className={`inline-flex items-center gap-4 font-black text-black hover:text-white transition-all group/link text-sm md:text-base px-6 py-3 border-2 border-black shadow-[4px_4px_0_0_#000] ${i === 0 ? 'bg-[var(--color-creative-blue)] text-white' : 'bg-[var(--color-creative-orange)] text-white'}`}>
                    Détails du projet 
                    <ArrowRight size={20} className="group-hover/link:translate-x-2 transition-transform" />
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
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-primary via-[#0a1e4a]/30 to-primary border-y border-white/5">
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[#0ea5e9] rounded-full blur-[160px] opacity-[0.05] -z-10" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-[var(--color-creative-blue)] font-bold tracking-[0.3em] uppercase text-[11px] md:text-sm mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[var(--color-creative-blue)]/60" />
              Ambition
              <span className="w-8 h-px bg-[var(--color-creative-blue)]/60" />
            </p>
            <h2 className="text-3xl md:text-6xl font-black mb-8 tracking-tighter leading-tight uppercase text-white">
              Mon Projet <br />
              <span className="text-[var(--color-creative-blue)]" style={{ WebkitTextStroke: '2px white' }}>Futur</span>
            </h2>
            <p className="text-white/80 text-sm md:text-lg leading-relaxed font-medium max-w-2xl mx-auto" style={{ textTransform: 'none' }}>
              Après l'obtention de mon BTS Communication, je souhaite poursuivre mon parcours en Licence Pro Communication. Pour accompagner ce projet, je suis à la recherche d'une alternance en Communication Digitale ou Design Graphique pour la rentrée de septembre 2026.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link to="/cv" className="btn-premium-orange px-8 py-4 gap-3 w-full sm:w-auto justify-center">
                <Download size={18} />
                Voir mon CV
              </Link>
              <a href="https://www.linkedin.com/in/tharsanan-arulananthaselvam/" target="_blank" rel="noreferrer" className="btn-outline px-8 py-4 gap-3 border-[var(--color-creative-blue)] hover:bg-[var(--color-creative-blue)] hover:text-white w-full sm:w-auto justify-center">
                Mon profil LinkedIn
              </a>
              <Link to="/contact" className="btn-premium px-8 py-4 gap-3 bg-gradient-to-br from-[var(--color-creative-blue)] to-blue-700 text-white border-none shadow-lg w-full sm:w-auto justify-center group">
                Me contacter
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PASSION SECTION */}
      <PassionSection />

      {/* CTA SECTION */}
      <section className="bg-gradient-to-b from-primary via-[#0a1e4a]/20 to-primary py-20 md:py-32 lg:py-48 relative">
        <div className="section-container text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-accent-light font-bold tracking-[0.3em] uppercase text-[11px] md:text-sm mb-8">Contact</p>

            <h2 className="text-4xl md:text-8xl font-black mb-8 md:mb-12 text-white tracking-tighter leading-[1] uppercase relative">
              Un projet en tête ? <br />
              <span className="editorial-title-outline text-[var(--color-creative-orange)] mt-2 inline-block -rotate-2">Parlons-en.</span>
              <div className="absolute -top-12 right-0 md:right-10 sticker-shape sticker-blue rotate-[10deg]">Hello!</div>
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
              <Link to="/contact" className="btn-premium-orange px-12 py-6 w-full sm:w-auto text-lg">
                Me contacter
              </Link>
              <a href="mailto:tharsananarul@gmail.com" className="text-text-muted font-bold hover:text-white transition-colors text-base md:text-xl flex items-center gap-2 group">
                tharsananarul@gmail.com
                <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
