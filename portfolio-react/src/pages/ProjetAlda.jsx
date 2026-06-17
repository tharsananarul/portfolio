import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink, Beer, Palette, BarChart3 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import MosaicGrid from '../components/MosaicGrid'
import InteractiveString from '../components/ui/InteractiveString'

export default function ProjetAlda() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const baseUrl = import.meta.env.BASE_URL
  
  const sections = [{
    items: [
      { src: `${baseUrl}images/alda/affichemockup.webp`, alt: 'Affiche mockup', tall: true },
      { src: `${baseUrl}images/alda/bouteille1.webp`, alt: 'Bouteille Alda' },
      { src: `${baseUrl}images/alda/bouteille2.webp`, alt: 'Bouteille 2' },
      { src: `${baseUrl}images/alda/bouteille3.webp`, alt: 'Bouteille 3' },
      { src: `${baseUrl}images/alda/bouteille4.webp`, alt: 'Bouteille 4' },
      { src: `${baseUrl}images/alda/bouteille5.webp`, alt: 'Bouteille 5' },
      { src: `${baseUrl}images/alda/bouteille6.webp`, alt: 'Bouteille 6' },
      { src: `${baseUrl}images/alda/site-mockup.webp`, alt: 'Site mockup', wide: true },
      { src: `${baseUrl}images/alda/aldaaccueil.webp`, alt: 'Page accueil' },
      { src: `${baseUrl}images/alda/aldalandingpage.webp`, alt: 'Landing page' },
      { src: `${baseUrl}images/alda/pageproduit.webp`, alt: 'Page produit' },
    ]
  }]

  return (
    <main className="relative bg-transparent min-h-screen">

      {/* Hero Header */}
      <div className="relative h-[60vh] overflow-hidden" ref={containerRef}>
        <motion.img 
          src={`${baseUrl}images/couvertures/alda.webp`} 
          alt="Alda Bière" 
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
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white tracking-tighter leading-[1.1] font-heading">
              Alda <span className="text-accent-light italic">Bière.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Project Meta */}
      <section className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-white/5">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.role")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.alda.role")}</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.period")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.alda.period")}</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.tools")}</span>
          <p className="font-bold text-sm md:text-base">Figma, Illustrator, HTML, CSS</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.type")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.alda.type")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-container py-24">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-[clamp(1.8rem,4.5vw,3rem)] font-bold mb-10 tracking-tight leading-[1.1]">{t("project_details.alda.concept_title")}</h2>
            <div className="space-y-6 text-slate-100 text-lg leading-relaxed">
              <p>
                {t("project_details.alda.para1")}
              </p>
              <p>
                {t("project_details.alda.para2")}
              </p>
            </div>
          </div>
          <div className="grid gap-8">
            <div className="p-8 rounded-3xl bg-secondary border border-white/5 group hover:border-accent-light/30 transition-all">
              <Beer className="text-accent-light mb-6" size={32} />
              <h3 className="text-xl font-bold mb-4">{t("project_details.alda.card1_title")}</h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                {t("project_details.alda.card1_desc")}
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-secondary border border-white/5 group hover:border-accent-light/30 transition-all">
              <BarChart3 className="text-accent-light mb-6" size={32} />
              <h3 className="text-xl font-bold mb-4">{t("project_details.alda.card2_title")}</h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                {t("project_details.alda.card2_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <MosaicGrid sections={sections} accentColor="#facc15" />

      {/* Next Project */}
      <div className="section-container pb-8 pt-24 opacity-30">
        <InteractiveString hoverColor="#facc15" />
      </div>
      <section className="section-container pb-32 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">{t("project_details.next")}</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Sans Bavures</h2>
          </div>
          <Link to="/projets/sans-bavures" className="btn-premium gap-3 text-lg px-12 py-5">
            {t("project_details.explore")} <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  )
}
