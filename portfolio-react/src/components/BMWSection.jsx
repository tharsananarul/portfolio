import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Float, Environment } from '@react-three/drei'

function CarModel() {
  const baseUrl = import.meta.env.BASE_URL
  const texture = useLoader(THREE.TextureLoader, `${baseUrl}images/bmw_m4.png`)
  const meshRef = useRef()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.15, 0.05)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.05, 0.05)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <planeGeometry args={[16, 8]} />
        <meshBasicMaterial map={texture} transparent opacity={1} />
      </mesh>
    </Float>
  )
}

export default function BMWSection() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-primary border-y border-white/5">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <CarModel />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <div className="section-container relative z-10 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl bg-primary/40 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/10"
        >
          <p className="text-accent-light font-bold tracking-[0.3em] uppercase text-xs mb-4">Passions</p>
          <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tighter">L'Automobile <br className="block md:hidden" />{" "}<span className="highlight italic">& le Design.</span></h2>
          <p className="text-text-muted text-sm md:text-lg leading-relaxed mb-0">
            Au-delà de la communication, je suis un passionné de design automobile. Pour moi, une BMW n'est pas qu'une voiture, c'est une pièce d'ingénierie où chaque ligne a une fonction et chaque courbe raconte une histoire de performance.
          </p>
        </motion.div>
      </div>

      {/* Decorative Scanlines for the automotive feel */}
      <div className="absolute inset-0 bg-scanline opacity-[0.03] pointer-events-none" />
    </section>
  )
}
