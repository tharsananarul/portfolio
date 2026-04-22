import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'

function LightStreaks() {
  const group = useRef()
  const count = 10
  
  const streaks = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10
      ),
      speed: 0.01 + Math.random() * 0.03,
      length: 1 + Math.random() * 3,
      color: Math.random() > 0.8 ? '#3b82f6' : '#ffffff'
    }))
  }, [])

  useFrame(() => {
    group.current.children.forEach((mesh, i) => {
      const streak = streaks[i]
      mesh.position.x += streak.speed
      if (mesh.position.x > 15) mesh.position.x = -15
    })
  })

  return (
    <group ref={group}>
      {streaks.map((streak, i) => (
        <mesh key={i} position={streak.pos} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.005, streak.length, 4, 8]} />
          <meshBasicMaterial 
            color={streak.color} 
            transparent 
            opacity={0.08} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

function GridSystem() {
  return (
    <gridHelper 
      args={[100, 50, '#ffffff', '#ffffff']} 
      position={[0, -10, 0]} 
      rotation={[Math.PI / 15, 0, 0]}
    >
      <meshBasicMaterial color="#ffffff" transparent opacity={0.015} wireframe />
    </gridHelper>
  )
}

export default function Background3D() {
  const baseUrl = import.meta.env.BASE_URL
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 -z-20 bg-[#010409] overflow-hidden">
      {/* BMW M4 Premium Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
        style={{ 
          backgroundImage: `url('${baseUrl}images/bmw_m4.png')`,
          opacity: 0.15,
          transform: `scale(${1.1 + scrollY * 0.0001}) translateY(${scrollY * 0.1}px)`,
          filter: 'contrast(1.2) brightness(0.8)'
        }}
      />
      
      {/* Glow Effects on Headlights Area (Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-accent-light/5 blur-[150px] pointer-events-none" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-scanline pointer-events-none opacity-20" />
      
      {/* Animated Glow Lines */}
      <div className="glow-line" style={{ animationDelay: '0s', opacity: 0.3 }} />
      <div className="glow-line" style={{ animationDelay: '5s', opacity: 0.3 }} />

      {/* 3D Dynamic Elements */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <LightStreaks />
          <GridSystem />
        </Canvas>
      </div>

      {/* Dark Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#010409]/80 via-transparent to-[#010409]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#010409]/60 via-transparent to-[#010409]/60" />
    </div>
  )
}
