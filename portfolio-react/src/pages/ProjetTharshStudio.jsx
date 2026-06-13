import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Download, Palette, Instagram, Brush, Layers, Eye } from 'lucide-react'
import MosaicGrid from '../components/MosaicGrid'

export default function ProjetTharshStudio() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])
  const baseUrl = import.meta.env.BASE_URL
  
  // States for interactive logo switcher
  const [logoTheme, setLogoTheme] = useState('blue') // 'blue', 'dark', 'light'

  // Sections for graphic charter gallery
  const sections = [{
    title: "Slides de la charte graphique",
    tag: "Charte Visuelle",
    items: [
      { src: `${baseUrl}images/charte-graphique-images/01- Cover charte graphique.png`, alt: 'Couverture de la charte graphique', wide: true },
      { src: `${baseUrl}images/charte-graphique-images/02 - Logotype.png`, alt: 'Logotype - Construction et grille' },
      { src: `${baseUrl}images/charte-graphique-images/03 - Color variation.png`, alt: 'Déclinaisons chromatiques du logo' },
      { src: `${baseUrl}images/charte-graphique-images/04 - Colors.png`, alt: 'Palette de couleurs de la marque' },
      { src: `${baseUrl}images/charte-graphique-images/05 - Typographie for headings.png`, alt: 'Typographies pour les titres' },
      { src: `${baseUrl}images/charte-graphique-images/06 - Typography Text.png`, alt: 'Typographies pour le corps de texte' },
      { src: `${baseUrl}images/charte-graphique-images/07 - Textured backgrounds.png`, alt: 'Fonds textures et motifs', wide: true },
      { src: `${baseUrl}images/charte-graphique-images/08 - Moodboard.png`, alt: 'Moodboard d\'inspiration artistique' },
      { src: `${baseUrl}images/charte-graphique-images/09 - Déclinaisons.png`, alt: 'Déclinaisons graphiques et mockups' },
    ]
  }]

  // Logo mapping according to active tab
  const getLogoImage = () => {
    switch (logoTheme) {
      case 'dark':
        return {
          src: `${baseUrl}images/logo-tharsh-studio/Logo Tharsh Studio-02 bg.png`,
          bgClass: 'bg-black border-white/10 text-white',
          label: 'Version Sombre (Noir/Gris)'
        }
      case 'light':
        return {
          src: `${baseUrl}images/logo-tharsh-studio/Logo Tharsh Studio bg-01.png`,
          bgClass: 'bg-white border-black/10 text-black',
          label: 'Version Claire (Blanc)'
        }
      case 'blue':
      default:
        return {
          src: `${baseUrl}images/logo-tharsh-studio/Logo Tharsh Studio-03 bg .png`,
          bgClass: 'bg-sky-950/40 backdrop-blur-md border-sky-500/20 text-white',
          label: 'Version Signature (Bleu Royal)'
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
              Identité de marque
            </div>
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white tracking-tighter leading-[1.1] font-heading uppercase">
              Tharsh <span className="text-[var(--color-creative-blue)] italic">Studio.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Project Meta */}
      <section className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/5 relative z-10">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400/60">Rôle</span>
          <p className="font-bold text-sm md:text-base">Direction Artistique & Graphisme</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400/60">Lancement</span>
          <p className="font-bold text-sm md:text-base">Juin 2026</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400/60">Outils</span>
          <p className="font-bold text-sm md:text-base">Illustrator, Photoshop, Figma</p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400/60">Destination</span>
          <p className="font-bold text-sm md:text-base">Compte Instagram Professionnel</p>
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
              Une empreinte <br />
              <span className="text-[var(--color-creative-blue)]">créative</span> unique.
            </h2>
            <div className="space-y-6 text-slate-200 text-lg leading-relaxed">
              <p>
                Pour accompagner le lancement de mon compte Instagram professionnel destiné à valoriser mes réalisations créatives, j'ai conçu l'identité visuelle de Tharsh Studio.
              </p>
              <p>
                L'objectif était de bâtir une marque personnelle moderne, épurée et hautement flexible, capable de s'adapter aux différentes thématiques de design (web, graphisme, audiovisuel) tout en conservant une forte cohérence visuelle.
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
              <h3 className="text-xl font-bold mb-3 text-white">Identité de Marque</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Design d'un logotype construit sur grille avec une typographie géométrique soignée et une palette chromatique équilibrée.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-secondary/40 border border-white/5 hover:border-[var(--color-creative-blue)]/30 transition-all glass-card">
              <Layers className="text-[var(--color-creative-blue)] mb-5" size={28} />
              <h3 className="text-xl font-bold mb-3 text-white">Système Modulaire</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Création de fonds texturés personnalisés, de motifs géométriques et d'une structure de moodboard pour assurer la cohérence visuelle du feed Instagram.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Logo Switcher Showcase */}
      <section className="section-container py-16 relative z-10 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[var(--color-creative-blue)] font-bold text-xs uppercase tracking-widest mb-3">Modularité Chromatique</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">Variations du Logotype</h2>
          <p className="text-slate-400 mt-4 text-sm md:text-base">
            Découvrez comment le logotype s'adapte dynamiquement selon les contrastes et les supports de diffusion.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          {/* Tabs */}
          <div className="flex p-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setLogoTheme('blue')}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${logoTheme === 'blue' ? 'bg-[var(--color-creative-blue)] text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              Signature Bleu
            </button>
            <button 
              onClick={() => setLogoTheme('dark')}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${logoTheme === 'dark' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Sombre
            </button>
            <button 
              onClick={() => setLogoTheme('light')}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${logoTheme === 'light' ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Clair
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

      {/* Graphic Charter Showcase */}
      <section className="border-t border-white/5 py-20 relative z-10">
        <div className="section-container max-w-4xl mx-auto flex flex-col gap-8 md:gap-12 items-center">
          <div className="text-center mb-6">
            <p className="text-[var(--color-creative-blue)] font-bold text-xs uppercase tracking-widest mb-3">Charte Visuelle</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">Pages de la charte graphique</h2>
            <p className="text-slate-400 mt-2 text-sm md:text-base">
              Défilez pour parcourir l'ensemble des slides de la charte visuelle.
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

      {/* Download Section */}
      <section className="section-container py-24 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[2.5rem] p-8 md:p-14 bg-gradient-to-br from-[#0c1225]/85 to-black/60 border border-sky-500/20 shadow-[0_0_60px_rgba(14,165,233,0.1)] overflow-hidden text-center flex flex-col items-center">
            {/* Background glowing blob */}
            <div className="absolute w-[250px] h-[250px] rounded-full bg-[var(--color-creative-blue)] blur-[120px] opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <Palette className="text-[var(--color-creative-blue)] mb-6 animate-pulse" size={40} />
            
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight uppercase mb-4 leading-tight">
              Télécharger la charte complète
            </h2>
            
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Consultez le guide de marque complet en haute résolution pour découvrir en détail la typographie, la palette de couleurs CMJN/RVB/HEX, le moodboard d'inspiration et les déclinaisons de mise en page.
            </p>
            
            <a 
              href={`${baseUrl}documents/charte-graphique-pdf/Charte graphique Complet.pdf`} 
              download="Charte graphique Complet.pdf"
              className="btn-premium px-10 py-5 gap-3 group text-xs md:text-sm uppercase tracking-wider font-black hover:shadow-[var(--color-creative-blue)]/30 transition-all duration-300"
            >
              <Download size={18} className="group-hover:translate-y-[2px] transition-transform" />
              Télécharger le PDF (7.4 Mo)
            </a>
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="section-container py-24 border-t border-white/5 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Projet suivant</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase">Futsal Drancy</h2>
          </div>
          <Link to="/projets/futsal" className="btn-premium gap-3 text-sm px-10 py-4.5">
            Découvrir <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
