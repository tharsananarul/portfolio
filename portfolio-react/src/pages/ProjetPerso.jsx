import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import useReveal from '../hooks/useReveal'

export default function ProjetPerso() {
  useReveal()
  return (
    <PageWrapper>
      <div className="projet-hero-wrap">
        <img src="images/couvertures/projets-crea.png" alt="Créations personnelles" />
        <div className="projet-hero-overlay"></div>
        <h1 className="projet-hero-title">Créations personnelles</h1>
      </div>
      <div className="projet-intro">
        <div className="projet-intro-left">
          <h2>Intro</h2>
          <p>Voici quelques-unes de mes créations réalisées principalement avec Photoshop. Ma passion pour le cinéma sud-indien se reflète particulièrement à travers ces œuvres — designs et posters réalisés pendant mes moments de loisirs. J'ai également réalisé une vidéo pour promouvoir le salon des sciences Terra Scientifica dans le cadre de mon rôle de community manager bénévole.</p>
          <br /><h2>Livrables</h2>
          <div className="projet-deliverables">
            {['Illustrations','Posters cinéma','Retouche photo','Montage vidéo','Community management'].map(t => <span className="deliverable-tag" key={t}>{t}</span>)}
          </div>
        </div>
        <div className="projet-intro-right">
          <div className="projet-meta-block"><span>Type</span><p>Illustrations, Posters, Vidéo</p></div>
          <div className="projet-meta-block"><span>Outils</span><p>Photoshop, Premiere Pro</p></div>
          <div className="projet-meta-block"><span>Contexte</span><p>Loisirs &amp; Terra Scientifica</p></div>
        </div>
      </div>

      <div style={{ background: '#080e1a', paddingBottom: 32 }}>
        <p className="section-label">Posters &amp; Illustrations</p>
        <div className="projet-img-full">
          <img src="images/projets-crea/captain-miller.png" alt="Captain Miller" />
        </div>
        <div className="projet-img-grid">
          <div className="projet-img-full"><img src="images/projets-crea/kok-poster.jpg" alt="KOK Poster" /></div>
          <div className="projet-img-full"><img src="images/projets-crea/kok-car.png" alt="KOK Car" /></div>
        </div>
        <div className="projet-img-grid">
          <div className="projet-img-full"><img src="images/projets-crea/cover-magazine.jpeg" alt="Cover magazine" /></div>
          <div className="projet-img-full"><img src="images/projets-crea/animal.png" alt="Animal" /></div>
        </div>

        <p className="section-label">Vidéo — Terra Scientifica</p>
        <div className="projet-video-wrap">
          <iframe
            src="https://www.youtube.com/embed/qN8Iw006glU"
            title="Terra Scientifica — Vidéo promotionnelle"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="projet-next">
        <p>Projet suivant</p>
        <div className="projet-next-cards">
          <Link to="/projets/futsal" className="projet-next-card">
            <img src="images/couvertures/futsal-drancy.png" alt="Futsal Drancy" />
            <div className="projet-next-card-info">Futsal Drancy →</div>
          </Link>
          <Link to="/projets" className="projet-next-card">
            <img src="images/couvertures/bts-com.png" alt="Tous les projets" />
            <div className="projet-next-card-info">Tous les projets →</div>
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}
