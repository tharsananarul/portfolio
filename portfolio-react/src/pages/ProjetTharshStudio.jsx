import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Download, Palette, Instagram, Brush, Layers, Eye, Volume2, VolumeX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import MosaicGrid from '../components/MosaicGrid'
import InteractiveString from '../components/ui/InteractiveString'
import useSEO from '../hooks/useSEO'

export default function ProjetTharshStudio() {
  const { t } = useTranslation()
  useSEO('seo.tharsh_studio.title', 'seo.tharsh_studio.desc')
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])
  const baseUrl = import.meta.env.BASE_URL
  
  // States for interactive logo switcher
  const [logoTheme, setLogoTheme] = useState('blue') // 'blue', 'dark', 'light'
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)

  // Sections for graphic charter gallery
  const sections = [
    {
      title: t('project_details.tharsh_studio.gallery_tags.charter_title'),
      tag: t('project_details.tharsh_studio.gallery_tags.charter'),
      items: [
        { src: `${baseUrl}images/charte-graphique-images/01- Cover charte graphique.webp`, alt: 'Couverture de la charte graphique', wide: true },
        { src: `${baseUrl}images/charte-graphique-images/02 - Logotype.webp`, alt: 'Logotype - Construction et grille' },
        { src: `${baseUrl}images/charte-graphique-images/03 - Color variation.webp`, alt: 'Déclinaisons chromatiques du logo' },
        { src: `${baseUrl}images/charte-graphique-images/04 - Colors.webp`, alt: 'Palette de couleurs de la marque' },
        { src: `${baseUrl}images/charte-graphique-images/05 - Typographie for headings.webp`, alt: 'Typographies pour les titres' },
        { src: `${baseUrl}images/charte-graphique-images/06 - Typography Text.webp`, alt: 'Typographies pour le corps de texte' },
        { src: `${baseUrl}images/charte-graphique-images/07 - Textured backgrounds.webp`, alt: 'Fonds textures et motifs', wide: true },
        { src: `${baseUrl}images/charte-graphique-images/08 - Moodboard.webp`, alt: 'Moodboard d\'inspiration artistique' },
        { src: `${baseUrl}images/charte-graphique-images/09 - Déclinaisons.webp`, alt: 'Déclinaisons graphiques et mockups' },
      ]
    },
    {
      title: t('project_details.tharsh_studio.gallery_tags.mockups_title'),
      tag: t('project_details.tharsh_studio.gallery_tags.mockups'),
      items: [
        { src: `${baseUrl}images/tharsh studio mokcup/1.webp`, alt: 'Mockup Tharsh Studio 1' },
        { src: `${baseUrl}images/tharsh studio mokcup/2.webp`, alt: 'Mockup Tharsh Studio 2' },
        { src: `${baseUrl}images/tharsh studio mokcup/3.webp`, alt: 'Mockup Tharsh Studio 3' },
        { src: `${baseUrl}images/tharsh studio mokcup/4.webp`, alt: 'Mockup Tharsh Studio 4' },
        { src: `${baseUrl}images/tharsh studio mokcup/5.webp`, alt: 'Mockup Tharsh Studio 5' },
        { src: `${baseUrl}images/tharsh studio mokcup/6.webp`, alt: 'Mockup Tharsh Studio 6' },
        { src: `${baseUrl}images/tharsh studio mokcup/7.webp`, alt: 'Mockup Tharsh Studio 7' },
        { src: `${baseUrl}images/tharsh studio mokcup/8.webp`, alt: 'Mockup Tharsh Studio 8' },
      ]
    }
  ]

  // Logo mapping according to active tab
  const getLogoImage = () => {
    switch (logoTheme) {
      case 'dark':
        return {
          src: `${baseUrl}images/logo-tharsh-studio/Logo Tharsh Studio-02 bg.webp`,
          bgClass: 'bg-black border-white/10 text-white',
          label: t('project_details.tharsh_studio.labels.dark')
        }
      case 'light':
        return {
          src: `${baseUrl}images/logo-tharsh-studio/Logo Tharsh Studio bg-01.webp`,
          bgClass: 'bg-white border-black/10 text-black',
          label: t('project_details.tharsh_studio.labels.light')
        }
      case 'blue':
      default:
        return {
          src: `${baseUrl}images/logo-tharsh-studio/Logo Tharsh Studio-03 bg .webp`,
          bgClass: 'bg-sky-950/40 backdrop-blur-md border-sky-500/20 text-white',
          label: t('project_details.tharsh_studio.labels.signature')
        }
    }
  }

  const currentLogo = getLogoImage()

  return (
    <main className="relative bg-transparent min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[65vh] overflow-hidden" ref={containerRef}>
        <motion.img 
          src={`${baseUrl}images/couvertures/tharsh-studio.webp`} 
          alt="Tharsh Studio" 
          className="w-full h-full object-cover"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/35 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end section-container pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest">
              {t("project_details.tharsh_studio.badge")}
            </div>
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white tracking-tighter leading-[1.1] font-heading uppercase">
              Tharsh&nbsp;<span className="text-[var(--color-creative-blue)] italic ml-1.5">Studio.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Project Meta */}
      <section className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/5 relative z-10">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400/60">{t("project_details.labels.role")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.tharsh_studio.role")}</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400/60">{t("project_details.labels.launch")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.tharsh_studio.launch")}</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400/60">{t("project_details.labels.tools")}</span>
          <p className="font-bold text-sm md:text-base">Illustrator, Photoshop, Figma</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400/60">{t("project_details.labels.destination")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.tharsh_studio.destination")}</p>
        </div>
      </section>

      {/* Concept Intro */}
      <section className="section-container py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[clamp(1.8rem,4.5vw,3rem)] font-black mb-8 tracking-tight leading-[1.1] text-white">
              {t("project_details.tharsh_studio.concept_title")}
            </h2>
            <div className="space-y-6 text-slate-200 text-lg leading-relaxed">
              <p>
                {t("project_details.tharsh_studio.para1")}
              </p>
              <p>
                {t("project_details.tharsh_studio.para2")}
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="https://www.instagram.com/tharsh.studio/" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-[var(--color-creative-blue)]/20 hover:border-[var(--color-creative-blue)]/50 transition-all group"
              >
                <Instagram size={18} className="text-sky-400 group-hover:scale-110 transition-transform" />
                @tharsh.studio
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-6"
          >
            <div className="p-8 rounded-3xl bg-secondary/40 border border-white/5 hover:border-[var(--color-creative-blue)]/30 transition-all glass-card">
              <Brush className="text-[var(--color-creative-blue)] mb-5" size={28} />
              <h3 className="text-xl font-bold mb-3 text-white">{t("project_details.tharsh_studio.card1_title")}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t("project_details.tharsh_studio.card1_desc")}
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-secondary/40 border border-white/5 hover:border-[var(--color-creative-blue)]/30 transition-all glass-card">
              <Layers className="text-[var(--color-creative-blue)] mb-5" size={28} />
              <h3 className="text-xl font-bold mb-3 text-white">{t("project_details.tharsh_studio.card2_title")}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t("project_details.tharsh_studio.card2_desc")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Logo Switcher Showcase */}
      <section className="section-container py-16 relative z-10 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[var(--color-creative-blue)] font-bold text-xs uppercase tracking-widest mb-3">{t("project_details.tharsh_studio.chromatic")}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">{t("project_details.tharsh_studio.variations")}</h2>
          <p className="text-slate-400 mt-4 text-sm md:text-base">
            {t("project_details.tharsh_studio.variations_desc")}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          {/* Tabs */}
          <div className="flex p-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setLogoTheme('blue')}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${logoTheme === 'blue' ? 'bg-[var(--color-creative-blue)] text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              {t("project_details.tharsh_studio.tabs.signature")}
            </button>
            <button 
              onClick={() => setLogoTheme('dark')}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${logoTheme === 'dark' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              {t("project_details.tharsh_studio.tabs.dark")}
            </button>
            <button 
              onClick={() => setLogoTheme('light')}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${logoTheme === 'light' ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              {t("project_details.tharsh_studio.tabs.light")}
            </button>
          </div>

          {/* Logo Card Frame */}
          <motion.div 
            key={logoTheme}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full max-w-2xl aspect-[16/9] flex items-center justify-center p-8 md:p-12 rounded-3xl border transition-all duration-500 shadow-2xl relative group ${currentLogo.bgClass}`}
          >
            <img 
              src={currentLogo.src} 
              alt={`Logo Tharsh Studio - ${logoTheme}`}
              className="max-h-[70%] object-contain select-none transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute bottom-4 left-6 flex items-center gap-2 text-[9px] uppercase tracking-widest font-black opacity-60">
              <Eye size={12} />
              {currentLogo.label}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Animation Section */}
      <section className="section-container py-20 relative z-10 border-t border-white/5">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text content - spans 7 cols on lg */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest animate-pulse">
              {t("project_details.tharsh_studio.animation_tag")}
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-tight leading-[1.1] text-white uppercase">
              {t("project_details.tharsh_studio.animation_title")}
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
              {t("project_details.tharsh_studio.animation_desc")}
            </p>
            
            {/* Motion specs grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3.5 items-start p-4.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--color-creative-blue)]/20 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-creative-blue)]/10 flex items-center justify-center text-[var(--color-creative-blue)] shrink-0">
                  <Instagram size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t("project_details.tharsh_studio.animation_spec_vertical_title")}</h4>
                  <p className="text-slate-350 text-xs mt-1 leading-relaxed">{t("project_details.tharsh_studio.animation_spec_vertical_desc")}</p>
                </div>
              </div>
              
              <div className="flex gap-3.5 items-start p-4.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--color-creative-blue)]/20 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-creative-blue)]/10 flex items-center justify-center text-[var(--color-creative-blue)] shrink-0">
                  <Layers size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t("project_details.tharsh_studio.animation_spec_objects_title")}</h4>
                  <p className="text-slate-350 text-xs mt-1 leading-relaxed">{t("project_details.tharsh_studio.animation_spec_objects_desc")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Mockup - spans 5 cols on lg */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            {/* 3D Perspective container */}
            <div className="relative cursor-pointer group py-8 [perspective:1000px] flex items-center justify-center">
              
              {/* Floating 3D shadow behind the device with ambient sky blue glow */}
              <div 
                className="absolute -inset-4 bg-black/60 blur-2xl rounded-[3rem] transition-all duration-700 ease-[0.16,1,0.3,1] opacity-75 z-0 pointer-events-none"
                style={{
                  transform: 'rotateX(8deg) rotateY(-15deg) rotateZ(3deg) translateZ(-40px) translate(-10px, 15px)',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(56, 189, 248, 0.06)',
                }}
              />

              {/* iPhone 15 Pro 3D Mockup Frame (Premium Sky Blue Titanium with soft glow) */}
              <div 
                className="relative w-[180px] h-[310px] sm:w-[220px] sm:h-[379px] md:w-[270px] md:h-[468px] p-[2px] md:p-[2.5px] bg-gradient-to-b from-[#88caf0] via-[#3b7da3] to-[#0d1b2a] rounded-[2rem] sm:rounded-[2.4rem] md:rounded-[2.6rem] transition-transform duration-700 ease-[0.16,1,0.3,1] will-change-transform z-10"
                style={{ 
                  transform: 'rotateX(8deg) rotateY(-15deg) rotateZ(3deg)',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.15), 0 4px 12px rgba(0, 0, 0, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotateX(3deg) rotateY(-7deg) rotateZ(1deg) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(56, 189, 248, 0.35), 0 10px 25px rgba(0, 0, 0, 0.6)';
                  const shadow = e.currentTarget.previousElementSibling;
                  if (shadow) {
                    shadow.style.transform = 'rotateX(3deg) rotateY(-7deg) rotateZ(1deg) translateZ(-50px) translate(-15px, 20px)';
                    shadow.style.boxShadow = '0 30px 70px rgba(0,0,0,0.9), 0 0 60px rgba(56, 189, 248, 0.18)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotateX(8deg) rotateY(-15deg) rotateZ(3deg)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.15), 0 4px 12px rgba(0, 0, 0, 0.4)';
                  const shadow = e.currentTarget.previousElementSibling;
                  if (shadow) {
                    shadow.style.transform = 'rotateX(8deg) rotateY(-15deg) rotateZ(3deg) translateZ(-40px) translate(-10px, 15px)';
                    shadow.style.boxShadow = '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(56, 189, 248, 0.06)';
                  }
                }}
              >
                {/* Speaker Ear Piece Grill */}
                <div 
                  className="absolute top-[2px] md:top-[3px] left-1/2 -translate-x-1/2 w-8 md:w-12 h-[1.5px] md:h-[2.5px] bg-[#04101e] rounded-full z-30" 
                  style={{ transform: 'translateZ(12px)' }}
                />

                {/* Screen Bezel (Outer margin of the glass) */}
                <div 
                  className="absolute inset-[2px] md:inset-[3px] bg-[#02070e] rounded-[1.85rem] sm:rounded-[2.25rem] md:rounded-[2.45rem]"
                  style={{ transform: 'translateZ(8px)', transformStyle: 'preserve-3d' }}
                >
                  {/* Active Screen Area (Ensures video fits absolutely 100% inside) */}
                  <div 
                    className="absolute inset-[3px] md:inset-[5px] rounded-[1.55rem] sm:rounded-[1.85rem] md:rounded-[2.05rem] overflow-hidden bg-black shadow-[inset_0_0_8px_rgba(0,0,0,0.95)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <video
                      ref={videoRef}
                      src={`${baseUrl}videos/animation-logo.mp4`}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: 'cover' }}
                    />
                    
                    {/* Glass diagonal reflection sheen overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-20" />
                    
                    {/* Glossy reflection sheen sliding on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none z-20" />
                    
                    {/* Hover overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                    
                    {/* Dynamic Island (Pill Shape cutout inside screen) */}
                    <div 
                      className="absolute top-2.5 md:top-3.5 left-1/2 -translate-x-1/2 w-[52px] sm:w-[60px] md:w-[70px] h-3.5 md:h-5 rounded-full bg-black z-30 flex items-center justify-end pr-1.5 md:pr-2.5 shadow-inner"
                      style={{ transform: 'translateZ(15px)' }}
                    >
                      {/* Camera reflection dot */}
                      <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#0d162d] border border-[#1a2d59]/50 shadow-inner" />
                    </div>

                    {/* Floating Volume control */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid triggering hover interactions
                        setIsMuted(!isMuted);
                      }}
                      className="absolute bottom-3 right-3 md:bottom-4 md:right-4 p-2 md:p-2.5 rounded-full bg-black/60 hover:bg-[var(--color-creative-blue)] text-white border border-white/10 backdrop-blur-md transition-all duration-300 shadow-lg z-30"
                      aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
                    >
                      {isMuted ? <VolumeX size={12} className="md:w-4 md:h-4" /> : <Volume2 size={12} className="md:w-4 md:h-4" />}
                    </button>
                  </div>
                </div>
                
                {/* Hardware buttons details - positioned in 3D (matching Sky Blue Titanium) */}
                {/* Silent switch (Left) */}
                <div 
                  className="absolute left-[-2px] md:left-[-2.5px] top-[45px] sm:top-[55px] md:top-[60px] w-[2px] md:w-[2.5px] h-[9px] md:h-[12px] bg-[#3b7da3] rounded-l-[1px]" 
                  style={{ transform: 'translateZ(5px)' }}
                />
                {/* Volume Up (Left) */}
                <div 
                  className="absolute left-[-2px] md:left-[-2.5px] top-[63px] sm:top-[77px] md:top-[85px] w-[2px] md:w-[2.5px] h-[15px] md:h-[20px] bg-[#3b7da3] rounded-l-[1px]"
                  style={{ transform: 'translateZ(5px)' }}
                />
                {/* Volume Down (Left) */}
                <div 
                  className="absolute left-[-2px] md:left-[-2.5px] top-[85px] sm:top-[103px] md:top-[115px] w-[2px] md:w-[2.5px] h-[15px] md:h-[20px] bg-[#3b7da3] rounded-l-[1px]"
                  style={{ transform: 'translateZ(5px)' }}
                />
                {/* Power button (Right) */}
                <div 
                  className="absolute right-[-2px] md:right-[-2.5px] top-[75px] sm:top-[90px] md:top-[100px] w-[2px] md:w-[2.5px] h-[26px] md:h-[35px] bg-[#3b7da3] rounded-r-[1px]"
                  style={{ transform: 'translateZ(5px)' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Graphic Charter Showcase */}
      <section className="border-t border-white/5 py-20 relative z-10">
        <div className="section-container max-w-4xl mx-auto flex flex-col gap-8 md:gap-12 items-center">
          <div className="text-center mb-6">
            <p className="text-[var(--color-creative-blue)] font-bold text-xs uppercase tracking-widest mb-3">{t("project_details.tharsh_studio.charter_tag")}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">{t("project_details.tharsh_studio.charter_title")}</h2>
            <p className="text-slate-400 mt-2 text-sm md:text-base">
              {t("project_details.tharsh_studio.charter_desc")}
            </p>
          </div>
          
          <div className="flex flex-col gap-8 w-full items-center">
            {sections[0].items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_15px_40px_rgba(0,0,0,0.5)] group relative"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
                <div className="absolute bottom-4 right-6 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/70">
                  {idx + 1} / {sections[0].items.length}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mockups Showcase */}
      <section className="border-t border-white/5 py-12 relative z-10 bg-black/5">
        <MosaicGrid sections={[sections[1]]} accentColor="var(--color-creative-blue)" aspectRatio="aspect-[3/2]" />
      </section>

      {/* Download Section */}
      <section className="section-container py-24 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[2.5rem] p-8 md:p-14 bg-gradient-to-br from-[#0c1225]/85 to-black/60 border border-sky-500/20 shadow-[0_0_60px_rgba(14,165,233,0.1)] overflow-hidden text-center flex flex-col items-center">
            {/* Background glowing blob */}
            <div className="absolute w-[250px] h-[250px] rounded-full bg-[var(--color-creative-blue)] blur-[120px] opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <Palette className="text-[var(--color-creative-blue)] mb-6 animate-pulse" size={40} />
            
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight uppercase mb-4 leading-tight">
              {t("project_details.tharsh_studio.download_title")}
            </h2>
            
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
              {t("project_details.tharsh_studio.download_desc")}
            </p>
            
            <a 
              href={`${baseUrl}documents/charte-graphique-pdf/Charte graphique Complet.pdf`} 
              download="Charte graphique Complet.pdf"
              className="btn-premium px-10 py-5 gap-3 group text-xs md:text-sm uppercase tracking-wider font-black hover:shadow-[var(--color-creative-blue)]/30 transition-all duration-300"
            >
              <Download size={18} className="group-hover:translate-y-[2px] transition-transform" />
              {t("project_details.tharsh_studio.download_btn")}
            </a>
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <div className="section-container pb-6 pt-20 opacity-30 relative z-10">
        <InteractiveString hoverColor="#0ea5e9" />
      </div>
      <section className="section-container pb-24 pt-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">{t("project_details.next")}</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase">Futsal Drancy</h2>
          </div>
          <Link to="/projets/futsal" className="btn-premium gap-3 text-sm px-10 py-4.5">
            {t("project_details.explore")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
