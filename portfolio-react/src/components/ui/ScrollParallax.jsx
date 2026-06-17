import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollParallax({ children, speed = 0.1, className = '', activeOnMobile = false }) {
  const containerRef = useRef(null)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    // Disable parallax on mobile/tablet devices for maximum performance and native scroll feel
    const checkCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const checkScreenWidth = window.innerWidth < 1024
    
    if (activeOnMobile) {
      setIsDisabled(false)
    } else {
      setIsDisabled(checkCoarsePointer || checkScreenWidth)
    }
  }, [activeOnMobile])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Calculate the y translation based on scroll progress and speed
  // speed = 0.1 means translating between -10% and 10% of container height
  const yRange = [`-${speed * 100}%`, `${speed * 100}%`]
  const y = useTransform(scrollYProgress, [0, 1], yRange)

  if (isDisabled) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, willChange: 'transform' }}
        className="w-full h-full scale-[1.15] origin-center"
      >
        {children}
      </motion.div>
    </div>
  )
}
