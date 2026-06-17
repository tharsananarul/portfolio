import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Camera, Palette, Music } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import MosaicGrid from '../components/MosaicGrid'
import InteractiveString from '../components/ui/InteractiveString'

export default function ProjetPerso() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const baseUrl = import.meta.env.BASE_URL

  const sections = [
    {
      tag: t('project_details.perso.gallery_tag'), title: t('project_details.perso.gallery_title'),
      items: [
        { src: `${baseUrl}images/projets-crea/captain-miller.webp`, alt: 'Captain Miller Poster' },
        { src: `${baseUrl}images/projets-crea/kok-poster.webp`, alt: 'KOK Poster' },
        { src: `${baseUrl}images/projets-crea/cover-base-1.webp`, alt: 'Cover Base 1' },
        { src: `${baseUrl}images/projets-crea/cover-base-2.webp`, alt: 'Cover Base 2' },
        { src: `${baseUrl}images/projets-crea/kok-car.webp`, alt: 'KOK Car Design' },
        { src: `${baseUrl}images/projets-crea/animal.webp`, alt: 'Animal Poster' },
        { src: `${baseUrl}images/projets-crea/cover-magazine.webp`, alt: 'Cover Magazine' },
      ]
    }
  ]

  return (
    <main className="relative bg-transparent min-h-screen">

      {/* Hero Header */}
      <div className="relative h-[60vh] overflow-hidden" ref={containerRef}>
        <motion.img 
          src={`${baseUrl}images/couvertures/projets-crea.webp`} 
          alt="Créations Personnelles" 
          className="w-full h-full object-cover"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end section-container pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(2.2rem,8vw,5.5rem)] font-black text-white tracking-tighter leading-[1.1] font-heading">
              Projets <span className="text-accent-light italic">Perso.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Project Meta */}
      <section className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-white/5">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.type")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.perso.type")}</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">Focus</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.perso.focus")}</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.tools")}</span>
          <p className="font-bold text-sm md:text-base">Photoshop, Illustrator, Web Design</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">Thème</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.perso.theme")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-container py-24">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-[clamp(1.5rem,4.5vw,3rem)] font-bold mb-10 tracking-tight leading-[1.1]">{t("project_details.perso.concept_title")}</h2>
            <div className="space-y-6 text-slate-100 text-lg leading-relaxed">
              <p>
                {t("project_details.perso.para1")}
              </p>
              <p>
                {t("project_details.perso.para2")}
              </p>
            </div>
          </div>
          <div className="grid gap-8">
            <div className="p-8 rounded-3xl bg-secondary border border-white/5">
              <Palette className="text-accent-light mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">{t("project_details.perso.card1_title")}</h3>
              <p className="text-slate-200 text-sm">{t("project_details.perso.card1_desc")}</p>
            </div>
            <div className="p-8 rounded-3xl bg-secondary border border-white/5">
              <Camera className="text-accent-light mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">{t("project_details.perso.card2_title")}</h3>
              <p className="text-slate-200 text-sm">{t("project_details.perso.card2_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <MosaicGrid sections={sections} accentColor="#f97316" />

      {/* Next Project */}
      <div className="section-container pb-8 pt-24 opacity-30">
        <InteractiveString hoverColor="#f97316" />
      </div>
      <section className="section-container pb-32 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">{t("project_details.next")}</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Tharsh&nbsp;Studio</h2>
          </div>
          <Link to="/projets/tharsh-studio" className="btn-premium gap-3 text-lg px-12 py-5">
            {t("project_details.explore")} <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  )
}
