import { motion } from 'framer-motion'
import ThreeBackground from './ThreeBackground'

export default function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#060a18]">
      {/* 3D ArcAura Engine */}
      <ThreeBackground />

      {/* Subtle Grain Texture - Reduced for a cleaner look */}
      <div className="absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none z-10" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060a18]/20 to-[#060a18]" />
    </div>
  )
}
