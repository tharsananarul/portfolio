import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function SceneContent() {
  const { mouse } = useThree()
  const groupRef = useRef()
  const starsRef = useRef()
  const auroraRef = useRef()

  const stars = useMemo(() => {
    const count = 2500
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return pos
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Smooth mouse parallax
    const targetX = mouse.x * 2
    const targetY = mouse.y * 1
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05
    
    // Stars slow drift
    starsRef.current.rotation.y += 0.0002
  })

  return (
    <group ref={groupRef}>
      {/* Star Field */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={stars.length / 3} array={stars} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
      </points>

      {/* Volumetric Auroras (Toruses/Large Spheres) */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0, 0, -10 - i * 5]} rotation={[Math.PI * 0.2 * i, Math.PI * 0.1 * i, 0]}>
          <torusGeometry args={[15 + i * 2, 3, 16, 100]} />
          <AuroraMaterial color={i === 0 ? "#0ea5e9" : i === 1 ? "#3b82f6" : "#1e40af"} speed={0.2 + i * 0.1} />
        </mesh>
      ))}
      
      {/* Horizon Sphere */}
      <mesh position={[0, -25, -10]}>
        <sphereGeometry args={[20, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  )
}

function AuroraMaterial({ color, speed }) {
  const materialRef = useRef()
  
  useFrame((state) => {
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime() * speed
  })

  return (
    <shaderMaterial
      ref={materialRef}
      transparent
      side={THREE.DoubleSide}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
      uniforms={{
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) }
      }}
      vertexShader={`
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float uTime;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec3 pos = position;
          pos += normal * sin(pos.x * 0.2 + uTime) * 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `}
      fragmentShader={`
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform vec3 uColor;
        uniform float uTime;
        void main() {
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
          float noise = sin(vUv.x * 20.0 + uTime) * cos(vUv.y * 20.0 - uTime);
          gl_FragColor = vec4(uColor, fresnel * (0.5 + 0.5 * noise) * 0.6);
        }
      `}
    />
  )
}

export default function ThreeBackground() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <div className={`fixed inset-0 -z-10 bg-[#010411] pointer-events-none gpu-accelerated ${!isDesktop ? 'mobile-bg-fallback' : ''}`}>
      {isDesktop && (
        <Canvas
          camera={{ position: [0, 0, 20], fov: 45 }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#010411']} />
          
          <SceneContent />

          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} radius={0.5} />
          </EffectComposer>
        </Canvas>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010411] via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
