import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink, Code2, Cpu, Globe, Layout, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import MosaicGrid from '../components/MosaicGrid'
import LazyImage from '../components/ui/LazyImage'
import InteractiveString from '../components/ui/InteractiveString'

export default function ProjetsUX() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const baseUrl = import.meta.env.BASE_URL
  
  const futsalScreens = [
    { src: `${baseUrl}images/site/futsal-drancy/1.webp`, alt: 'Futsal Website 1' },
    { src: `${baseUrl}images/site/futsal-drancy/2.webp`, alt: 'Futsal Website 2' },
    { src: `${baseUrl}images/site/futsal-drancy/3.webp`, alt: 'Futsal Website 3' },
    { src: `${baseUrl}images/site/futsal-drancy/4.webp`, alt: 'Futsal Website 4' },
    { src: `${baseUrl}images/site/futsal-drancy/5.webp`, alt: 'Futsal Website 5' },
    { src: `${baseUrl}images/site/futsal-drancy/6.webp`, alt: 'Futsal Website 6' },
  ]
  const btsRevision = [
    { src: `${baseUrl}images/site/bts-fdr/1.webp`, alt: 'BTS REVISIONS 1' },
    { src: `${baseUrl}images/site/bts-fdr/2.webp`, alt: 'BTS REVISIONS 2' },
    { src: `${baseUrl}images/site/bts-fdr/3.webp`, alt: 'BTS REVISIONS 3' },
    { src: `${baseUrl}images/site/bts-fdr/4.webp`, alt: 'BTS REVISIONS 4' },
  ]
  const hopePower = [
    { src: `${baseUrl}images/site/hope-power/1.webp`, alt: 'HopePower 1' },
    { src: `${baseUrl}images/site/hope-power/2.webp`, alt: 'HopePower 2' },
    { src: `${baseUrl}images/site/hope-power/3.webp`, alt: 'HopePower 3' },
    { src: `${baseUrl}images/site/hope-power/4.webp`, alt: 'HopePower 4' },
  ]

  return (
    <main className="relative bg-transparent min-h-screen overflow-hidden">

      {/* Hero Header */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden" ref={containerRef}>
        <motion.div style={{ y, height: '100%' }}>
          <LazyImage 
            src={`${baseUrl}images/couvertures/ui-ux-designs.webp`} 
            alt="UI/UX Design" 
            className="w-full h-full"
            skeletonClassName="opacity-30"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent z-10" />
        <div className="absolute inset-0 flex flex-col justify-end section-container pb-12 md:pb-20 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(2.5rem,9vw,6rem)] font-black text-white tracking-tighter leading-[1.1] uppercase relative inline-block">
              UI/UX <br className="block md:hidden" />{" "}
              <span className="text-[var(--color-creative-blue)] editorial-title-outline mt-2 md:mt-0 md:ml-4 inline-block">Works.</span>
              <div className="hidden md:block">
                <div className="absolute -top-10 -right-20 sticker-shape sticker-blue-dark rotate-[12deg]">Design</div>
              </div>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Project Meta */}
      <section className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 py-12 md:py-16 border-b border-white/5">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">Expertise</span>
          <p className="font-bold text-sm md:text-base">HTML, CSS, React</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.period")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.ux.period")}</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.tools")}</span>
          <p className="font-bold text-sm md:text-base">VS Code, Figma</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-light/50">{t("project_details.labels.type")}</span>
          <p className="font-bold text-sm md:text-base">{t("project_details.ux.type")}</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-container py-16 md:py-24">
        <div className="max-w-4xl">
          <h2 className="text-[clamp(1.5rem,4.5vw,3rem)] font-bold mb-8 tracking-tight leading-[1.1]">{t("project_details.ux.concept_title")}</h2>
          <p className="text-lg md:text-xl text-slate-100 leading-relaxed mb-12">
            {t("project_details.ux.para1")}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-secondary border border-white/5 group hover:border-accent-light/30 transition-all">
              <Code2 className="text-accent-light mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">{t("project_details.ux.card1_title")}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {t("project_details.ux.card1_desc")}
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-secondary border border-white/5 group hover:border-accent-light/30 transition-all">
              <Cpu className="text-accent-light mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">{t("project_details.ux.card2_title")}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {t("project_details.ux.card2_desc")}
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-secondary border border-white/5 group hover:border-accent-light/30 transition-all">
              <Sparkles className="text-accent-light mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">{t("project_details.ux.card3_title")}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {t("project_details.ux.card3_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study: Futsal Website */}
      <section className="section-container py-20 md:py-32 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-light mb-4 block">{t("project_details.ux.futsal.tag")}</span>
            <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-bold mb-8 tracking-tighter leading-[1.1]">{t("project_details.ux.futsal.title")}</h2>
            <p className="text-base md:text-xl text-slate-100 leading-relaxed mb-10">
              {t("project_details.ux.futsal.desc")}
            </p>
            <a href="https://tharsananarul.github.io/futsal-drancy/#/" target="_blank" rel="noreferrer" className="btn-premium gap-3">
              {t("project_details.ux.futsal.btn")} <ExternalLink size={20} />
            </a>
          </div>
        </div>
        <MosaicGrid sections={[{ items: futsalScreens }]} accentColor="#0ea5e9" />
      </section>

      {/* Case Studies */}
      <section className="section-container py-20 md:py-32 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-light mb-4 block">{t("project_details.ux.bts.tag")}</span>
            <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-bold mb-8 tracking-tighter leading-[1.1]">{t("project_details.ux.bts.title")}</h2>
            <p className="text-base md:text-xl text-slate-100 leading-relaxed mb-10">
              {t("project_details.ux.bts.desc")}
            </p>
            <a href="https://tharsananarul.github.io/fdr-bts-com/" target="_blank" rel="noreferrer" className="btn-premium gap-3">
              {t("project_details.ux.bts.btn")} <ExternalLink size={20} />
            </a>
          </div>
        </div>
        <MosaicGrid sections={[{ items: btsRevision }]} accentColor="#0ea5e9" />
      </section>

      <section className="section-container py-20 md:py-32 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-light mb-4 block">{t("project_details.ux.hope.tag")}</span>
            <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-bold mb-8 tracking-tighter leading-[1.1]">{t("project_details.ux.hope.title")}</h2>
            <p className="text-base md:text-xl text-slate-100 leading-relaxed mb-10">
              {t("project_details.ux.hope.desc")}
            </p>
            <a href="https://tharsananarul.github.io/hopepower/" target="_blank" rel="noreferrer" className="btn-premium gap-3">
              {t("project_details.ux.hope.btn")} <ExternalLink size={20} />
            </a>
          </div>
        </div>
        <MosaicGrid sections={[{ items: hopePower }]} accentColor="#0ea5e9" />
      </section>

      {/* Next Project */}
      <div className="section-container pb-8 pt-24 opacity-30">
        <InteractiveString hoverColor="#0ea5e9" />
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
