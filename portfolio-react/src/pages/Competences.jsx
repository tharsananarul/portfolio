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
        <div className="comp-block reveal" style={{ marginTop: 100, paddingTop: 80, borderTop: '1px solid var(--border)' }}>
          <p className="section-tag">Soft skills</p>
          <h2 className="section-title">Savoir-être <span className="highlight">&amp; faire</span></h2>
          <div className="savoir-grid">
            {[
              { icon: '🔍', name: 'Veille & curiosité', desc: "Toujours à l'affût des dernières tendances créatives et digitales." },
              { icon: '🤝', name: 'Travail en équipe', desc: 'Expérience en projets collectifs, coordination et collaboration active.' },
              { icon: '📊', name: 'Analyse digitale', desc: "Suivi des performances, analyse d'engagement sur les réseaux sociaux." },
              { icon: '🛠️', name: 'Maîtrise des outils', desc: 'À l\'aise avec les logiciels de création, de communication et de gestion.' },
            ].map((s) => (
              <div className="savoir-card reveal" key={s.name}>
                <div className="savoir-icon">{s.icon}</div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LANGUES */}
        <div className="comp-block reveal" style={{ marginTop: 100, paddingTop: 80, borderTop: '1px solid var(--border)' }}>
          <p className="section-tag">Communication internationale</p>
          <h2 className="section-title">Langues <span className="highlight">parlées</span></h2>
          <div className="langues-grid">
            <div className="langue-card reveal">
              <div className="langue-flag"><img src="https://flagcdn.com/w40/fr.png" alt="France" /></div>
              <div className="langue-info">
                <h3>Français</h3>
                <span className="langue-niveau">Bilingue — C2</span>
                <div className="skill-bar"><div className="skill-bar-fill" style={{ width: '100%' }}></div></div>
              </div>
            </div>
            <div className="langue-card reveal delay-1">
              <div className="langue-flag"><img src="https://flagcdn.com/w40/gb.png" alt="Royaume-Uni" /></div>
              <div className="langue-info">
                <h3>Anglais</h3>
                <span className="langue-niveau">Intermédiaire — B2</span>
                <div className="skill-bar"><div className="skill-bar-fill" style={{ width: '70%' }}></div></div>
              </div>
            </div>
            <div className="langue-card reveal delay-2">
              <div className="langue-flag"><img src="images/te-flag/tamil-eelam.png" alt="Tamoul" style={{ width: 42, height: 28, objectFit: 'cover', borderRadius: 4 }} /></div>
              <div className="langue-info">
                <h3>Tamoul</h3>
                <span className="langue-niveau">Langue maternelle — C2</span>
                <div className="skill-bar"><div className="skill-bar-fill" style={{ width: '100%' }}></div></div>
              </div>
            </div>
            <div className="langue-card reveal">
              <div className="langue-flag"><img src="https://flagcdn.com/w40/de.png" alt="Allemagne" /></div>
              <div className="langue-info">
                <h3>Allemand</h3>
                <span className="langue-niveau">Débutant — A1</span>
                <div className="skill-bar"><div className="skill-bar-fill" style={{ width: '15%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
