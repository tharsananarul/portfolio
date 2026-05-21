import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, Suspense, useState, useEffect, useCallback } from 'react'
import { Float, MeshTransmissionMaterial, Environment, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

/* ─────────────────────────────────────────────
   FLOATING CRYSTAL — Main centerpiece geometry
   ───────────────────────────────────────────── */
function Crystal({ scrollProgress }) {
  const meshRef = useRef()
  const materialRef = useRef()
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    
    // Slow organic rotation
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + scrollProgress * 1.5
    meshRef.current.rotation.y = t * 0.15 + scrollProgress * 0.8
    meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.1
    
    // Subtle breathing scale
    const breath = 1 + Math.sin(t * 0.8) * 0.03
    meshRef.current.scale.setScalar(breath)
    
    // Scroll-driven Y displacement
    meshRef.current.position.y = -scrollProgress * 4
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.8}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[2.2, 4]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#00D2FF"
          emissive="#1B4FFF"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={1}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.85}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  )
}

/* ─────────────────────────────────────────────
   ORBITING RINGS — Neon orbit rings
   ───────────────────────────────────────────── */
function OrbitRing({ radius, speed, tilt, color, thickness, scrollProgress }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = tilt
    ref.current.rotation.y = t * speed
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.1
    ref.current.position.y = -scrollProgress * 3
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 32, 100]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ─────────────────────────────────────────────
   PARTICLE FIELD — Floating glowing particles
   ───────────────────────────────────────────── */
function ParticleField({ count = 200, scrollProgress }) {
  const ref = useRef()
  
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 15
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      sz[i] = Math.random() * 0.08 + 0.02
    }
    return [pos, sz]
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.02
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.05
    ref.current.position.y = -scrollProgress * 2
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#BCD9F5"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─────────────────────────────────────────────
   LIGHT RAYS — Volumetric feel with long beams
   ───────────────────────────────────────────── */
function LightRays({ scrollProgress }) {
  const groupRef = useRef()
  
  const rays = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8,
        -5 - Math.random() * 10
      ],
      rotation: [0, 0, (Math.random() - 0.5) * 0.5],
      length: 15 + Math.random() * 20,
      opacity: 0.015 + Math.random() * 0.025,
      color: i % 2 === 0 ? '#1B4FFF' : '#BCD9F5'
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = -scrollProgress * 2
  })

  return (
    <group ref={groupRef}>
      {rays.map((ray, i) => (
        <mesh key={i} position={ray.position} rotation={ray.rotation}>
          <planeGeometry args={[0.15, ray.length]} />
          <meshBasicMaterial
            color={ray.color}
            transparent
            opacity={ray.opacity}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─────────────────────────────────────────────
   SMALL FLOATING GEMS — Orbiting small shapes
   ───────────────────────────────────────────── */
function FloatingGems({ scrollProgress }) {
  const groupRef = useRef()
  
  const gems = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      offset: (i / 8) * Math.PI * 2,
      radius: 4.5 + Math.random() * 2,
      speed: 0.15 + Math.random() * 0.15,
      size: 0.08 + Math.random() * 0.15,
      y: (Math.random() - 0.5) * 3,
      color: i % 3 === 0 ? '#BCD9F5' : i % 3 === 1 ? '#1B4FFF' : '#ffffff'
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      const gem = gems[i]
      child.position.x = Math.cos(t * gem.speed + gem.offset) * gem.radius
      child.position.z = Math.sin(t * gem.speed + gem.offset) * gem.radius
      child.position.y = gem.y + Math.sin(t + i) * 0.5 - scrollProgress * 3
      child.rotation.x = t * 0.5
      child.rotation.y = t * 0.3
    })
  })

  return (
    <group ref={groupRef}>
      {gems.map((gem, i) => (
        <mesh key={i}>
          <octahedronGeometry args={[gem.size, 0]} />
          <meshBasicMaterial
            color={gem.color}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─────────────────────────────────────────────
   CAMERA RIG — Mouse-driven parallax & Mobile Responsive
   ───────────────────────────────────────────── */
function CameraRig({ mousePosition }) {
  const { camera, size } = useThree()
  
  useFrame(() => {
    // Smooth camera lerp following mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 1.5, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 1 + 0.5, 0.03)
    
    // Adjust Z distance based on screen width (mobile friendly)
    const isMobile = size.width < 768
    const targetZ = isMobile ? 12 : 8
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)
    
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─────────────────────────────────────────────
   POST-PROCESSING — Bloom + Chromatic + Noise
   ───────────────────────────────────────────── */
function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom 
        intensity={0.8}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0006, 0.0006)}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.03}
      />
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}

/* ─────────────────────────────────────────────
   MAIN SCENE EXPORT
   ───────────────────────────────────────────── */
export default function HeroScene() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const handleScroll = useCallback(() => {
    const maxScroll = window.innerHeight * 1.5
    const progress = Math.min(window.scrollY / maxScroll, 1)
    setScrollProgress(progress)
  }, [])

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = -(e.clientY / window.innerHeight - 0.5) * 2
    setMousePosition({ x, y })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleScroll, handleMouseMove])

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        opacity: 1 - scrollProgress * 0.6,
        transform: `scale(${1 + scrollProgress * 0.1})`,
        transition: 'opacity 0.1s ease-out'
      }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.15} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={0.8} 
            color="#BCD9F5"
            castShadow
          />
          <directionalLight 
            position={[-5, 3, -5]} 
            intensity={0.4} 
            color="#1B4FFF"
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" distance={20} />
          <pointLight position={[0, -3, 3]} intensity={0.3} color="#1B4FFF" distance={15} />
          
          {/* Scene objects */}
          <Crystal scrollProgress={scrollProgress} />
          <ParticleField count={150} scrollProgress={scrollProgress} />
          
          {/* Camera */}
          <CameraRig mousePosition={mousePosition} />
          
          {/* Fog for depth */}
          <fog attach="fog" args={['#080e1a', 8, 30]} />
          
          {/* Post Processing */}
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  )
}
