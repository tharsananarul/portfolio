import { motion } from 'framer-motion'
import { Download, GraduationCap, Briefcase, MapPin, Sparkles } from 'lucide-react'
import Magnetic from '../components/Magnetic'
import PageHero from '../components/PageHero'
import LazyImage from '../components/ui/LazyImage'

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
    title: "Communication & Design Graphique",
    company: "Futsal Drancy",
    location: "Drancy",
    type: "Stage | Service Civique | Bénévolat",
    missions: [
      "Bénévole (Depuis Janv. 2026) : Soutien événementiel et animation de communauté.",
      "Service Civique (Sept. 2024 — Mai 2025) : Gestion des réseaux sociaux et création de contenu digital.",
      "Stagiaire Communication (Mai — Juin 2025 & Nov — Déc 2025) : Stratégie de visibilité et supports print."
    ]
  },
  {
    period: "Août 2024 — Janvier 2026",
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
    title: "Community Manager — Photographe",
    company: "Objectif Sciences International",
    location: "Paris & Genève",
    type: "Stage | Bénévolat",
    missions: [
      "Stagiaire (Mars — Avril 2023) puis Bénévole (Depuis Mai 2023).",
      "Couverture photographique et vidéo du Forum de Genève au Palais des Nations (ONU).",
      "Gestion des réseaux sociaux et valorisation des actions de diplomatie scientifique.",
      "Réalisation d'interviews de délégués internationaux et chercheurs pour Terra Scientifica.",
      "Création de contenus digitaux pour promouvoir l'éducation aux sciences participatives.",
      "Soutien à la communication événementielle lors de salons et conférences internationales."
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
  }
]

