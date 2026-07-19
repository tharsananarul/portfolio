import { motion } from 'framer-motion'
import { Wrench, Shield, Zap, Globe, Layout, Palette, Code2, Globe2, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Magnetic from '../components/Magnetic'
import PageHero from '../components/PageHero'
import CanvasAnimation from '../components/ui/CanvasAnimation'
import useSEO from '../hooks/useSEO'

export default function Competences() {
  const { t } = useTranslation()
  useSEO('seo.skills.title', 'seo.skills.desc')
  const baseUrl = import.meta.env.BASE_URL
  
  const skills = [
    { title: t("skills_page.categories.graphic.title"), icon: <Palette size={24} />, desc: t("skills_page.categories.graphic.desc"), animationId: "crystalline-refraction" },
    { title: t("skills_page.categories.web.title"), icon: <Code2 size={24} />, desc: t("skills_page.categories.web.desc"), animationId: "helix-scanner" },
    { title: t("skills_page.categories.comm.title"), icon: <Globe size={24} />, desc: t("skills_page.categories.comm.desc"), animationId: "sonar-sweep" },
    { title: t("skills_page.categories.uiux.title"), icon: <Layout size={24} />, desc: t("skills_page.categories.uiux.desc"), animationId: "sphere-scan" },
    { title: t("skills_page.categories.motion.title"), icon: <Zap size={24} />, desc: t("skills_page.categories.motion.desc"), animationId: "interconnecting-waves" },
    { title: t("skills_page.categories.tools.title"), icon: <Wrench size={24} />, desc: t("skills_page.categories.tools.desc"), animationId: "voxel-matrix-morph" },
  ]
  
  const languages = [
    { name: t("skills_page.languages.fr.name"), level: 100, info: t("skills_page.languages.fr.info"), flag: "https://flagcdn.com/w320/fr.png" },
    { name: t("skills_page.languages.en.name"), level: 85, info: t("skills_page.languages.en.info"), flag: "https://flagcdn.com/w320/gb.png" },
    { name: t("skills_page.languages.tamil.name"), level: 100, info: t("skills_page.languages.tamil.info"), flag: `${baseUrl}images/te-flag/tamil-eelam.webp` },
    { name: t("skills_page.languages.de.name"), level: 25, info: t("skills_page.languages.de.info"), flag: "https://flagcdn.com/w320/de.png" },
  ]

  const software = [
    { name: "Photoshop", level: 75, abbr: "Ps", color: "#31A8FF", desc: t("skills_page.software.ps") },
    { name: "After Effects", level: 50, abbr: "Ae", color: "#CF96FD", desc: t("skills_page.software.ae") },
    { name: "Premiere Pro", level: 60, abbr: "Pr", color: "#EA77FF", desc: t("skills_page.software.pr") },
    { name: "Illustrator", level: 70, abbr: "Ai", color: "#FF9A00", desc: t("skills_page.software.ai") },
    { name: "InDesign", level: 60, abbr: "Id", color: "#FF3366", desc: t("skills_page.software.id") },
    { name: "Canva", level: 100, abbr: "Cv", color: "#00C4CC", desc: t("skills_page.software.cv") },
    { name: "WordPress", level: 75, abbr: "Wp", color: "#21759B", desc: t("skills_page.software.wp") },
    { name: "HTML & CSS", level: 70, abbr: "</>", color: "#E34F26", desc: t("skills_page.software.html_css") },
  ]

  return (
    <main className="relative pb-20 bg-transparent min-h-screen">
      <PageHero
        tag={t("skills_page.tag")}
        title={<>{t("skills_page.title_start")} <span className="text-[var(--color-creative-blue)] uppercase font-black" style={{ WebkitTextStroke: '1px white' }}>{t("skills_page.title_end")}</span></>}
        subtitle={t("skills_page.subtitle")}
        compact={true}
        themeColor="cyan"
      />

      <section className="section-container relative z-10 -mt-4 md:-mt-8">
        {/* Core Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-24 relative">
          {/* Stickers */}
          <div className="absolute -top-12 -left-4 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg text-white font-black text-[10px] tracking-widest uppercase rotate-[-10deg] z-20 hidden lg:block">{t("skills_page.stickers.creative")}</div>
          <div className="absolute -bottom-12 -right-4 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg text-white font-black text-[10px] tracking-widest uppercase rotate-[15deg] z-20 hidden lg:block">{t("skills_page.stickers.technical")}</div>

          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card !overflow-visible p-6 md:p-10 group glow-card cursor-pointer"
            >
              {/* canvas animation background */}
              <div className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl overflow-hidden pointer-events-none z-0">
                <CanvasAnimation animationId={skill.animationId} />
              </div>

              {/* subtle gradient on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl z-0">
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              {/* white corner squares on hover */}
              <div className="pointer-events-none absolute inset-0 hidden group-hover:block z-30">
                <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-white border border-black shadow-sm" />
                <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-white border border-black shadow-sm" />
                <div className="absolute -left-1.5 -bottom-1.5 h-3 w-3 bg-white border border-black shadow-sm" />
                <div className="absolute -right-1.5 -bottom-1.5 h-3 w-3 bg-white border border-black shadow-sm" />
              </div>

              <div className="relative z-10">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-10 transition-all duration-500 transform group-hover:scale-110 shadow-lg ${
                  i % 3 === 0 ? 'bg-gradient-to-br from-[var(--color-creative-blue)] to-blue-600' : 
                  i % 3 === 1 ? 'bg-gradient-to-br from-[var(--color-creative-blue)] to-[#008BBF]' : 
                  'bg-gradient-to-br from-blue-400 to-[var(--color-creative-blue)]'
                } text-white`}>
                  {skill.icon}
                </div>
                <h3 className="text-sm sm:text-base md:text-[1.15rem] font-extrabold mb-3 md:mb-5 uppercase tracking-normal text-white leading-tight">{skill.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-base font-medium">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Software Section */}
        <div className="mb-12 md:mb-24">
          <h2 className="font-extrabold mb-10 tracking-normal uppercase text-white" style={{ fontSize: 'clamp(1.6rem, 6vw, 3.5rem)' }}>
            {t("skills_page.software.title")} <br className="block md:hidden" />{" "}
            <span className="text-[var(--color-creative-blue)] md:ml-3" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>{t("skills_page.software.highlighted")}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative">
             <div className="absolute -top-10 -right-6 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg text-white font-black text-[10px] tracking-widest uppercase rotate-[-5deg] z-20 hidden lg:block">{t("skills_page.stickers.tools")}</div>

            {software.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.8 }}
                className="glass-card p-4 md:p-6 group flex flex-col h-full glow-card w-full min-w-0"
              >
                <div className="flex items-center justify-between mb-6 md:mb-10">
                  <div 
                    className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl font-black shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: item.color, color: 'white' }}
                  >
                    {item.abbr}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-extrabold mb-2 md:mb-4 uppercase tracking-normal text-white leading-tight">{item.name}</h3>
                <p className="text-white/50 text-xs md:text-base mb-6 md:mb-8 leading-relaxed font-medium">
                  {item.desc}
                </p>
                <div className="mt-auto">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}66` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div>
          <h2 className="font-extrabold mb-10 tracking-normal uppercase text-white" style={{ fontSize: 'clamp(1.6rem, 6vw, 3.5rem)' }}>
            {t("skills_page.languages.title")} <br className="block md:hidden" />{" "}
            <span className="relative inline-block mt-2 md:mt-0 md:ml-3">
               <span className="absolute inset-0 bg-[var(--color-creative-blue)]/20 blur-md rounded-lg"></span>
               <span className="relative z-10 px-3 py-1 bg-[var(--color-creative-blue)]/20 border border-[var(--color-creative-blue)]/50 rounded-xl backdrop-blur-md -rotate-1 inline-block">{t("skills_page.languages.highlighted")}</span>
            </span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {languages.map((lang, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] flex flex-col md:flex-row md:items-center gap-3 md:gap-4 group hover:border-accent-light/40 transition-all duration-500 min-w-0"
              >
                <div className="w-8 h-6 md:w-12 md:h-9 rounded-md md:rounded-xl overflow-hidden shadow-lg border border-white/10 group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                  <img src={lang.flag} alt={lang.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-body normal-case text-sm md:text-lg font-black text-white mb-0.5 md:mb-1 tracking-normal leading-tight">{lang.name}</h3>
                  <p className="text-accent-light text-[9px] sm:text-[10px] font-bold uppercase tracking-widest leading-tight">{lang.info}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
