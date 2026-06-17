import { useRef, useState, useEffect } from 'react'

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(14, 165, 233, 0.15)', borderSpotlightColor = 'rgba(14, 165, 233, 0.45)' }) {
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    // Disable coordinates tracking on mobile/tablet to save CPU/GPU cycles
    const checkCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const checkScreenWidth = window.innerWidth < 1024
    setIsDisabled(checkCoarsePointer || checkScreenWidth)
  }, [])

  const handleMouseMove = (e) => {
    if (isDisabled || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => !isDisabled && setIsHovered(false)}
      className={`relative group bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 ${className}`}
    >
      {/* Dynamic radial gradient spotlight background (only on hover/desktop) */}
      {!isDisabled && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 40%)`,
            mixBlendMode: 'screen',
            zIndex: 1
          }}
        />
      )}

      {/* Dynamic border highlight using cursor spotlight (only on hover/desktop) */}
      {!isDisabled && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
          style={{
            border: '1px solid transparent',
            backgroundImage: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, ${borderSpotlightColor}, transparent 80%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            zIndex: 2,
            borderRadius: 'inherit'
          }}
        />
      )}

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
