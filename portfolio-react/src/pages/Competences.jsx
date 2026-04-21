import PageWrapper from '../components/PageWrapper'
import Reveal from '../components/Reveal'
import { motion } from 'framer-motion'

export default function Competences() {



  return (
    <PageWrapper>
      <section className="page-hero">
        <div className="hero-bg"><div className="blob blob-1"></div><div className="grid-overlay"></div></div>
        <div className="page-hero-content">
          <Reveal delay={0.1}>
            <p className="section-tag">Ce que je sais faire</p>
          </Reveal>
          <Reveal delay={0.2} y={50}>
            <h1 className="page-hero-title">Mes <span className="highlight">compétences</span></h1>
          </Reveal>
        </div>
      </section>

      <section className="section competences-page">
        {/* LOGICIELS */}
        <div className="comp-block">
          <Reveal>
            <p className="section-tag">Outils &amp; Logiciels</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title">Logiciels <span className="highlight">maîtrisés</span></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="apropos-desc" style={{ maxWidth: 700, marginBottom: 48 }}>
              Maîtrise des logiciels de création (Photoshop, Illustrator, InDesign, Canva) et compétences en montage vidéo
              (Premiere Pro, After Effects), animation (Animate) ainsi que des connaissances en rédaction pour WordPress.
              Compétences en développement web avec HTML et CSS.
            </p>
          </Reveal>
          <div className="logiciels-grid">
            {[
              { icon: 'Ps', cls: 'ps', name: 'Photoshop', desc: 'Retouche photo, montage, création visuelle', pct: 85 },
              { icon: 'Ai', cls: 'ai', name: 'Illustrator', desc: 'Création vectorielle, logos, affiches', pct: 80 },
              { icon: 'Id', cls: 'id', name: 'InDesign', desc: 'Mise en page, supports print', pct: 60 },
              { icon: 'Ca', cls: 'canva', name: 'Canva', desc: 'Création rapide de visuels digitaux', pct: 100 },
              { icon: 'Pr', cls: 'pr', name: 'Premiere Pro', desc: 'Montage vidéo, édition', pct: 75 },
              { icon: 'Ae', cls: 'ae', name: 'After Effects', desc: 'Motion design, animations', pct: 65 },
              { icon: 'An', cls: 'an', name: 'Animate', desc: 'Animation 2D', pct: 50 },
              { icon: 'WP', cls: 'wp', name: 'WordPress', desc: 'Rédaction et gestion de contenu', pct: 55 },
              { icon: '</>', cls: 'html', name: 'HTML & CSS', desc: 'Développement web front-end', pct: 70 },
            ].map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05} y={30}>
                <div className="logiciel-card">
                  <div className={`logiciel-icon ${s.cls}`}>{s.icon}</div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-bar-fill" 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.05 }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* SAVOIR-ÊTRE */}
        <div className="comp-block" style={{ marginTop: 100, paddingTop: 80, borderTop: '1px solid var(--border)' }}>
          <Reveal>
            <p className="section-tag">Soft skills</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title">Savoir-être <span className="highlight">&amp; faire</span></h2>
          </Reveal>
          <div className="savoir-grid">
            {[
              { icon: '🔍', name: 'Veille & curiosité', desc: "Toujours à l'affût des dernières tendances créatives et digitales." },
              { icon: '🤝', name: 'Travail en équipe', desc: 'Expérience en projets collectifs, coordination et collaboration active.' },
              { icon: '📊', name: 'Analyse digitale', desc: "Suivi des performances, analyse d'engagement sur les réseaux sociaux." },
              { icon: '🛠️', name: 'Maîtrise des outils', desc: 'À l\'aise avec les logiciels de création, de communication et de gestion.' },
            ].map((s, i) => (
              <Reveal key={s.name} delay={0.2 + i * 0.05} y={20}>
                <div className="savoir-card">
                  <div className="savoir-icon">{s.icon}</div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* LANGUES */}
        <div className="comp-block" style={{ marginTop: 100, paddingTop: 80, borderTop: '1px solid var(--border)' }}>
          <Reveal>
            <p className="section-tag">Communication internationale</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title">Langues <span className="highlight">parlées</span></h2>
          </Reveal>
          <div className="langues-grid">
            {[
              { flag: 'https://flagcdn.com/w40/fr.png', name: 'Français', level: 'Bilingue — C2', pct: '100%' },
              { flag: 'https://flagcdn.com/w40/gb.png', name: 'Anglais', level: 'Intermédiaire — B2', pct: '70%', delay: 0.1 },
              { flag: 'images/te-flag/tamil-eelam.png', name: 'Tamoul', level: 'Langue maternelle — C2', pct: '100%', delay: 0.2 },
              { flag: 'https://flagcdn.com/w40/de.png', name: 'Allemand', level: 'Débutant — A1', pct: '15%', delay: 0.3 }
            ].map((l, i) => (
              <Reveal key={l.name} delay={0.2 + (l.delay || 0)} y={20}>
                <div className="langue-card">
                  <div className="langue-flag"><img src={l.flag} alt={l.name} /></div>
                  <div className="langue-info">
                    <h3>{l.name}</h3>
                    <span className="langue-niveau">{l.level}</span>
                    <div className="skill-bar"><div className="skill-bar-fill" style={{ width: l.pct }}></div></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
