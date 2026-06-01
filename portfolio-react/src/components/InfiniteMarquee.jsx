import { motion } from 'framer-motion'

import { Sparkles, Star, Zap } from 'lucide-react'

const skills = [
  "Photoshop", "Illustrator", "After Effects", "InDesign", 
  "HTML5", "CSS3", "React.js", "Figma", "Premiere Pro", 
  "UI/UX Design", "Communication Strategique"
]

const icons = [Sparkles, Star, Zap]

export default function InfiniteMarquee() {
  return (
    <div className="py-5 sm:py-6 md:py-12 overflow-hidden bg-[var(--color-creative-blue)] relative border-y-4 border-black shadow-[0_10px_30px_rgba(14,165,233,0.3)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-plus-pattern opacity-[0.05] pointer-events-none" />
      
      <div className="w-full overflow-hidden whitespace-nowrap select-none">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex flex-row flex-nowrap shrink-0 items-center gap-16 md:gap-24 pr-16 md:pr-24 w-max"
        >
          {[...skills, ...skills].map((skill, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div key={i} className="flex flex-row flex-nowrap shrink-0 items-center gap-16 md:gap-24 group whitespace-nowrap">
                <span className="text-sm sm:text-lg md:text-2xl font-black uppercase tracking-widest text-black font-heading transition-all duration-500 group-hover:scale-110 whitespace-nowrap shrink-0">
                  {skill}
                </span>
                <Icon className="text-black/30 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Decorative gradient overlays for smooth fade */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[var(--color-creative-blue)] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[var(--color-creative-blue)] to-transparent z-10" />
    </div>
  )
}
