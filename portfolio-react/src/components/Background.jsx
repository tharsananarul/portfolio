import { motion } from 'framer-motion'
import ThreeBackground from './ThreeBackground'
import { Canvas } from '@react-three/fiber'
import { useLocation } from 'react-router-dom'

function Grid() {
  return (
    <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <gridHelper 
          args={[100, 40, '#1B4FFF', '#1B4FFF']} 
          position={[0, -12, 0]} 
          rotation={[Math.PI / 10, 0, 0]}
        >
          <meshBasicMaterial color="#1B4FFF" transparent opacity={0.1} wireframe />
        </gridHelper>
      </Canvas>
    </div>
  )
}

export default function Background() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#060a18]">
      {/* Global Cosmic Engine - only render on non-home pages */}
      {!isHomePage && <ThreeBackground />}
      
      {/* Grid Overlay matching live site - hidden on Home for fluid background */}
      {!isHomePage && <Grid />}

      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none z-10" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060a18]/20 to-[#060a18]" />
    </div>
  )
}
