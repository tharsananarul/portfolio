import { motion } from 'framer-motion'
import { Download, GraduationCap, Briefcase, MapPin, Sparkles } from 'lucide-react'
import Magnetic from '../components/Magnetic'

const education = [
  {
    period: "2025 — 2026",
    title: "BTS Communication",
    location: "Lycée Jacques Brel · La Courneuve",
    desc: "Mise en œuvre d'actions de communication, relations avec les prestataires, veille technologique et design graphique."
  },
  {
    period: "2022 — 2024",
    title: "BUT Métiers du Multimédia et de l'Internet",
    location: "IUT de Sénart-Fontainebleau",
    desc: "Développement web, UI/UX Design, audiovisuel et communication multimédia."
  },
  {
    period: "2019 — 2022",
    title: "Bac STI2D",
    location: "Lycée Paul Le Rolland · Drancy",
    desc: "Spécialité Systèmes d'Information et Numérique."
  }
]

const experiences = [
  {
    period: "Sept. 2024 — Présent",
    title: "Chargé de Communication",
    company: "Futsal Drancy",
    location: "Drancy",
    type: "CDD temps partiel",
    missions: [
      "Gestion et animation des réseaux sociaux (Instagram & Facebook)",
      "Création de contenus photos et vidéos pendant les entraînements et matchs",
      "Réalisation de publications, stories et reels (planning éditorial)",
      "Valorisation des actions du club (tournois, événements solidaires)",
      "Rédaction de résumés de matchs et annonces sportives"
    ]
  },
  {
    period: "Août 2024 — Présent",
    title: "Chargé de Clientèle",
    company: "La Banque Postale",
    location: "Le Blanc-Mesnil",
    type: "CDI",
    missions: [
      "Accueil et orientation des clients avec professionnalisme",
      "Vente de produits et services postaux (solutions adaptées)",
      "Gestion du tri et de la distribution sécurisée des colis et lettres"
    ]
  },
  {
    period: "Mars 2023 — Présent",
    title: "Community Manager - Photographe",
    company: "Objectif Sciences International",
    location: "Paris",
    type: "Service Civique",
    missions: [
      "Gestion des réseaux sociaux et élaboration de stratégies de visibilité",
      "Soutien photographique (conférences, expositions, Terra Scientifica)",
      "Réalisation d'interviews des exposants pour contenus enrichis",
      "Couverture photographique de la conférence de Genève"
    ]
  },
  {
    period: "Sept. 2023 — Présent",
    title: "Tuteur Indépendant",
    company: "Parkours",
    location: "Paris",
    type: "Indépendant",
    missions: [
      "Accompagnement et soutien pédagogique des élèves",
      "Aide à l'organisation et optimisation des méthodes d'apprentissage"
    ]
  },
  {
    period: "Mai 2025 — Juil. 2025",
    title: "Chargé de Communication",
    company: "Mairie de Drancy | Futsal Drancy",
    location: "Drancy",
    type: "Stage",
    missions: [
      "Création de contenus visuels et digitaux",
      "Gestion des réseaux sociaux et valorisation des événements sportifs",
      "Collaboration avec des acteurs institutionnels et associatifs"
    ]
  }
]

export default function CV() {
  return (
    <main className="relative pt-24 md:pt-32 pb-20 bg-primary min-h-screen">
      <section className="section-container relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-32 gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-accent-light font-bold tracking-[0.3em] uppercase mb-6 text-xs md:text-sm flex items-center gap-3">
                <span className="w-8 h-px bg-accent-light/60" />
                Expérience & Formation
              </p>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-8xl font-extrabold mb-8 tracking-tighter leading-[0.95]"
            >
              Mon <span className="highlight italic">Parcours.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-text-muted leading-relaxed max-w-xl"
            >
              Une trajectoire mêlant expertise technique, communication stratégique et passion pour le design.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Magnetic>
              <a href="/cv.pdf" download className="btn-premium gap-3 text-lg px-10 py-5 group">
                <Download size={22} className="group-hover:translate-y-1 transition-transform" /> 
                Télécharger mon CV
              </a>
            </Magnetic>
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-32">
          {/* EDUCATION */}
          <div className="space-y-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="p-4 rounded-2xl bg-accent-light/10 border border-accent-light/20 shadow-[0_0_20px_rgba(188,217,245,0.1)]">
                <GraduationCap className="text-accent-light" size={28} />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Formation</h2>
            </motion.div>

            <div className="space-y-12">
              {education.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-8 border-l border-white/10 group hover:border-accent-light/50 transition-colors"
                >
                  <div className="absolute top-0 left-[-5.5px] w-2.5 h-2.5 rounded-full bg-secondary border border-white/20 group-hover:bg-accent-light transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-light mb-2 block">{item.period}</span>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2 text-text-muted text-xs md:text-sm mb-4">
                    <MapPin size={14} /> {item.location}
                  </div>
                  <p className="text-text-muted text-xs md:text-sm leading-relaxed max-w-md">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="space-y-16">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="p-4 rounded-2xl bg-accent-light/10 border border-accent-light/20 shadow-[0_0_20px_rgba(188,217,245,0.1)]">
                <Briefcase className="text-accent-light" size={28} />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Expérience</h2>
            </motion.div>

            <div className="space-y-16">
              {experiences.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-8 border-l border-white/10 group hover:border-accent-light/50 transition-colors"
                >
                  <div className="absolute top-0 left-[-5.5px] w-2.5 h-2.5 rounded-full bg-secondary border border-white/20 group-hover:bg-accent-light transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-light mb-3 block">{item.period}</span>
                  
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-lg font-medium text-white/90">{item.company}</span>
                      <span className="px-3 py-1 rounded-full bg-accent-light/5 border border-accent-light/10 text-[10px] font-bold uppercase text-accent-light tracking-wider">
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-xs md:text-sm mt-3">
                      <MapPin size={14} /> {item.location}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {item.missions.map((mission, idx) => (
                      <li key={idx} className="text-text-muted text-xs md:text-sm flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-light/40 shrink-0" />
                        {mission}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 p-12 md:p-24 rounded-[3.5rem] bg-secondary/50 border border-white/5 text-center relative overflow-hidden group shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-accent-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-5xl font-bold mb-10 italic tracking-tight leading-tight">
              "L'innovation est le fruit d'une <span className="highlight">curiosité constante</span> et d'une rigueur créative."
            </h2>
            <p className="text-text-muted text-lg md:text-xl mb-12 leading-relaxed font-medium">
              Chaque étape de mon parcours a été guidée par l'envie d'apprendre et de relever des défis. 
              Je suis prêt à mettre cette expérience au service de vos projets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Autonomie", "Travail d'équipe", "Adaptabilité", "Rigueur", "Créativité"].map(skill => (
                <Magnetic key={skill}>
                  <div className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white hover:border-accent-light/50 transition-all cursor-default">
                    {skill}
                  </div>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