export default function CV() {
  return (
    <main className="relative bg-transparent min-h-screen pb-32">
      <PageHero
        tag="Expérience & Formation"
        title={<><span className="text-[1.3em]">Mon</span> <span className="text-[var(--color-creative-blue)] uppercase font-black" style={{ WebkitTextStroke: '1px white' }}>Parcours.</span></>}
        subtitle="Une trajectoire mêlant expertise technique, communication stratégique et passion pour le design."
        compact={true}
        themeColor="blue"
      />


      {/* Background patterns & Creative Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        
        {/* Large creative blobs - Hidden on mobile to save GPU performance */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="hidden md:block absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--color-creative-blue)]/10 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 100, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="hidden md:block absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-[var(--color-creative-blue)]/10 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            rotate: 360
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="hidden md:block absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-[var(--color-creative-blue)]/5 blur-[150px] rounded-full"
        />

        {/* Decorative floating icons removed as requested */}
      </div>

      {/* Main Content Section */}
      <section className="section-container relative z-10 -mt-4 md:-mt-8">
        {/* Download button */}
        <div className="mt-12 mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Magnetic>
              <a href={`${import.meta.env.BASE_URL}documents/cv-tharsanan-final.pdf`} download className="btn-premium-orange gap-3 group">
                <Download size={22} className="group-hover:translate-y-1 transition-transform" /> 
                Télécharger mon CV
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-32">
          {/* EDUCATION */}
          <div className="space-y-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-16"
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-[var(--color-creative-blue)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <GraduationCap className="text-[var(--color-creative-blue)]" size={28} />
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                <span className="text-white block mb-2 text-[1.4em]">Ma</span>
                <span className="relative inline-block px-4 py-1">
                  <span className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-sm -rotate-1 rounded-lg" />
                  <span className="relative text-[var(--color-creative-blue)]">Formation</span>
                </span>
              </h2>
            </motion.div>

            <div className="space-y-6 md:space-y-8 relative">
              {education.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-5 md:p-6 group glow-card"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-creative-blue)] mb-2 block">{item.period}</span>
                  <h3 className="text-lg md:text-xl font-black mb-2 uppercase tracking-tighter text-white leading-tight">{item.title}</h3>
                  <div className="flex items-center gap-2 text-white/50 text-[10px] md:text-sm mb-3 font-bold">
                    <MapPin size={14} /> {item.location}
                  </div>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-xl font-medium">{item.desc}</p>
                </motion.div>
              ))}

              {/* Realistic 3D Flyer Preview at the bottom of Education */}
              <div className="mt-24 relative flex justify-center md:justify-start perspective-[1500px]">
                <motion.div
                  initial={{ opacity: 0, rotateX: 45, rotateZ: -10, y: 100, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotateX: 25, rotateZ: -12, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 40,
                    damping: 15,
                    delay: 0.2
                  }}
                  className="relative group cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Intense Outer Glow — Blue/Cyan */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[var(--color-creative-blue)] blur-[100px] opacity-20 group-hover:opacity-50 transition-all duration-700 -z-20 rounded-[2rem]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#06b6d4] blur-[80px] opacity-10 group-hover:opacity-40 transition-all duration-700 -z-20 rounded-[2rem]" />

                  {/* Elegant Glass Backing - perfectly sized to the flyer */}
                  <div className="absolute -inset-8 -z-10 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] transform-gpu">
                    {/* Decorative corner marks */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20" />
                    
                    {/* Subtle internal glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-creative-blue)]/20 to-[#06b6d4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                  </div>

                  {/* Main CV Flyer Link */}
                  <a href={`${import.meta.env.BASE_URL}documents/cv-tharsanan-final.pdf`} target="_blank" rel="noreferrer" className="block relative">
                    {/* Shadow under the flyer */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[110%] h-12 bg-black/50 blur-3xl rounded-[100%] scale-x-110 opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
                    
                    {/* The Flyer itself */}
                    <div className="relative w-64 md:w-80 rounded-sm overflow-hidden border-[6px] border-white shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-4">
                      <LazyImage 
                        src={`${import.meta.env.BASE_URL}images/cv/cv-tharsanan-final.png`} 
                        alt="CV Tharsanan Preview" 
                        className="w-full h-auto"
                      />
                    </div>

                    <div className="absolute -top-10 -right-10 rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110 z-30">
                      <div className="relative px-4 py-2">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl" />
                        <span className="relative text-[var(--color-creative-blue)] font-black uppercase text-[10px] tracking-widest whitespace-nowrap">
                          Voir le CV
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="relative">
            <div className="max-w-full mx-auto relative z-10">
              {/* EXPERIENCE HEADER */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 mb-16"
              >
                <div className="relative group">
                  <div className="absolute -inset-2 bg-[var(--color-creative-blue)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <Briefcase className="text-[var(--color-creative-blue)]" size={28} />
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                  <span className="text-white block mb-2 text-[1.4em]">Mon</span>
                  <span className="relative inline-block px-4 py-1">
                    <span className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-sm rotate-1 rounded-lg" />
                    <span className="relative text-[var(--color-creative-blue)]">Expérience</span>
                  </span>
                </h2>
              </motion.div>

              <div className="space-y-8 md:space-y-12 relative">
                {experiences.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-card p-5 md:p-6 group glow-card"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-creative-blue)] mb-3 block">{item.period}</span>
                    
                    <div className="mb-6">
                      <h3 className="text-lg md:text-2xl font-black mb-3 uppercase tracking-tighter text-white leading-tight">{item.title}</h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-lg md:text-xl font-black text-white/90">{item.company}</span>
                        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase text-[var(--color-creative-blue)] tracking-wider backdrop-blur-md">
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-[10px] md:text-sm mt-4 font-bold">
                        <MapPin size={14} /> {item.location}
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {item.missions.map((mission, idx) => (
                        <li key={idx} className="text-white/70 text-xs md:text-base flex items-start gap-3 font-medium leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-creative-blue)] shrink-0 shadow-[0_0_10px_var(--color-creative-blue)]" />
                          {mission}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-20 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-secondary/50 border border-white/5 text-center relative overflow-hidden group shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-accent-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-base sm:text-lg md:text-3xl font-bold mb-6 md:mb-10 italic tracking-tight leading-snug md:leading-tight">
              "L'innovation est le fruit d'une <span className="highlight">curiosité constante</span> et d'une rigueur créative."
            </h2>

            <p className="text-text-muted text-[10px] sm:text-xs md:text-lg mb-8 md:mb-12 leading-relaxed font-medium">
              Chaque étape de mon parcours a été guidée par l'envie d'apprendre et de relever des défis. 
              Je suis prêt à mettre cette expérience au service de vos projets.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                { name: "Autonomie", color: "text-[var(--color-creative-blue)]" },
                { name: "Travail d'équipe", color: "text-[var(--color-creative-blue)]" },
                { name: "Adaptabilité", color: "text-[var(--color-creative-blue)]" },
                { name: "Rigueur", color: "text-[var(--color-creative-blue)]" },
                { name: "Créativité", color: "text-[var(--color-creative-blue)]" }
              ].map(skill => (
                <Magnetic key={skill.name}>
                  <div className={`px-5 py-2.5 md:px-8 md:py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] ${skill.color} hover:bg-white/10 hover:border-white/20 transition-all cursor-default`}>
                    {skill.name}
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
