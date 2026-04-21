import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import Reveal from '../components/Reveal'
import { motion, useScroll, useTransform } from 'framer-motion'

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const length = newText.length
    const promise = new Promise(r => this.resolve = r)
    this.queue = Array.from({ length }, (_, i) => ({
      to: newText[i],
      start: Math.floor(Math.random() * 15),
      end: Math.floor(Math.random() * 15) + 15,
    }))
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let out = '', done = 0
    for (const q of this.queue) {
      if (this.frame >= q.end) { done++; out += q.to }
      else if (this.frame >= q.start) {
        out += `<span class="scramble-char">${this.chars[Math.floor(Math.random() * this.chars.length)]}</span>`
      } else out += q.to
    }
    this.el.innerHTML = out
    if (done === this.queue.length) this.resolve()
    else { this.frameRequest = requestAnimationFrame(this.update); this.frame++ }
  }
}

export default function Home() {
  const highlightRef = useRef(null)
  const descRef = useRef(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    if (highlightRef.current) {
      const orig = highlightRef.current.textContent
      setTimeout(() => new TextScramble(highlightRef.current).setText(orig), 900)
    }
    
    // Magnetic buttons
    document.querySelectorAll('.btn-primary, .btn-ghost, .project-link').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transition = 'none'
        btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`
      })
      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        btn.style.transform = ''
      })
    })

    // Tilt effects
    document.querySelectorAll('.project-card, .stat-card').forEach(card => {
      let shine = null
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.transition = 'none'
        card.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-5px) scale(1.02)`
        if (!shine) { shine = document.createElement('div'); shine.className = 'card-shine'; card.appendChild(shine) }
        shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(188,217,245,0.1) 0%, transparent 65%)`
      })
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        card.style.transform = ''
        if (shine) shine.style.background = 'none'
      })
    })

    // Counter
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-number').forEach(el => {
            const innerVal = el.textContent.replace(/\D/g, '')
            const target = parseInt(innerVal)
            if (!target) return
            let start = null
            const step = (ts) => {
              if (!start) start = ts
              const progress = Math.min((ts - start) / 1200, 1)
              const ease = 1 - Math.pow(1 - progress, 3)
              if (el.childNodes[0]) el.childNodes[0].nodeValue = Math.floor(ease * target)
              if (progress < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          })
          counterObs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.apropos-home-stats').forEach(el => counterObs.observe(el))
  }, [])

  return (
    <PageWrapper>
      {/* HERO */}
      <section className="hero" ref={containerRef}>
        <motion.div className="hero-bg" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="grid-overlay"></div>
        </motion.div>
        
        <div className="hero-content">
          <div className="hero-text">
            <Reveal delay={0.1}>
              <p className="hero-tag">BTS Communication · Design Graphique</p>
            </Reveal>
            <Reveal delay={0.2} y={50}>
              <h1 className="hero-title">
                Bonjour,<br />je suis<br /><span className="highlight" ref={highlightRef}>Tharsanan</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="hero-desc" ref={descRef}>
                Étudiant en 2ème année de BTS Communication au Lycée Jacques Brel.
                Je transforme les idées en expériences visuelles mémorables —
                identités de marque, contenus digitaux et communication visuelle. 🚀
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="hero-cta">
                <Link to="/projets" className="btn-primary">Voir mes projets</Link>
                <Link to="/contact" className="btn-ghost">Me contacter</Link>
              </div>
            </Reveal>
          </div>

          <div className="hero-image">
            <Reveal delay={0.3} y={60}>
              <div className="image-frame">
                <img src="images/ma-photo/photo-cv.png" alt="Tharsanan" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                <div className="photo-placeholder" style={{ display: 'none' }}>
                  <span>TA</span>
                </div>
                <div className="image-border"></div>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="hero-badge">
                <div className="badge-dot"></div>
                Disponible pour projets
              </div>
            </Reveal>
          </div>
        </div>
        
        <div className="scroll-hint">
          <div className="scroll-line"></div>
          Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {['Communication Visuelle','Design Graphique','Motion Design','Photoshop','Illustrator','UI/UX Design','Photographie','Storytelling'].map((t, i) => (
            <span key={i} className="marquee-item">{t}</span>
          ))}
          {['Communication Visuelle','Design Graphique','Motion Design','Photoshop','Illustrator','UI/UX Design','Photographie','Storytelling'].map((t, i) => (
            <span key={i + '2'} className="marquee-item">{t}</span>
          ))}
        </div>
      </div>

      {/* PROJETS SELECTION */}
      <section className="section">
        <Reveal>
          <div className="section-tag">Travaux récents</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-title">Projets sélectionnés</h2>
        </Reveal>

        <div className="projects-grid">
          {[
            { id: 'ux', title: 'Design UI/UX', tag: 'Web & Mobile', img: 'images/couvertures/projets-ux.png', class: 'large', desc: 'Conception de plateformes éducatives et interfaces solidaires.' },
            { id: 'futsal', title: 'Futsal Drancy', tag: 'Branding & Social', img: 'images/couvertures/futsal-drancy.png', class: 'large', desc: 'Identité visuelle et gestion de la communication pour un club de sport.' },
            { id: 'alda', title: 'Identité Alda', tag: 'Branding', img: 'images/couvertures/alda.png', desc: 'Marque de bière artisanale — Logo & Packagings.' },
            { id: 'perso', title: 'Créas Perso', tag: 'Illustration', img: 'images/couvertures/projets-crea.png', desc: 'Explorations graphiques et posters cinéma.' }
          ].map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} y={40}>
              <Link to={`/projets/${p.id}`} className={`project-card ${p.class || ''}`}>
                <div className="project-img">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <div className="project-info">
                  <span className="project-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="project-link">Voir le projet →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="voir-tout">
          <Reveal delay={0.2}>
            <Link to="/projets" className="btn-ghost">Explorer tous les projets</Link>
          </Reveal>
        </div>
      </section>

      {/* À PROPOS QUICK */}
      <section className="section apropos-home">
        <div className="apropos-home-inner">
          <div className="apropos-home-stats">
            <Reveal delay={0.1} y={30}>
              <div className="stat-card">
                <span className="stat-number">2<span className="stat-plus">+</span></span>
                <span className="stat-label">Années d'études</span>
              </div>
            </Reveal>
            <Reveal delay={0.2} y={30}>
              <div className="stat-card">
                <span className="stat-number">15<span className="stat-plus">+</span></span>
                <span className="stat-label">Projets réalisés</span>
              </div>
            </Reveal>
            <Reveal delay={0.3} y={30}>
              <div className="stat-card">
                <span className="stat-number">6<span className="stat-plus">+</span></span>
                <span className="stat-label">Outils Adobe</span>
              </div>
            </Reveal>
            <Reveal delay={0.4} y={30}>
              <div className="stat-card">
                <span className="stat-number">100<span className="stat-plus">%</span></span>
                <span className="stat-label">Passionné</span>
              </div>
            </Reveal>
          </div>
          <div className="apropos-home-text">
            <Reveal>
              <div className="section-tag">Qui suis-je ?</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">Un mélange de stratégie et de créativité.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="apropos-desc">
                Mon parcours en BTS Communication m'a permis de développer une vision 360° du design. 
                De la stratégie publicitaire à la réalisation technique sur la suite Adobe, j'accompagne mes projets 
                avec rigueur et audace esthétique.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link to="/cv" className="btn-primary">Mon parcours détaillé</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section contact-home">
        <div className="contact-home-inner">
          <div className="contact-home-text">
            <Reveal>
              <div className="section-tag">Collaboration</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">Prêt à donner vie à vos idées ?</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="apropos-desc">
                Je suis toujours ouvert à de nouvelles opportunités d'alternance, collaborations ou projets créatifs. 
                N'hésitez pas à me contacter pour discuter de votre prochain défi !
              </p>
            </Reveal>
            <div className="contact-home-links">
              <Reveal delay={0.3}>
                <a href="mailto:tharsanan.aru@gmail.com" className="contact-link">
                  <div className="link-icon">✉</div>
                  tharsanan.aru@gmail.com
                </a>
              </Reveal>
            </div>
          </div>
          <div className="contact-home-cta">
            <Reveal delay={0.4} y={20}>
              <div className="cta-box">
                <Link to="/contact" className="btn-primary" style={{ padding: '24px 60px', fontSize: '1.1rem' }}>Me contacter maintenant</Link>
                <div className="disponibilite">
                  <div className="badge-dot"></div>
                  Réponse sous 24h
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
