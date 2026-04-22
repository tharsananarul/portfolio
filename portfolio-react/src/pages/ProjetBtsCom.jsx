import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Palette, Layers, PenTool } from 'lucide-react'
import MosaicGrid from '../components/MosaicGrid'

export default function ProjetBtsCom() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const baseUrl = import.meta.env.BASE_URL

  const sections = [
    {
      tag: 'Print & Branding', title: 'Mockups & Com Visuelle',
      items: [
        { src: `${baseUrl}images/bts-com/1.png`, alt: 'Design 1' },
        { src: `${baseUrl}images/bts-com/2.png`, alt: 'Design 2' },
        { src: `${baseUrl}images/bts-com/3.png`, alt: 'Design 3' },
        { src: `${baseUrl}images/bts-com/4.png`, alt: 'Design 4' },
        { src: `${baseUrl}images/bts-com/5.png`, alt: 'Design 5' },
        { src: `${baseUrl}images/bts-com/6.png`, alt: 'Design 6' },
      ]
    }
  ]

  return (
    <main className="relative bg-primary">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="grid-overlay" />
      </div>

      {/* Hero Header */}
      <div className="relative h-[60vh] overflow-hidden" ref={containerRef}>
        <motion.img 
          src={`${baseUrl}images/couvertures/bts-com.png`} 
          alt="BTS Communication" 
          className="w-full h-full object-cover"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end section-container pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/projets" className="inline-flex items-center gap-2 text-accent-light font-bold mb-6 hover:gap-4 transition-all">
              <ArrowLeft size={20} /> Retour aux projets
            </Link>
            <h1 className="text-4xl md:text-8xl font-extrabold text-white tracking-tighter">
              BTS <span className="highlight">Com.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Project Meta */}
      <section className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-white/5">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Contexte</span>
          <p className="font-bold">Lycée Jacques Brel</p>
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Période</span>
          <p className="font-bold">2024 — 2026</p>
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Outils</span>
          <p className="font-bold">Photoshop, Illustrator</p>
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Type</span>
          <p className="font-bold">Design Graphique</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-container py-24">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-2xl md:text-5xl font-bold mb-10 tracking-tight">Théorie et <span className="highlight">pratique créative</span>.</h2>
            <div className="space-y-6 text-text-muted text-lg leading-relaxed">
              <p>
                Dans le cadre de mon BTS Communication, j'ai réalisé de nombreux supports visuels alliant réflexion stratégique et exécution graphique.
              </p>
              <p>
                De la création d'affiches publicitaires à la conception de mockups pour diverses marques, ce parcours me permet de maîtriser l'ensemble de la chaîne graphique.
              </p>
            </div>
          </div>
          <div className="grid gap-8">
            <div className="p-8 rounded-3xl bg-secondary border border-white/5">
              <PenTool className="text-accent-light mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Conception Visuelle</h3>
              <p className="text-text-muted text-sm">Maîtrise des outils de création vectorielle et de retouche d'image.</p>
            </div>
            <div className="p-8 rounded-3xl bg-secondary border border-white/5">
              <Layers className="text-accent-light mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Supports Print</h3>
              <p className="text-text-muted text-sm">Réalisation de flyers, brochures et affiches conformes aux contraintes techniques.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <MosaicGrid sections={sections} />

      {/* Next Project */}
      <section className="section-container py-32 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 block">Projet suivant</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Créations Perso</h2>
          </div>
          <Link to="/projets/perso" className="btn-premium gap-3 text-lg px-12 py-5">
            Découvrir <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  )
}
