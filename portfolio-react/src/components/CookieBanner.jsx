import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, ShieldAlert, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Magnetic from './Magnetic'

export default function CookieBanner() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if consent has already been given or declined
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay before showing the banner for a premium feel
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
        >
          {/* Glassmorphic Card Container */}
          <div className="relative overflow-hidden p-6 rounded-[2rem] bg-slate-950/85 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4">
            
            {/* Ambient Purple Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-creative-blue)]/10 blur-[50px] rounded-full pointer-events-none -z-10" />

            {/* Header info */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[var(--color-creative-blue)] shadow-inner flex-shrink-0">
                <Cookie size={24} className="animate-spin-slow" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black uppercase tracking-wider text-white">RGPD & Cookies</h4>
                <p className="text-xs text-white/70 leading-relaxed font-medium">
                  {t('cookie_banner.text')}{' '}
                  <Link 
                    to="/legal" 
                    onClick={() => setIsVisible(false)}
                    className="text-[var(--color-creative-blue)] hover:text-white underline font-bold transition-colors"
                  >
                    {t('cookie_banner.more_info')}
                  </Link>
                </p>
              </div>
            </div>

            {/* Button Actions */}
            <div className="flex items-center gap-3 mt-1 ml-auto">
              <button 
                onClick={handleDecline}
                className="px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-all cursor-pointer border border-white/5 bg-white/[0.02] hover:bg-white/[0.06]"
              >
                {t('cookie_banner.decline')}
              </button>
              
              <Magnetic>
                <button 
                  onClick={handleAccept}
                  className="px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-[var(--color-creative-blue)] text-white hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all cursor-pointer border-none"
                >
                  {t('cookie_banner.accept')}
                </button>
              </Magnetic>
            </div>
            
            {/* Small Close Button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-1 text-white/30 hover:text-white transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X size={14} />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
