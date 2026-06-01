import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Send, MessageSquare, Phone, Sparkles, CheckCircle2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import Magnetic from '../components/Magnetic'
import PageHero from '../components/PageHero'
import { useToast } from '../hooks/useToast'

// ── Custom Interactive Floating Input ────────────────────────────────────────
function FloatingInput({ label, name, type = "text", required = false }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState("")

  const isFloating = focused || value.length > 0

  return (
    <div className="relative w-full">
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-[#0d1225]/50 border border-white/20 rounded-2xl px-6 pt-7 pb-3 focus:outline-none focus:bg-[#0d1225]/85 focus:border-[var(--color-creative-blue)] focus:shadow-[0_0_25px_rgba(14,165,233,0.15)] transition-all text-white font-semibold placeholder:text-transparent"
        placeholder=" "
      />
      <label
        className={`absolute left-6 pointer-events-none transition-all duration-300 font-bold uppercase tracking-wider ${
          isFloating
            ? 'top-2.5 text-[9px] text-sky-400'
            : 'top-[22px] text-[11px] text-white/60'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

// ── Custom Interactive Floating Textarea ─────────────────────────────────────
function FloatingTextarea({ label, name, required = false, rows = 5 }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState("")

  const isFloating = focused || value.length > 0

  return (
    <div className="relative w-full">
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={rows}
        className="w-full bg-[#0d1225]/50 border border-white/20 rounded-2xl px-6 pt-8 pb-3 focus:outline-none focus:bg-[#0d1225]/85 focus:border-[var(--color-creative-blue)] focus:shadow-[0_0_25px_rgba(14,165,233,0.15)] transition-all text-white font-semibold placeholder:text-transparent resize-none"
        placeholder=" "
      />
      <label
        className={`absolute left-6 pointer-events-none transition-all duration-300 font-bold uppercase tracking-wider ${
          isFloating
            ? 'top-2.5 text-[9px] text-sky-400'
            : 'top-6 text-[11px] text-white/60'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

// ── Custom Interactive Info Card ─────────────────────────────────────────────
function ContactCard({ icon, label, val, href }) {
  const [copied, setCopied] = useState(false)
  const isCopyable = label === "Email" || label === "Téléphone"

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.position = "fixed"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Fallback copy failed', err)
    }
    document.body.removeChild(textArea)
  }

  const handleCopy = (e) => {
    if (!isCopyable) return
    e.preventDefault()
    e.stopPropagation()
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(val).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }).catch(err => {
        console.error("Failed to copy using navigator: ", err)
        fallbackCopyText(val)
      })
    } else {
      fallbackCopyText(val)
    }
  }

  return (
    <Magnetic>
      <div 
        className="flex items-center justify-between p-6 rounded-3xl bg-[#0d1225]/45 border border-white/10 hover:border-sky-400/30 hover:bg-[#0d1225]/60 transition-all duration-500 group shadow-lg hover:shadow-[0_10px_35px_rgba(14,165,233,0.06)] transform hover:-translate-y-1 relative overflow-hidden"
      >
        {/* Glow backdrop behind icon */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 h-32 bg-sky-400/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <a 
          href={href} 
          target={href.startsWith('http') ? "_blank" : "_self"} 
          rel="noreferrer" 
          className="flex items-center gap-5 min-w-0 z-10 flex-grow cursor-pointer"
        >
          <div className="shrink-0 p-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 group-hover:bg-gradient-to-br group-hover:from-sky-400 group-hover:to-blue-600 group-hover:text-white group-hover:scale-105 group-hover:border-transparent transition-all duration-500 shadow-md">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm sm:text-base md:text-lg font-black text-white group-hover:text-sky-400 transition-colors tracking-tight truncate">{val}</p>
          </div>
        </a>

        {isCopyable && (
          <button 
            onClick={handleCopy}
            className="z-20 shrink-0 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white transition-all duration-300 ml-4 relative cursor-pointer"
            title="Copier dans le presse-papiers"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          </button>
        )}
      </div>
    </Magnetic>
  )
}

// ── Contact Main Component ───────────────────────────────────────────────────
export default function Contact() {
  const [status, setStatus] = useState('idle') // idle, sending, success, error
  const linkedinUrl = "https://www.linkedin.com/in/tharsanan-arulananthaselvam/"
  const toast = useToast()

  const handleSubmit = (e) => {
    setStatus('sending')
    toast("Envoi de votre message…", "info")
  }

  return (
    <main className="relative pb-20 bg-transparent min-h-screen overflow-hidden">
      <PageHero
        tag="Contact"
        title={<span className="flex flex-col"><span>Parlons de votre</span> <span className="text-[var(--color-creative-blue)] -mt-2 md:-mt-5" style={{ WebkitTextStroke: '1px white' }}>prochain projet.</span></span>}
        subtitle="Que vous ayez une idée précise ou que vous souhaitiez explorer des possibilités, je suis là pour vous accompagner."
        compact
        themeColor="blue"
      />

      <section className="section-container relative z-10">
        {/* Glow Blobs for ambient modern feel */}
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[var(--color-creative-blue)] rounded-full blur-[160px] opacity-[0.06] -z-10" />
        <div className="absolute bottom-[10%] left-[-15%] w-[40vw] h-[40vw] bg-[var(--color-creative-blue)]/50 rounded-full blur-[160px] opacity-[0.04] -z-10" />

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Cards */}
          <div className="space-y-6 relative">
            <div className="hidden md:block sticker-shape sticker-blue-dark absolute -top-8 -left-4 rotate-[-6deg] z-20 shadow-lg">Network</div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="space-y-5"
            >
              <ContactCard icon={<Mail size={22} />} label="Email" val="tharsananarul@gmail.com" href="mailto:tharsananarul@gmail.com" />
              <ContactCard icon={<Linkedin size={22} />} label="LinkedIn" val="Tharsanan Arul" href={linkedinUrl} />
              <ContactCard icon={<Phone size={22} />} label="Téléphone" val="07 49 87 87 75" href="tel:+33749878775" />
            </motion.div>
          </div>

          {/* Right Column: Premium Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 md:p-14 glow-card relative"
          >
            <div className="absolute top-0 right-0 p-8 text-white/[0.015] -rotate-12 translate-x-4 -translate-y-4 pointer-events-none select-none">
              <MessageSquare size={160} />
            </div>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative z-10 flex flex-col items-center justify-center py-16 text-center space-y-6"
                >
                  <div className="p-7 rounded-full bg-[var(--color-creative-blue)]/20 text-[var(--color-creative-blue)] shadow-[0_0_40px_rgba(14,165,233,0.3)] animate-pulse">
                    <CheckCircle2 size={72} />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white">Message envoyé !</h3>
                  <p className="text-text-muted max-w-sm mx-auto text-base font-medium">Merci pour votre message. Je reviens vers vous très rapidement.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-[var(--color-creative-blue)] font-bold hover:text-white transition-colors mt-6 text-sm uppercase tracking-widest border border-[var(--color-creative-blue)]/30 hover:border-white px-6 py-3 rounded-full bg-white/5"
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
                  className="relative z-10 space-y-6"
                  action="https://formsubmit.co/tharsananarul@gmail.com"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://tharsanan.com/contact.html" />
                  <input type="hidden" name="_subject" value="Nouveau message Portfolio !" />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput label="Nom complet" name="name" type="text" required />
                    <FloatingInput label="Email" name="email" type="email" required />
                  </div>

                  <FloatingInput label="Sujet" name="subject" type="text" />
                  <FloatingTextarea label="Message" name="message" required rows={5} />

                  <div className="pt-2">
                    <Magnetic>
                      <button 
                        type="submit" 
                        disabled={status === 'sending'}
                        className="btn-premium-orange w-full gap-3 text-sm py-5 shadow-2xl group disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer"
                      >
                        {status === 'sending' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Envoi en cours…
                          </>
                        ) : (
                          <>
                            Envoyer le message 
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-red-400 text-xs text-center font-bold">Une erreur est survenue. Veuillez réessayer.</p>
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
