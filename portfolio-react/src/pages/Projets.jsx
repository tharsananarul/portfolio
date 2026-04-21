import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import Reveal from '../components/Reveal'
import { motion } from 'framer-motion'

export default function Projets() {
  return (
    <PageWrapper>
      <section className="page-hero">
        <div className="hero-bg">
          <div className="blob blob-1"></div>
          <div className="grid-overlay"></div>
        </div>
        <div className="page-hero-content">
          <Reveal>
            <p className="section-tag">Mon travail</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="page-hero-title">Mes <span className="highlight">projets</span></h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="page-hero-desc">Explorez ma sélection de travaux en communication, design graphique et UI/UX.</p>
          </Reveal>
        </div>
      </section>

      <section className="section projets-page">

        {/* UI/UX */}
        <div className="projets-categorie">
          <Reveal>
            <p className="section-tag">Conception Digitale &amp; Web</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title">UI/UX <span className="highlight">Works</span></h2>
          </Reveal>
        </div>
        
        <div className="projects-grid" style={{ maxWidth: 1200, margin: '0 auto 100px' }}>
          <Reveal delay={0.2} y={50}>
            <Link to="/projets/ux" className="project-card large">
              <div className="project-img">
                <img src="images/couvertures/ui-ux-designs.png" alt="UI/UX Designs" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} />
                <div className="img-placeholder" style={{ display:'none' }}><span>UI/UX WORKS</span></div>
              </div>
              <div className="project-info">
                <span className="project-tag">Digital Design &amp; Interface</span>
                <h3>UI/UX Design</h3>
                <p>Développement de plateformes interactives et conception de maquettes d'interfaces modernes.</p>
                <div className="project-link">Découvrir les travaux →</div>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* FUTSAL */}
        <div className="projets-categorie">
          <Reveal>
            <p className="section-tag">Expérience professionnelle</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title">Futsal <span className="highlight">Drancy</span></h2>
          </Reveal>
        </div>
        
        <div className="projects-grid" style={{ maxWidth: 1200, margin: '0 auto 100px' }}>
          <Reveal delay={0.2} y={50}>
            <Link to="/projets/futsal" className="project-card large">
              <div className="project-img">
                <img src="images/couvertures/futsal-drancy.png" alt="Futsal Drancy" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} />
                <div className="img-placeholder p1" style={{ display:'none' }}><span>Futsal Drancy</span></div>
              </div>
              <div className="project-info">
                <span className="project-tag">Communication · Bénévole · Alternance</span>
                <h3>Direction Artistique &amp; Réseaux Sociaux</h3>
                <p>Création de supports visuels, gestion des réseaux sociaux et communication événementielle pour le club.</p>
                <div className="project-link">Consulter le dossier →</div>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* BTS COM */}
        <div className="projets-categorie">
          <Reveal>
            <p className="section-tag">Formation</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title">BTS <span className="highlight">Communication</span></h2>
          </Reveal>
        </div>
        
        <div className="projets-mini-grid" style={{ maxWidth: 1200, margin: '0 auto 100px' }}>
          <Reveal delay={0.2} y={40}>
            <Link to="/projets/bts-com" className="project-card">
              <div className="project-img">
                <img src="images/couvertures/bts-com.png" alt="BTS Com" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} />
                <div className="img-placeholder p2" style={{ display:'none' }}><span>BTS Com</span></div>
              </div>
              <div className="project-info">
                <span className="project-tag">BTS Communication</span>
                <h3>Travaux Pratiques</h3>
                <p>Affiches et mockups conçus avec Illustrator et Photoshop au Lycée Jacques Brel.</p>
                <div className="project-link">Voir les livrables →</div>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* UNIVERSITAIRES */}
        <div className="projets-categorie">
          <Reveal>
            <p className="section-tag">Archives BUT MMI</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title">Projets <span className="highlight">Académiques</span></h2>
          </Reveal>
        </div>
        
        <div className="projets-mini-grid" style={{ maxWidth: 1200, margin: '0 auto 100px' }}>
          <Reveal delay={0.2} y={40}>
            <Link to="/projets/alda" className="project-card">
              <div className="project-img">
                <img src="images/couvertures/alda.png" alt="Alda" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} />
                <div className="img-placeholder p3" style={{ display:'none' }}><span>Alda</span></div>
              </div>
              <div className="project-info">
                <span className="project-tag">Branding · Marque de bière</span>
                <h3>Alda Identity</h3>
                <p>Création d'une identité visuelle complète — logo, site web et packagings.</p>
                <div className="project-link">Voir le projet →</div>
              </div>
            </Link>
          </Reveal>
          
          <Reveal delay={0.3} y={40}>
            <Link to="/projets/sans-bavures" className="project-card">
              <div className="project-img">
                <img src="images/couvertures/sansbavures.png" alt="Sans Bavures" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} />
                <div className="img-placeholder p4" style={{ display:'none' }}><span>Sans Bavures</span></div>
              </div>
              <div className="project-info">
                <span className="project-tag">Association · Stratégie</span>
                <h3>Sans Bavures</h3>
                <p>Identité visuelle et stratégie de communication engagée contre les abus policiers.</p>
                <div className="project-link">Voir le projet →</div>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* PERSO */}
        <div className="projets-categorie reveal">
          <p className="section-tag">Hors cursus</p>
          <h2 className="section-title">Créations <span className="highlight">personnelles</span></h2>
        </div>
        <div className="projets-mini-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="project-card reveal" onClick={() => window.location.hash = '#/projets/perso'} style={{ cursor: 'pointer' }}>
            <div className="project-img">
              <img src="images/couvertures/projets-crea.png" alt="Créations personnelles" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} />
              <div className="img-placeholder p1" style={{ display:'none' }}><span>Créations</span></div>
            </div>
            <div className="project-info">
              <span className="project-tag">Illustrations · Posters · Vidéo</span>
              <h3>Projets créatifs personnels</h3>
              <p>Posters cinéma sud-indien, illustrations et vidéo Terra Scientifica réalisés avec Photoshop.</p>
              <Link to="/projets/perso" className="project-link">Voir le projet →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="cta-box reveal">
          <p className="section-tag">Tu as un projet ?</p>
          <h2 className="section-title">Travaillons <span className="highlight">ensemble</span></h2>
          <Link to="/contact" className="btn-primary">Me contacter</Link>
        </div>
      </section>
    </PageWrapper>
  )
}
