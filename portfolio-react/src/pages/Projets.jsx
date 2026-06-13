import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Filter } from 'lucide-react'
import Magnetic from '../components/Magnetic'
import PageHero from '../components/PageHero'

const projects = [
  {
    id: 'tharsh-studio',
    title: "Tharsh Studio",
    tag: "Branding & Graphic Design",
    desc: "Création de la charte graphique et de l'identité visuelle de mon studio de création pour son lancement sur Instagram.",
    img: "images/couvertures/tharsh-studio.webp",
    path: "/projets/tharsh-studio"
  },
  {
    id: 'futsal',
    title: "Futsal Drancy",
    tag: "Web Dev & Communication",
    desc: "Refonte complète de l'identité numérique et création d'un site officiel en Vibe Coding (Antigravity).",
    img: "images/couvertures/futsal-drancy.webp",
    path: "/projets/futsal"
  },
  {
    id: 'alda',
    title: "Alda Bière",
    tag: "Branding & Packaging",
    desc: "Création d'un univers de marque artisanal et éco-responsable avec prototypage rapide assisté par IA.",
    img: "images/couvertures/alda.webp",
    path: "/projets/alda"
  },
  {
    id: 'ux',
    title: "UI/UX Works",
    tag: "Interface Design",
    desc: "Sélection de sites web interactifs (BTS Révision, HopePower) développés en Vibe Coding (Antigravity/Framer).",
    img: "images/couvertures/ui-ux-designs.webp",
    path: "/projets/ux"
  },
  {
    id: 'sans-bavures',
    title: "Sans Bavures",
    tag: "Audiovisuel & Montage",
    desc: "Production, montage et intégration web en Vibe Coding pour un reportage multimédia interactif.",
    img: "images/couvertures/sans-bavures.webp",
    path: "/projets/sans-bavures"
  },
  {
    id: 'bts-com',
    title: "BTS Com Projects",
    tag: "Stratégie & Design",
    desc: "Portfolio de projets de communication et maquettes web interactives conçus en Vibe Coding.",
    img: "images/couvertures/bts-com.webp",
    path: "/projets/bts-com"
  },
  {
    id: 'perso',
    title: "Créations Perso",
    tag: "Créativité Libre",
    desc: "Explorations graphiques, posters de films et maquettes web expérimentées en Vibe Coding.",
    img: "images/couvertures/projets-crea.webp",
    path: "/projets/perso"
  }
]

export default function Projets() {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <main className="relative pb-20 bg-transparent min-h-screen">
      <PageHero
        tag="Réalisations"
        title={<>Découvrez <br /><span className="text-[var(--color-creative-blue)] uppercase font-black" style={{ WebkitTextStroke: '1px white' }}>mon univers.</span></>}
        subtitle="Une collection de projets (principalement des sites web) réalisés en Vibe Coding à l'aide d'outils d'IA avancés comme Antigravity et Framer, illustrant ma polyvalence et ma passion pour la création."
        themeColor="blue"
      />




      <section className="section-container relative z-10 -mt-10 md:-mt-20">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[var(--color-creative-blue)] rounded-full blur-[140px] opacity-[0.05] -z-10" />

        {/* Stickers - Hidden on mobile/tablets to prevent overlapping */}
        <div className="hidden xl:block sticker-shape sticker-blue-dark absolute top-60 -left-10 rotate-[-10deg] z-20">Creative</div>
        <div className="hidden xl:block sticker-shape sticker-blue absolute bottom-60 -right-10 rotate-[15deg] z-20">Design</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={project.path} className="group flex flex-col bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.3)] relative min-w-0 w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="aspect-[16/10] overflow-hidden relative border-b border-white/10">
                  <img 
                    src={`${baseUrl}${project.img}`} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    onError={(e) => { e.target.style.opacity = '0.2'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                    Explorer <ArrowRight size={14} className="text-accent-light" />
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
