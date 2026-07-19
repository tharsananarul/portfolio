import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Camera, Share2, Users, Palette, Globe, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import MosaicGrid from '../components/MosaicGrid'
import Magnetic from '../components/Magnetic'
import InteractiveString from '../components/ui/InteractiveString'
import useSEO from '../hooks/useSEO'

export default function ProjetFutsal() {
  const { t } = useTranslation()
  useSEO('seo.futsal.title', 'seo.futsal.desc')
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const baseUrl = import.meta.env.BASE_URL

  const sections = [
    {
      tag: t('project_details.futsal.gallery_tags.branding'), title: t('project_details.futsal.gallery_tags.branding_title'),
      items: [
        { src: `${baseUrl}images/futsal-drancy/logofinal.webp`, alt: 'Logo final' },
        { src: `${baseUrl}images/futsal-drancy/planlogo.webp`, alt: 'Plan logo' },
        { src: `${baseUrl}images/futsal-drancy/maillotlogovert.webp`, alt: 'Maillot vert' },
        { src: `${baseUrl}images/futsal-drancy/logomaillotblanc.webp`, alt: 'Maillot blanc' },
        { src: `${baseUrl}images/futsal-drancy/logomaillotnoir.webp`, alt: 'Maillot noir' },
        { src: `${baseUrl}images/futsal-drancy/gobelet-01.webp`, alt: 'Gobelet design' },
        { src: `${baseUrl}images/futsal-drancy/gobelet-02.webp`, alt: 'Gobelet design 2' },
      ]
    },
    {
      tag: t('project_details.futsal.gallery_tags.comm'), title: t('project_details.futsal.gallery_tags.comm_title'),
      items: [
        { src: `${baseUrl}images/futsal-drancy/affiche-tournoi.webp`, alt: 'Affiche Tournoi', tall: true },
        { src: `${baseUrl}images/futsal-drancy/afficheldc.webp`, alt: 'Affiche LDC' },
        { src: `${baseUrl}images/futsal-drancy/affichelangevin.webp`, alt: 'Affiche Langevin' },
        { src: `${baseUrl}images/futsal-drancy/recutement-langevin.webp`, alt: 'Recrutement Langevin' },
        { src: `${baseUrl}images/futsal-drancy/recutement-langevin02.webp`, alt: 'Recrutement Langevin 2' },
        { src: `${baseUrl}images/futsal-drancy/affiche-equipement.webp`, alt: 'Affiche Équipement', tall: true },
        { src: `${baseUrl}images/futsal-drancy/affiche-reunion.webp`, alt: 'Affiche Réunion' },
        { src: `${baseUrl}images/futsal-drancy/coursenor.webp`, alt: 'Course Or' },
      ]
    },
    {
      tag: t('project_details.futsal.gallery_tags.life'), title: t('project_details.futsal.gallery_tags.life_title'),
      items: [
        { src: `${baseUrl}images/futsal-drancy/fete-de-la-ville.webp`, alt: 'Fête de la ville' },
        { src: `${baseUrl}images/futsal-drancy/fetedenoel01.webp`, alt: 'Fête de Noël' },
        { src: `${baseUrl}images/futsal-drancy/affiche-telethon01.webp`, alt: 'Téléthon 1' },
        { src: `${baseUrl}images/futsal-drancy/affiche-telethon02.webp`, alt: 'Téléthon 2' },
        { src: `${baseUrl}images/futsal-drancy/guiliascup.webp`, alt: 'Guilias Cup' },
      ]
    },
    {
      tag: t('project_details.futsal.gallery_tags.social'), title: t('project_details.futsal.gallery_tags.social_title'),
      items: [
        { src: `${baseUrl}images/futsal-drancy/1.webp`, alt: 'Post 1' },
        { src: `${baseUrl}images/futsal-drancy/2.webp`, alt: 'Post 2' },
        { src: `${baseUrl}images/futsal-drancy/3.webp`, alt: 'Post 3' },
        { src: `${baseUrl}images/futsal-drancy/5.webp`, alt: 'Post 5' },
        { src: `${baseUrl}images/futsal-drancy/7.webp`, alt: 'Post 7' },
        { src: `${baseUrl}images/futsal-drancy/12.webp`, alt: 'Post 12' },
        { src: `${baseUrl}images/futsal-drancy/13.webp`, alt: 'Post 13' },
        { src: `${baseUrl}images/futsal-drancy/14.webp`, alt: 'Post 14' },
      ]
    }
  ]

  return (
    <main className="relative bg-transparent min-h-screen">

      {/* Optimized Hero Header */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden" ref={containerRef}>
        <motion.div 
          style={{ y }}
          className="absolute inset-0 bg-[#0d1525]"
        >
          <img 
            src={`${baseUrl}images/couvertures/futsal-drancy.webp`} 
            alt="Futsal Drancy Cover" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end section-container pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(2.2rem,8vw,5.5rem)] font-black text-white tracking-tighter leading-[1.1] font-heading">
              Futsal <span className="text-accent-light italic">Drancy.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Project Meta */}
      <section className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 py-12 md:py-16 border-b border-white/5">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.role")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.futsal.role")}</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.period")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.futsal.period")}</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.tools")}</span>
          <p className="font-bold text-sm md:text-base">Antigravity, React, Adobe Suite</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.context")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.futsal.context")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-container py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-[clamp(1.5rem,4.5vw,3rem)] font-bold mb-10 tracking-tight leading-[1.1]">{t("project_details.futsal.concept_title")}</h2>
            <div className="space-y-6 text-slate-100 text-base md:text-lg leading-relaxed">
              <p>
                {t("project_details.futsal.para1")}
              </p>
              <div className="pt-6">
                <Magnetic>
                  <a href="https://tharsananarul.github.io/futsal-drancy/#/" target="_blank" rel="noreferrer" className="btn-premium gap-3">
                    {t("project_details.futsal.visit_website")} <ExternalLink size={20} />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="glass-card p-6 md:p-8 rounded-3xl">
              <Globe className="text-accent-light mb-4" size={28} />
              <h3 className="text-sm md:text-lg font-bold mb-2">{t("project_details.futsal.card1_title")}</h3>
              <p className="text-text-muted text-[10px] md:text-xs">{t("project_details.futsal.card1_desc")}</p>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-3xl">
              <Camera className="text-accent-light mb-4" size={28} />
              <h3 className="text-sm md:text-lg font-bold mb-2">{t("project_details.futsal.card2_title")}</h3>
              <p className="text-text-muted text-[10px] md:text-xs">{t("project_details.futsal.card2_desc")}</p>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-3xl">
              <Users className="text-accent-light mb-4" size={28} />
              <h3 className="text-xs sm:text-sm md:text-lg font-bold mb-2 break-words">{t("project_details.futsal.card3_title")}</h3>
              <p className="text-text-muted text-[10px] md:text-xs">{t("project_details.futsal.card3_desc")}</p>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-3xl">
              <Palette className="text-accent-light mb-4" size={28} />
              <h3 className="text-sm md:text-lg font-bold mb-2">{t("project_details.futsal.card4_title")}</h3>
              <p className="text-text-muted text-[10px] md:text-xs">{t("project_details.futsal.card4_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <MosaicGrid sections={sections} accentColor="#22c55e" />

      {/* Next Project */}
      <div className="section-container pb-8 pt-24 opacity-30">
        <InteractiveString hoverColor="#22c55e" />
      </div>
      <section className="section-container pb-32 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">{t("project_details.next")}</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Alda Bière</h2>
          </div>
          <Magnetic>
            <Link to="/projets/alda" className="btn-premium gap-3 text-lg px-12 py-5">
              {t("project_details.explore")} <ArrowRight size={20} />
            </Link>
          </Magnetic>
        </div>
      </section>
    </main>
  )
}
