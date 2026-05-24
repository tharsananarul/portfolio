import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Send, MessageSquare, Phone, Sparkles, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import Magnetic from '../components/Magnetic'
import PageHero from '../components/PageHero'
import { useToast } from '../hooks/useToast'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle, sending, success, error
  const linkedinUrl = "https://www.linkedin.com/in/tharsanan-arulananthaselvam/"
  const toast = useToast()

  const handleSubmit = (e) => {
    // On laisse le formulaire s'envoyer normalement pour une fiabilité maximale
    setStatus('sending');
    toast("Envoi de votre message...", "info");
  }

  return (
    <main className="relative pb-20 bg-gradient-to-b from-primary via-blue-900/10 to-primary min-h-screen overflow-hidden">
      <PageHero
        tag="Contact"
        title={<span className="flex flex-col"><span>Parlons de votre</span> <span className="text-[var(--color-creative-blue)] -mt-2 md:-mt-5" style={{ WebkitTextStroke: '1px white' }}>prochain projet.</span></span>}
        subtitle="Que vous ayez une idée précise ou que vous souhaitiez explorer des possibilités, je suis là pour vous accompagner."
        compact
        themeColor="blue"
      />



      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>


      <section className="section-container relative z-10">
        {/* Section Color Blobs */}
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[var(--color-creative-blue)] rounded-full blur-[140px] opacity-[0.05] -z-10" />

        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left Column: Info */}
          <div>
            <div className="space-y-8 relative">
                <div className="hidden md:block sticker-shape sticker-cyan absolute -top-6 -right-4 rotate-[-5deg] z-20">Network</div>


              {[
                { icon: <Mail />, label: "Email", val: "tharsananarul@gmail.com", href: "mailto:tharsananarul@gmail.com" },
                { icon: <Linkedin />, label: "LinkedIn", val: "Tharsanan Arul", href: linkedinUrl },
                { icon: <Phone />, label: "Téléphone", val: "07 49 87 87 75", href: "tel:+33749878775" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.8 }}
                >
                  <Magnetic>
                    <a href={item.href} target={item.href.startsWith('http') ? "_blank" : "_self"} rel="noreferrer" className="flex items-center gap-4 sm:gap-6 group">
                      <div className="shrink-0 p-3 sm:p-4 rounded-none bg-white border-4 border-black group-hover:bg-[var(--color-creative-blue)] transition-all shadow-[6px_6px_0_0_#000] group-hover:scale-110 duration-500">
                        <div className="text-black group-hover:text-white">{item.icon}</div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-white font-black uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-sm sm:text-base md:text-lg font-black text-white group-hover:text-[var(--color-creative-blue)] transition-colors tracking-tight truncate">{item.val}</p>
                      </div>
                    </a>
                  </Magnetic>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 md:p-16 glow-card"
          >
            <div className="absolute top-0 right-0 p-8 text-white/5 -rotate-12 translate-x-4 -translate-y-4">
              <MessageSquare size={160} />
            </div>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative z-10 flex flex-col items-center justify-center py-20 text-center space-y-6"
                >
                  <div className="p-8 rounded-full bg-[var(--color-creative-blue)]/20 text-[var(--color-creative-blue)] shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                    <CheckCircle2 size={80} />
                  </div>
                  <h3 className="text-4xl font-bold">Message envoyé !</h3>
                  <p className="text-text-muted max-w-sm mx-auto text-lg">Merci pour votre message. Je reviens vers vous très rapidement.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-[var(--color-creative-blue)] font-bold hover:underline mt-6 text-lg"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 space-y-10"
                  action="https://formsubmit.co/tharsananarul@gmail.com"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://tharsanan.com/contact.html" />
                  <input type="hidden" name="_subject" value="Nouveau message Portfolio !" />
                  
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85 px-1">Nom complet</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="Marcel Dubois"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:bg-white/[0.08] focus:border-[var(--color-creative-blue)]/50 transition-all text-white font-bold placeholder:text-white/45"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85 px-1">Email</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="marcel@dubois.fr"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:bg-white/[0.08] focus:border-[var(--color-creative-blue)]/50 transition-all text-white font-bold placeholder:text-white/45"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85 px-1">Sujet</label>
                    <input 
                      name="subject"
                      type="text" 
                      placeholder="Collaboration, Opportunité, Question..."
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:bg-white/[0.08] focus:border-[var(--color-creative-blue)]/50 transition-all text-white font-bold placeholder:text-white/45"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85 px-1">Message</label>
                    <textarea 
                      required
                      name="message"
                      rows="5"
                      placeholder="Comment puis-je vous aider ?"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:bg-white/[0.08] focus:border-[var(--color-creative-blue)]/50 transition-all text-white font-bold placeholder:text-white/45 resize-none"
                    ></textarea>
                  </div>

                  <Magnetic>
                    <button 
                      type="submit" 
                      disabled={status === 'sending'}
                      className="btn-premium w-full gap-3 text-lg py-6 shadow-2xl group disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[var(--color-creative-blue)] to-blue-600 !text-white border-none"
                    >
                      {status === 'sending' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message 
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </Magnetic>
                  {status === 'error' && (
                    <p className="text-red-400 text-xs text-center">Une erreur est survenue. Veuillez réessayer.</p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
