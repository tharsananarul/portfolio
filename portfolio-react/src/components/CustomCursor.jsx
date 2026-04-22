import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(0, { damping: 20, stiffness: 300 })
  const cursorY = useSpring(0, { damping: 20, stiffness: 300 })

  useEffect(() => {
    if ('ontouchstart' in window) return
    setIsVisible(true)

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, .group')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea, .group')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
