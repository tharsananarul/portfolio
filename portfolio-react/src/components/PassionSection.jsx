import { motion, AnimatePresence } from 'framer-motion'
import { Bike, Camera, Car, Zap, ArrowRight, X } from 'lucide-react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Float, Environment } from '@react-three/drei'

function Car3D() {
  const baseUrl = import.meta.env.BASE_URL
  const texture = useLoader(THREE.TextureLoader, `${baseUrl}images/bmw_premium_bg.png`)
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={meshRef} scale={2.5}>
        <planeGeometry args={[16, 16]} />
        <meshBasicMaterial map={texture} transparent opacity={0.3} />
      </mesh>
    </Float>
  )
}

const passions = [
  {
    id: "bmw",
    title: "BMW & Design",
    subtitle: "Ingénierie & Performance",
    desc: "Passionné par les lignes de la marque à l'hélice, je vois dans chaque modèle une fusion parfaite entre technologie de pointe et esthétique pure.",
    icon: Car,
    color: "text-blue-400",
    bg: "rgba(37, 99, 235, 0.05)",
    hasMore: false
  },
  {
    id: "velo",
    title: "Cyclisme",
    subtitle: "Liberté & Endurance",
    desc: "Le vélo est mon échappatoire. C'est le dépassement de soi, la découverte de nouveaux horizons et une source d'énergie inépuisable.",
    icon: Bike,
    color: "text-emerald-400",
    bg: "rgba(16, 185, 129, 0.05)",
    hasMore: false
  },
  {
    id: "photo",
    title: "Photographie",
    subtitle: "Instants & Lumière",
    desc: "À travers l'objectif, je cherche à capturer l'invisible. La photo nourrit mon œil de communicant et mon sens du détail.",
    icon: Camera,
    color: "text-purple-400",
    bg: "rgba(168, 85, 247, 0.05)",
    hasMore: true
  }
]

export default function PassionSection() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const baseUrl = import.meta.env.BASE_URL

  const photos = [
    `${baseUrl}images/photographie/IMG_1717.jpg`,
    `${baseUrl}images/photographie/IMG_1718.jpg`,
    `${baseUrl}images/photographie/IMG_1727.jpg`,
    `${baseUrl}images/photographie/IMG_1729.jpg`,
    `${baseUrl}images/photographie/IMG_1693.jpg`,
    `${baseUrl}images/photographie/IMG_0909.jpg`,
    `${baseUrl}images/photographie/IMG_0910.jpg`,
    `${baseUrl}images/photographie/IMG_2811.jpg`,
    `${baseUrl}images/photographie/IMG_2812.jpg`,
    `${baseUrl}images/photographie/IMG_2813.jpg`,
    `${baseUrl}images/photographie/053a153c-0145-46ee-b38e-17f9cf95a3c3.jpg`,
    `${baseUrl}images/photographie/898500a0-9c3b-4ccd-9abe-c54dfdf14969.jpg`,
    `${baseUrl}images/photographie/IMG_0915 (1).jpg`
  ]

  return (
    <section className="relative py-32 overflow-hidden bg-transparent border-y border-white/5">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <Car3D />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-accent-light font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-accent-light/40" />
              Mode de Vie
            </p>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter">
              Ce qui me <br />
              <span className="highlight italic">fait vibrer.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {passions.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              onClick={() => p.hasMore && setIsGalleryOpen(true)}
              className={`glass-card group p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-500 relative overflow-hidden ${p.hasMore ? 'cursor-pointer' : ''}`}
              style={{ background: `linear-gradient(135deg, ${p.bg}, transparent)` }}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <p.icon className={p.color} size={32} />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight group-hover:text-white transition-colors">{p.title}</h3>
              <p className={`text-xs font-bold uppercase tracking-widest ${p.color} mb-6 opacity-70`}>{p.subtitle}</p>
              
              <p className="text-text-muted text-sm md:text-base leading-relaxed mb-8">
                {p.desc}
              </p>

              {p.hasMore && (
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  Voir mes photos <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}

              {/* Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photography Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-primary/95 backdrop-blur-xl"
          >
            <button 
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-8 right-8 text-white hover:text-accent-light transition-colors p-2 bg-white/5 rounded-full"
            >
              <X size={32} />
            </button>

            <div className="w-full max-w-6xl h-full flex flex-col justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto max-h-[80vh] p-4">
                {photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square rounded-2xl overflow-hidden border border-white/10"
                  >
                    <img src={photo} alt={`Photo ${index}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  </motion.div>
                ))}
              </div>
              <p className="text-center mt-10 text-text-muted font-medium">Une sélection de mes travaux photographiques.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
