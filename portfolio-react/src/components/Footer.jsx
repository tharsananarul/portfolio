import { Link } from 'react-router-dom'
import { Github, Linkedin, ArrowUp } from 'lucide-react'

export default function Footer() {
  const linkedinUrl = "https://www.linkedin.com/in/tharsanan-arulananthaselvam/"
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#01081a] pt-16 pb-12 relative z-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-[240px]">
            <Link to="/" className="logo mb-6 p-2 inline-flex items-center justify-center bg-white border-2 border-black shadow-[3px_3px_0_0_#000] rotate-[-2deg] hover:rotate-0 transition-all font-black text-2xl md:text-3xl uppercase tracking-tighter text-black">
              T<span className="text-[var(--color-creative-blue)]">.</span>
            </Link>
            <p className="text-white/50 text-caption leading-relaxed mb-6">
              Étudiant en BTS Communication. 
              Digital & Design graphique.
            </p>
            <div className="flex items-center gap-6">
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-[var(--color-creative-blue)] transition-all duration-300 drop-shadow-[0_0_8px_rgba(14,165,233,0.8)] hover:scale-110" title="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/tharsananarul" target="_blank" rel="noreferrer" className="text-[var(--color-creative-orange)] transition-all duration-300 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] hover:scale-110" title="GitHub">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div className="flex gap-16 md:gap-24">
            <div>
              <h4 className="text-white font-bold text-caption uppercase tracking-[0.2em] mb-6 opacity-30">Navigation</h4>
              <ul className="space-y-3 text-white/70 text-caption font-medium">
                <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/projets" className="hover:text-white transition-colors">Projets</Link></li>
                <li><Link to="/cv" className="hover:text-white transition-colors">CV</Link></li>
                <li><Link to="/competences" className="hover:text-white transition-colors">Compétences</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-caption uppercase tracking-[0.2em] mb-6 opacity-30">Contact</h4>
              <ul className="space-y-3 text-white/70 text-caption font-medium">
                <li><a href="mailto:tharsananarul@gmail.com" className="hover:text-white transition-colors">Email</a></li>
                <li><a href="tel:0749878775" className="hover:text-white transition-colors">07 49 87 87 75</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <p className="text-caption text-white/30 font-medium tracking-wider uppercase">
            © 2026 Tharsanan Arul. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-caption font-bold text-white/30 hover:text-white transition-colors group uppercase tracking-widest"
          >
            Scroll to top 
            <div className="p-1.5 rounded-full border border-white/5 group-hover:bg-white/5 transition-all">
              <ArrowUp size={12} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
