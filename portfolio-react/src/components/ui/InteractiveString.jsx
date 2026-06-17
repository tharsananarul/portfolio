import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'

export default function InteractiveString({ height = 60, color = 'rgba(255, 255, 255, 0.2)', hoverColor = '#0ea5e9' }) {
  const svgRef = useRef(null)
  
  // Normalized dimensions: 1000 width, 80 height (center is Y = 40)
  const normWidth = 1000
  const normHeight = 80
  const centerY = 40

  const controlX = useMotionValue(normWidth / 2)
  const controlY = useMotionValue(centerY)

  // Smooth springs for tracking the mouse movement
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const smoothX = useSpring(controlX, springConfig)
  const smoothY = useSpring(controlY, springConfig)

  // Combine into path string
  // We use useSpring to animate the transition between coordinates. 
  // But when released, we want a bouncy vibration.
  const path = useRef(null)
  
  useEffect(() => {
    // Generate SVG path string dynamically
    const unsubscribeX = smoothX.on('change', (latestX) => {
      updatePath(latestX, smoothY.get())
    })
    const unsubscribeY = smoothY.on('change', (latestY) => {
      updatePath(smoothX.get(), latestY)
    })

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [smoothX, smoothY])

  const updatePath = (cx, cy) => {
    if (path.current) {
      path.current.setAttribute('d', `M 0 ${centerY} Q ${cx} ${cy} ${normWidth} ${centerY}`)
    }
  }

  const handleMouseMove = (e) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    
    // Convert screen coordinates to normalized coordinates (0-1000, 0-80)
    const xVal = ((e.clientX - rect.left) / rect.width) * normWidth
    const yVal = ((e.clientY - rect.top) / rect.height) * normHeight

    // Track cursor with smooth coordinate updates
    controlX.set(xVal)
    controlY.set(yVal)
  }

  const handleMouseLeave = () => {
    // Release the string and trigger a high-frequency, low-damping vibration to center Y = 40
    animate(controlX, normWidth / 2, {
      type: 'spring',
      stiffness: 150,
      damping: 15
    })
    
    animate(controlY, centerY, {
      type: 'spring',
      stiffness: 700,  // high stiffness = high frequency wobble
      damping: 6,      // low damping = vibrates longer
      mass: 0.4        // low mass = quick vibration response
    })
  }

  return (
    <div 
      className="w-full relative overflow-visible select-none py-4"
      style={{ height: `${height}px` }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${normWidth} ${normHeight}`}
        preserveAspectRatio="none"
        className="w-full h-full cursor-pointer overflow-visible block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Transparent helper to increase interactive hover area */}
        <rect 
          x="0" 
          y="0" 
          width={normWidth} 
          height={normHeight} 
          fill="transparent" 
          className="pointer-events-all"
        />
        
        {/* The interactive string path */}
        <motion.path
          ref={path}
          d={`M 0 ${centerY} Q ${normWidth / 2} ${centerY} ${normWidth} ${centerY}`}
          fill="transparent"
          stroke={color}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-300 hover:stroke-[var(--color-creative-blue)]"
          style={{
            stroke: hoverColor ? undefined : color
          }}
          whileHover={{
            stroke: hoverColor
          }}
        />
      </svg>
    </div>
  )
}
