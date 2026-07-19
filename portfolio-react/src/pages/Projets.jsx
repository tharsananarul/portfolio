import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Filter } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Magnetic from '../components/Magnetic'
import PageHero from '../components/PageHero'
import SpotlightCard from '../components/ui/SpotlightCard'
import ScrollParallax from '../components/ui/ScrollParallax'
import useSEO from '../hooks/useSEO'

export default function Projets() {
  const { t } = useTranslation()
  useSEO('seo.projects.title', 'seo.projects.desc')
  const baseUrl = import.meta.env.BASE_URL

  const projects = [
    {
      id: 'tharsh-studio',
      title: t("projets_page.list.tharsh_studio.title"),
      tag: t("projets_page.tags.branding_graphic"),
      desc: t("projets_page.list.tharsh_studio.desc"),
      img: "images/couvertures/tharsh-studio.webp",
      path: "/projets/tharsh-studio"
    },
    {
      id: 'futsal',
      title: t("projets_page.list.futsal.title"),
      tag: t("projets_page.tags.web_comm"),
      desc: t("projets_page.list.futsal.desc"),
      img: "images/couvertures/futsal-drancy.webp",
      path: "/projets/futsal"
    },
    {
      id: 'alda',
      title: t("projets_page.list.alda.title"),
      tag: t("projets_page.tags.branding_packaging"),
      desc: t("projets_page.list.alda.desc"),
      img: "images/couvertures/alda.webp",
      path: "/projets/alda"
    },
    {
      id: 'ux',
      title: t("projets_page.list.ux.title"),
      tag: t("projets_page.tags.uiux"),
      desc: t("projets_page.list.ux.desc"),
      img: "images/couvertures/ui-ux-designs.webp",
      path: "/projets/ux"
    },
    {
      id: 'sans-bavures',
      title: t("projets_page.list.sans_bavures.title"),
      tag: t("projets_page.tags.audiovisual"),
      desc: t("projets_page.list.sans_bavures.desc"),
      img: "images/couvertures/sans-bavures.webp",
      path: "/projets/sans-bavures"
    },
    {
      id: 'bts-com',
      title: t("projets_page.list.bts_com.title"),
      tag: t("projets_page.tags.strategy_design"),
      desc: t("projets_page.list.bts_com.desc"),
      img: "images/couvertures/bts-com.webp",
      path: "/projets/bts-com"
    },
    {
      id: 'perso',
      title: t("projets_page.list.perso.title"),
      tag: t("projets_page.tags.creativity"),
      desc: t("projets_page.list.perso.desc"),
      img: "images/couvertures/projets-crea.webp",
      path: "/projets/perso"
    }
  ]

  return (
    <main className="relative pb-20 bg-transparent min-h-screen">
      <PageHero
        tag={t("projets_page.tag")}
        title={<>{t("projets_page.title_start")} <br /><span className="text-[var(--color-creative-blue)] uppercase font-black" style={{ WebkitTextStroke: '1px white' }}>{t("projets_page.title_end")}</span></>}
        subtitle={t("projets_page.subtitle")}
        themeColor="blue"
      />





      <section className="section-container relative z-10 -mt-10 md:-mt-20">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[var(--color-creative-blue)] rounded-full blur-[140px] opacity-[0.05] -z-10" />

        {/* Stickers - Hidden on mobile/tablets to prevent overlapping */}
        <div className="hidden xl:block sticker-shape sticker-blue-dark absolute top-60 -left-10 rotate-[-10deg] z-20">{t("projets_page.stickers.creative")}</div>
        <div className="hidden xl:block sticker-shape sticker-blue absolute bottom-60 -right-10 rotate-[15deg] z-20">{t("projets_page.stickers.design")}</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.3)] w-full h-full">
                <Link to={project.path} className="group flex flex-col w-full h-full relative" data-cursor="PROJECT_SCAN">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="aspect-[16/10] overflow-hidden relative border-b border-white/10">
                    <ScrollParallax className="w-full h-full" speed={0.05}>
                      <img 
                        src={`${baseUrl}${project.img}`} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        onError={(e) => { e.target.style.opacity = '0.2'; }}
                      />
                    </ScrollParallax>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  </div>
                  
                  <div className="p-6 md:p-10 flex flex-col flex-grow">
                    <span className="text-accent-light font-bold text-[10px] tracking-widest uppercase mb-3">
                      {project.tag}
                    </span>
                    <h3 className="text-xl md:text-3xl font-bold text-white tracking-tighter mb-4 group-hover:text-accent-light transition-colors break-words">
                      {project.title}
                    </h3>
                    <p className="text-text-muted text-xs md:text-base leading-relaxed mb-8 line-clamp-2 break-words">
                      {project.desc}
                    </p>
                    <div className="mt-auto pt-4 flex items-center gap-2 font-bold text-[10px] md:text-xs uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                      {t("projets_page.explore")} <ArrowRight size={14} className="text-accent-light" />
                    </div>
                  </div>
                </Link>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
