import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, GraduationCap, Briefcase, MapPin, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Magnetic from '../components/Magnetic'
import PageHero from '../components/PageHero'
import LazyImage from '../components/ui/LazyImage'
import useSEO from '../hooks/useSEO'

export default function CV() {
  const { t } = useTranslation()
  useSEO('seo.cv.title', 'seo.cv.desc')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const baseUrl = import.meta.env.BASE_URL

  const education = [
    {
      period: "2026 — 2027",
      title: t("cv_page.education.upec.title"),
      location: t("cv_page.education.upec.location"),
      desc: t("cv_page.education.upec.desc"),
      logo: `${baseUrl}images/logos/upec.svg`
    },
    {
      period: "2025 — 2026",
      title: t("cv_page.education.brel.title"),
      location: t("cv_page.education.brel.location"),
      desc: t("cv_page.education.brel.desc"),
      logo: `${baseUrl}images/logos/jacques-brel.jpg`
    },
    {
      period: "2022 — 2024",
      title: t("cv_page.education.mmi.title"),
      location: t("cv_page.education.mmi.location"),
      desc: t("cv_page.education.mmi.desc"),
      logo: `${baseUrl}images/logos/iut-senart.webp`
    },
    {
      period: "2019 — 2022",
      title: t("cv_page.education.sti2d.title"),
      location: t("cv_page.education.sti2d.location"),
      desc: t("cv_page.education.sti2d.desc"),
      logo: `${baseUrl}images/logos/paul-le-rolland.png`
    }
  ]

  const experiences = [
    {
      period: "Sept. 2024 — Présent",
      title: t("cv_page.experiences.futsal.title"),
      company: t("cv_page.experiences.futsal.company"),
      location: "Drancy",
      type: t("cv_page.experiences.futsal.type"),
      missions: t("cv_page.experiences.futsal.missions", { returnObjects: true }) || [],
      logo: `${baseUrl}images/logos/drancy-futsal.png`
    },
    {
      period: "Août 2024 — Janvier 2026",
      title: t("cv_page.experiences.banque.title"),
      company: t("cv_page.experiences.banque.company"),
      location: "Le Blanc-Mesnil",
      type: t("cv_page.experiences.banque.type"),
      missions: t("cv_page.experiences.banque.missions", { returnObjects: true }) || [],
      logo: `${baseUrl}images/logos/banque-postale.webp`
    },
    {
      period: "Mars 2023 — Présent",
      title: t("cv_page.experiences.osi.title"),
      company: t("cv_page.experiences.osi.company"),
      location: t("lng") === 'en' ? "Paris & Geneva" : "Paris & Genève",
      type: t("cv_page.experiences.osi.type"),
      missions: t("cv_page.experiences.osi.missions", { returnObjects: true }) || [],
      logo: `${baseUrl}images/logos/osi.png`
    },
    {
      period: "Sept. 2023 — Présent",
      title: t("cv_page.experiences.parkours.title"),
      company: t("cv_page.experiences.parkours.company"),
      location: "Paris",
      type: t("cv_page.experiences.parkours.type"),
      missions: t("cv_page.experiences.parkours.missions", { returnObjects: true }) || [],
      logo: `${baseUrl}images/logos/parkours.png`
    }
  ]

  return (
    <main className="relative bg-transparent min-h-screen pb-32">
      <PageHero
        tag={t("cv_page.tag")}
        title={<><span className="text-[1.1em] md:text-[1.3em]">{t("cv_page.title_start")}</span> <span className="text-[var(--color-creative-blue)] uppercase font-black" style={{ WebkitTextStroke: '1px white' }}>{t("cv_page.title_end")}</span></>}
        subtitle={t("cv_page.subtitle")}
        compact={true}
        themeColor="blue"
      />



      {/* Background patterns & Creative Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        
        {/* Large creative blobs - Hidden on mobile to save GPU performance */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="hidden md:block absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--color-creative-blue)]/10 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 100, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="hidden md:block absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-[var(--color-creative-blue)]/10 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            rotate: 360
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="hidden md:block absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-[var(--color-creative-blue)]/5 blur-[150px] rounded-full"
        />

        {/* Decorative floating icons removed as requested */}
      </div>

      {/* Main Content Section */}
      <section className="section-container relative z-10 pt-4 md:pt-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24">
          {/* EDUCATION */}
          <div className="space-y-16">
            {/* EDUCATION HEADER */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-16"
            >
              <div className="relative group shrink-0">
                <div className="absolute -inset-2 bg-[var(--color-creative-blue)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center">
                  <GraduationCap style={{ color: 'var(--color-creative-blue)' }} size={28} className="shrink-0" />
                </div>
              </div>
              <h2 className="font-extrabold tracking-normal uppercase leading-none" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)' }}>
                <span className="text-white block mb-1" style={{ fontSize: '1em' }}>{t("cv_page.education_start", "Ma")}</span>
                <span className="relative inline-block px-4 py-1">
                  <span className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-sm -rotate-1 rounded-lg" />
                  <span className="relative text-[var(--color-creative-blue)]">{t("cv_page.education_title")}</span>
                </span>
              </h2>
            </motion.div>

            <div className="space-y-6 md:space-y-8 relative">
              {education.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-5 md:p-6 group glow-card w-full min-w-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-creative-blue)] block">{item.period}</span>
                      {item.logo && (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/95 p-2 flex items-center justify-center shrink-0 shadow-md border border-white/20 group-hover:scale-105 transition-transform duration-300">
                          <img src={item.logo} alt={item.title} className="max-w-full max-h-full object-contain" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base md:text-[1.15rem] font-extrabold mb-2 uppercase tracking-normal text-white leading-tight break-words">{item.title}</h3>
                    <div className="flex items-center gap-2 text-white/50 text-[10px] md:text-sm mb-3 font-bold">
                      <MapPin size={14} /> {item.location}
                    </div>
                    <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-xl font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Realistic 3D Flyer Preview & Download button */}
              <div className="mt-16 relative flex justify-center md:justify-start perspective-[1500px]">
                <motion.div
                  initial={{ opacity: 0, rotateX: isMobile ? 0 : 45, rotateZ: isMobile ? 0 : -10, y: 100, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotateX: isMobile ? 0 : 25, rotateZ: isMobile ? 0 : -12, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 40,
                    damping: 15,
                    delay: 0.2
                  }}
                  className="relative group flex flex-col items-center md:items-start gap-6 cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Intense Outer Glow — Blue/Cyan */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[var(--color-creative-blue)] blur-[100px] opacity-20 group-hover:opacity-50 transition-all duration-700 -z-20 rounded-[2rem]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#06b6d4] blur-[80px] opacity-10 group-hover:opacity-40 transition-all duration-700 -z-20 rounded-[2rem]" />

                  {/* Elegant Glass Backing - perfectly sized to the flyer */}
                  <div className="absolute -inset-4 sm:-inset-8 -z-10 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] transform-gpu">
                    {/* Decorative corner marks */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20" />
                    
                    {/* Subtle internal glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-creative-blue)]/20 to-[#06b6d4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                  </div>

                  {/* Main CV Flyer Link */}
                  <a href={`${import.meta.env.BASE_URL}documents/cv-tharsanan-final.pdf`} target="_blank" rel="noreferrer" className="block relative">
                    {/* Shadow under the flyer */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[110%] h-12 bg-black/50 blur-3xl rounded-[100%] scale-x-110 opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
                    
                    {/* The Flyer itself */}
                    <div className="relative w-48 sm:w-64 md:w-80 rounded-sm overflow-hidden border-[6px] border-white shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-4">
                      <LazyImage 
                        src={`${import.meta.env.BASE_URL}images/cv/cv-tharsanan-final.webp`} 
                        alt="CV Tharsanan Preview" 
                        className="w-full h-auto"
                      />
                    </div>

                    <div className="absolute -top-10 -right-10 rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110 z-30">
                      <div className="relative px-4 py-2 bg-white rounded-lg shadow-2xl border border-white/40">
                        <span className="relative text-[#060a18] font-black uppercase text-[10px] tracking-widest whitespace-nowrap">
                          {t("cv_page.view_badge")}
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Download button tilted in 3D along with the flyer on PC */}
                  <div className="z-30 pt-2">
                    <Magnetic>
                      <a href={`${import.meta.env.BASE_URL}documents/cv-tharsanan-final.pdf`} download className="btn-premium-orange gap-3 group shadow-2xl">
                        <Download size={22} className="group-hover:translate-y-1 transition-transform" /> 
                        {t("cv_page.download")}
                      </a>
                    </Magnetic>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="relative w-full min-w-0">
            <div className="w-full mx-auto relative z-10">
              {/* EXPERIENCE HEADER */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 mb-16"
              >
                <div className="relative group shrink-0">
                  <div className="absolute -inset-2 bg-[var(--color-creative-blue)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center">
                    <Briefcase style={{ color: 'var(--color-creative-blue)' }} size={28} className="shrink-0" />
                  </div>
                </div>
                <h2 className="font-extrabold tracking-normal uppercase leading-none" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)' }}>
                  <span className="text-white block mb-1" style={{ fontSize: '1em' }}>{t("cv_page.experience_start", "Mon")}</span>
                  <span className="relative inline-block px-4 py-1">
                    <span className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-sm rotate-1 rounded-lg" />
                    <span className="relative text-[var(--color-creative-blue)]">{t("cv_page.experience_title")}</span>
                  </span>
                </h2>
              </motion.div>

              <div className="space-y-8 md:space-y-12 relative">
                {experiences.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-card p-5 md:p-6 group glow-card w-full min-w-0"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-creative-blue)] block">{item.period}</span>
                      {item.logo && (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/95 p-2 flex items-center justify-center shrink-0 shadow-md border border-white/20 group-hover:scale-105 transition-transform duration-300">
                          <img src={item.logo} alt={item.company} className="max-w-full max-h-full object-contain" />
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-sm sm:text-base md:text-[1.15rem] font-extrabold mb-3 uppercase tracking-normal text-white leading-tight break-words">{item.title}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-3">
                        <span className="text-lg md:text-xl font-black text-white/90">{item.company}</span>
                        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase text-[var(--color-creative-blue)] tracking-wider backdrop-blur-md">
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-[10px] md:text-sm mt-4 font-bold">
                        <MapPin size={14} /> {item.location}
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {item.missions.map((mission, idx) => (
                        <li key={idx} className="text-white/70 text-xs md:text-base flex items-start gap-3 font-medium leading-relaxed break-words">
                          <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-creative-blue)] shrink-0 shadow-[0_0_10px_var(--color-creative-blue)]" />
                          {mission}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-20 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-secondary/50 border border-white/5 text-center relative overflow-hidden group shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-accent-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-base sm:text-lg md:text-3xl font-bold mb-6 md:mb-10 italic tracking-tight leading-snug md:leading-tight">
              {t("cv_page.quote")}
            </h2>

            <p className="text-text-muted text-[10px] sm:text-xs md:text-lg mb-8 md:mb-12 leading-relaxed font-medium">
              {t("cv_page.quote_sub")}
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                { name: t("cv_page.skills.autonomy"), color: "text-[var(--color-creative-blue)]" },
                { name: t("cv_page.skills.teamwork"), color: "text-[var(--color-creative-blue)]" },
                { name: t("cv_page.skills.adaptability"), color: "text-[var(--color-creative-blue)]" },
                { name: t("cv_page.skills.rigor"), color: "text-[var(--color-creative-blue)]" },
                { name: t("cv_page.skills.creativity"), color: "text-[var(--color-creative-blue)]" }
              ].map(skill => (
                <Magnetic key={skill.name}>
                  <div className={`px-5 py-2.5 md:px-8 md:py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] ${skill.color} hover:bg-white/10 hover:border-white/20 transition-all cursor-default`}>
                    {skill.name}
                  </div>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
