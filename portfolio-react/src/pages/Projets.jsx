import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Filter } from 'lucide-react'
import Magnetic from '../components/Magnetic'

const projects = [
  {
    id: 'futsal',
    title: "Futsal Drancy",
    tag: "Web Dev & Communication",
    desc: "Refonte complète de l'identité numérique et création d'une plateforme web pour un club de sport.",
    img: "images/couvertures/futsal-drancy.png",
    path: "/projets/futsal"
  },
  {
    id: 'alda',
    title: "Alda Bière",
    tag: "Branding & Packaging",
    desc: "Création d'un univers de marque artisanal et éco-responsable pour une brasserie locale.",
    img: "images/couvertures/alda.png",
    path: "/projets/alda"
  },
  {
    id: 'ux',
    title: "UI/UX Works",
    tag: "Interface Design",
    desc: "Sélection d'interfaces interactives (BTS Révision, HopePower) axées sur l'expérience utilisateur.",
    img: "images/couvertures/ui-ux-designs.png",
    path: "/projets/ux"
  },
  {
    id: 'sans-bavures',
    title: "Sans Bavures",
    tag: "Audiovisuel & Montage",
    desc: "Production et montage d'un reportage multimédia sur les enjeux de l'information.",
    img: "images/couvertures/sans-bavures.png",
    path: "/projets/sans-bavures"
  },
  {
    id: 'bts-com',
    title: "BTS Com Projects",
    tag: "Stratégie & Design",
    desc: "Portfolio de réalisations académiques et professionnelles durant mon cursus en communication.",
    img: "images/couvertures/bts-com.png",
    path: "/projets/bts-com"
  },
  {
    id: 'perso',
    title: "Créations Perso",
    tag: "Créativité Libre",
    desc: "Explorations graphiques, montages expérimentaux et projets personnels divers.",
    img: "images/couvertures/projets-crea.png",
    path: "/projets/perso"
  }
]

export default function Projets() {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <main className="relative pt-24 md:pt-32 pb-20 bg-primary min-h-screen">
      <section className="section-container relative z-10">
        <header className="max-w-4xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-accent-light font-bold tracking-[0.3em] uppercase mb-6 text-xs md:text-sm flex items-center gap-3">
              <span className="w-8 h-px bg-accent-light/60" />
              Portfolio
            </p>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-extrabold mb-8 tracking-tighter leading-[0.9]"
          >
            Mes <span className="highlight italic">Réalisations.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-text-muted leading-relaxed max-w-2xl font-medium"
          >
            Une sélection de projets mêlant stratégie de communication, design graphique et développement web.
          </motion.p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={project.path} className="group relative block aspect-[16/10] md:aspect-[16/9] rounded-[2.5rem] overflow-hidden glass-card shadow-2xl">
                <img 
                  src={`${baseUrl}${project.img}`} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  onError={(e) => { e.target.style.opacity = '0.2'; }}
                />
                
                {/* Hover Reveal Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <div className="flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0">
                    <span className="text-accent-light font-bold text-[10px] tracking-widest uppercase">
                      {project.tag}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tighter">
                      {project.title}
                    </h3>
                    <div className="pt-4">
                      <span className="btn-premium py-3 px-6 text-xs inline-flex items-center gap-2">
                        Découvrir le projet <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
