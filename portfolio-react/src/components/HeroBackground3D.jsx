import { useState, useEffect, useRef, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Fragment shader: organic luminous blobs on deep navy ──────────────────────
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;

  uniform float u_time;
  uniform vec2  u_mouse;   // 0-1, smoothed
  uniform vec2  u_res;

  // ── Color palette ──────────────────────────────────────────────────────────
  // Deep night-blue background
  const vec3 BG      = vec3(0.008, 0.016, 0.063);  // #02041000 → deep navy
  // Blob interior colors
  const vec3 CYAN    = vec3(0.0,   0.73,  1.0);    // bright electric cyan
  const vec3 BLUE    = vec3(0.05,  0.18,  0.90);   // rich electric blue
  const vec3 COBALT  = vec3(0.02,  0.08,  0.55);   // deep cobalt for mid
  const vec3 WHITE   = vec3(0.85,  0.95,  1.0);    // luminous highlight core

  // ── Noise helpers ──────────────────────────────────────────────────────────
  vec3 mod289v3(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec2 mod289v2(vec2 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec3 permute3(vec3 x){ return mod289v3(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute3(permute3(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m = max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m = m*m; m = m*m;
    vec3 x  = 2.0*fract(p*C.www)-1.0;
    vec3 h  = abs(x)-0.5;
    vec3 ox = floor(x+0.5);
    vec3 a0 = x-ox;
    m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x  = a0.x*x0.x  + h.x*x0.y;
    g.yz = a0.yz*x12.xz + h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  // ── Soft radial blob with organic warping ──────────────────────────────────
  float blob(vec2 uv, vec2 center, float radius, float warpAmt, float t) {
    // warp the sampling position for organic shape
    vec2 off;
    off.x = snoise(uv * 1.8 + vec2(t * 0.13, center.y * 3.0)) * warpAmt;
    off.y = snoise(uv * 1.8 + vec2(center.x * 3.0, t * 0.11)) * warpAmt;
    vec2 d = (uv + off) - center;
    // Aspect correct: make physical width and height proportional
    d.x *= u_res.x / u_res.y;
    
    // On portrait screens (mobile), scale down the blobs so they don't overlap 
    // and overwhelm the narrow screen with solid cyan/white
    float portraitScale = max(1.0, u_res.y / u_res.x * 0.8);
    d *= portraitScale;
    
    float dist = length(d);
    // smooth falloff
    return 1.0 - smoothstep(0.0, radius, dist);
  }

  void main() {
    vec2 uv = vUv;
    float t  = u_time * 0.18;
    float mx = u_mouse.x;  // 0-1
    float my = u_mouse.y;  // 0-1

    // ── 5 animated blob centers ────────────────────────────────────────────
    // Each center drifts in a slow Lissajous orbit
    vec2 b0 = vec2(
      0.08 + 0.13 * sin(t * 0.7 + 0.0) + mx * 0.06,
      0.50 + 0.20 * cos(t * 0.5 + 1.0) + my * 0.04
    );
    vec2 b1 = vec2(
      0.82 + 0.12 * cos(t * 0.6 + 2.0) + mx * 0.05,
      0.22 + 0.18 * sin(t * 0.8 + 3.0) + my * 0.03
    );
    vec2 b2 = vec2(
      0.50 + 0.15 * sin(t * 0.4 + 1.5) + mx * 0.07,
      0.78 + 0.12 * cos(t * 0.9 + 0.5) + my * 0.05
    );
    vec2 b3 = vec2(
      0.20 + 0.10 * cos(t * 0.55 + 4.0) + mx * 0.04,
      0.20 + 0.15 * sin(t * 0.65 + 2.5) + my * 0.06
    );
    vec2 b4 = vec2(
      0.75 + 0.10 * sin(t * 0.72 + 0.8) + mx * 0.05,
      0.60 + 0.15 * cos(t * 0.48 + 1.2) + my * 0.04
    );
    // small accent blob
    vec2 b5 = vec2(
      0.60 + 0.08 * cos(t * 0.90 + 3.5) + mx * 0.03,
      0.42 + 0.10 * sin(t * 0.60 + 0.2) + my * 0.03
    );

    // ── Evaluate blobs ────────────────────────────────────────────────────
    float w = 0.29;  // warp amount
    float f0 = blob(uv, b0, 0.38, w, t);
    float f1 = blob(uv, b1, 0.34, w, t + 1.0);
    float f2 = blob(uv, b2, 0.30, w, t + 2.0);
    float f3 = blob(uv, b3, 0.26, w, t + 3.0);
    float f4 = blob(uv, b4, 0.28, w, t + 0.5);
    float f5 = blob(uv, b5, 0.14, w, t + 1.5);

    // ── Combine: max-union then clamp softly ──────────────────────────────
    float f = max(max(max(max(max(f0, f1), f2), f3), f4), f5);
    f = clamp(f, 0.0, 1.0);

    // ── Per-blob color assignment for blending ────────────────────────────
    // Weight-blend colors based on which blob dominates
    vec3 blobColor = vec3(0.0);
    float total = f0 + f1 + f2 + f3 + f4 + f5 + 0.0001;
    blobColor += CYAN   * f0;
    blobColor += BLUE   * f1;
    blobColor += COBALT * f2;
    blobColor += CYAN   * f3;
    blobColor += WHITE  * f4;
    blobColor += CYAN   * f5;
    blobColor /= total;

    // ── Inner luminous highlight ─────────────────────────────────────────
    // A brighter core where blobs overlap / f is very strong
    float coreMask = smoothstep(0.55, 0.95, f);
    vec3 coreColor = mix(blobColor, WHITE, coreMask * 0.6);

    // ── Background: deep navy with very subtle blue vignette ──────────────
    vec2 vigUv = vUv - 0.5;
    float vig = 1.0 - dot(vigUv * vec2(1.6, 1.2), vigUv * vec2(1.6, 1.2));
    vig = clamp(vig, 0.0, 1.0);
    vec3 bgColor = mix(BG * 0.6, BG, vig);
    bgColor += COBALT * 0.03 * vig; // barely perceptible deep-cobalt in center

    // ── Final composite ───────────────────────────────────────────────────
    // Soft power curve on f so edges are very smooth
    float alpha = pow(clamp(f, 0.0, 1.0), 0.7);
    vec3 col = mix(bgColor, coreColor, alpha);

    // ── Bloom: bright-area glow halo ──────────────────────────────────────
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    float hi   = smoothstep(0.45, 0.85, luma);
    col += (coreColor * 0.3 + WHITE * 0.1) * hi * hi;

    // ── Subtle film grain ─────────────────────────────────────────────────
    float grain = snoise(vUv * 420.0 + u_time * 3.7) * 0.018;
    col += grain;

    // ── Dark overlay so text stays readable ───────────────────────────────
    col *= 0.82;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`

// ── Three.js scene component ─────────────────────────────────────────────────
function FluidBlobMesh({ mouseRef }) {
  const matRef = useRef()

  useFrame((state) => {
    if (!matRef.current) return
    const u = matRef.current.uniforms
    u.u_time.value = state.clock.getElapsedTime()
    u.u_res.value.set(state.size.width, state.size.height)
    // Smooth lerp mouse — slower lerp = silky, no jitter
    u.u_mouse.value.x = THREE.MathUtils.lerp(u.u_mouse.value.x, mouseRef.current.x, 0.022)
    u.u_mouse.value.y = THREE.MathUtils.lerp(u.u_mouse.value.y, mouseRef.current.y, 0.022)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        depthWrite={false}
        depthTest={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time:  { value: 0 },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_res:   { value: new THREE.Vector2(
            typeof window !== 'undefined' ? window.innerWidth  : 1280,
            typeof window !== 'undefined' ? window.innerHeight : 720
          )}
        }}
      />
    </mesh>
  )
}

// ── Helper to detect WebGL support ──────────────────────────────────────────
function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

// ── Exported component ────────────────────────────────────────────────────────
const HeroBackground3D = memo(() => {
  const [isDesktop, setIsDesktop] = useState(false)
  const [webGLSupported, setWebGLSupported] = useState(true)
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5))

  useEffect(() => {
    // Detect WebGL support
    setWebGLSupported(hasWebGL())

    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)

    const onMove = (e) => {
      mouseRef.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      )
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      mq.removeEventListener('change', update)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  // ── Fallback: pure CSS gradient (for mobile or if WebGL is unsupported) ─────
  if (!isDesktop || !webGLSupported) {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -10,
          background: `
            radial-gradient(ellipse 80% 60% at 8% 50%,  rgba(0,186,255,0.28) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 85% 20%,  rgba(20,80,230,0.32) 0%, transparent 70%),
            radial-gradient(ellipse 55% 45% at 50% 80%,  rgba(0,120,255,0.20) 0%, transparent 70%),
            radial-gradient(ellipse 45% 35% at 20% 18%,  rgba(0,200,255,0.18) 0%, transparent 70%)
          `,
          backgroundColor: '#020410'
        }}
      />
    )
  }

  // ── Desktop: WebGL fluid blobs ────────────────────────────────────────────
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -10, backgroundColor: 'transparent' }}>
      <Canvas
        gl={{ antialias: true, powerPreference: 'high-performance', precision: 'highp' }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ 
          pointerEvents: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: -10,
          backgroundColor: 'transparent'
        }}
      >
        <FluidBlobMesh mouseRef={mouseRef} />
      </Canvas>

      {/* Semi-transparent black overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Subtle film-grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  )
})

export default HeroBackground3D
