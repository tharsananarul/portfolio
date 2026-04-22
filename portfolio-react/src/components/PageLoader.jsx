import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 100)

    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        document.body.style.overflow = ''
      }, 500)
      return () => clearTimeout(timer)
    }

    return () => clearInterval(interval)
  }, [progress])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[200] bg-primary flex items-center justify-center p-6"
        >
          <div className="flex flex-col items-center gap-8 w-full max-w-xs">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-heading font-extrabold tracking-tighter"
            >
              T<span className="text-accent">.</span>
            </motion.div>
            
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            
            <motion.span 
              className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Chargement de l'univers
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
