import { motion } from 'framer-motion'
import { Mountain, Camera, Gamepad2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'

const passions = [
  {
    id: "gaming",
    title: "Gaming",
    subtitle: "Open World & Immersion",
    desc: "Passionné par les univers ouverts comme GTA V, Red Dead Redemption ou Watch Dogs, j'apprécie les expériences immersives où narration et liberté de jeu se complètent.",
    icon: Gamepad2,
    color: "text-[var(--color-creative-blue)]",
    bg: "rgba(14, 165, 233, 0.1)",
    hasMore: false
  },
  {
    id: "velo",
    title: "VTT",
    subtitle: "Liberté & Évasion",
    desc: "Faire du VTT en pleine nature, c'est tellement plus fun que de rouler en ville ! C'est dans ces moments que je ressens un véritable sentiment de liberté et d'évasion.",
    icon: Mountain,
    color: "text-[var(--color-creative-blue)]",
    bg: "rgba(14, 165, 233, 0.1)",
    hasMore: false
  },
  {
    id: "photo",
    title: "Photographie",
    subtitle: "Instants & Lumière",
    desc: "Je ne suis pas photographe professionnel, mais j'aime capturer l'instant présent sur un coup de cœur, dès qu'un détail ou une lumière me paraît beau.",
    icon: Camera,
    color: "text-[var(--color-creative-blue)]",
    bg: "rgba(14, 165, 233, 0.1)",
    hasMore: true
  }
]

export default function PassionSection() {
  const baseUrl = import.meta.env.BASE_URL
  const videoRef = useRef(null)

  // Loop only the first 15 seconds
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.currentTime >= 15) {
        video.currentTime = 0
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#060a18] border-y border-white/5 z-10">
      {/* YouTube Background with Cinematic Enhancements (Optimized) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.05]"
        >
          <source src={`${baseUrl}videos/bmw-bg.mp4`} type="video/mp4" />
        </video>

        {/* Gradient Overlay replacing the heavy maskImage */}
        <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #060a18 100%)' }} />

        {/* Extra darkening to ensure readability */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        {/* Decorative cinematic scanlines/grain */}
        <div className="absolute inset-0 z-20 bg-noise opacity-[0.03] pointer-events-none" />
      </div>


      {/* Frame accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-creative-blue)] to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-creative-blue)] to-transparent opacity-20" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-creative-blue)]/50" />
              En dehors du digital
            </p>
            <h2 className="text-4xl md:text-7xl font-black mb-4 md:mb-8 tracking-tighter uppercase text-white relative inline-block">
              Ce qui me <br />
              <span className="text-[var(--color-creative-blue)] mt-2 inline-block relative">
                 <span className="absolute inset-0 bg-[var(--color-creative-blue)]/20 blur-md rounded-lg"></span>
                 <span className="relative z-10 px-3 py-1 bg-[var(--color-creative-blue)]/10 border border-[var(--color-creative-blue)]/30 rounded-2xl backdrop-blur-md">définit aussi.</span>
              </span>
              <div className="absolute -top-10 -right-20 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg text-white font-black text-[10px] tracking-widest uppercase rotate-12 hidden md:block">Life</div>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {passions.map((p, i) => {
            const CardContent = (
              <>
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center mb-4 md:mb-4 lg:mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                  <p.icon className={p.color} size={24} />
                </div>
                <h3 className="text-2xl md:text-lg lg:text-xl xl:text-2xl font-black mb-1 md:mb-2 tracking-tighter text-white uppercase whitespace-nowrap">{p.title}</h3>
                <p className={`text-[10px] md:text-[11px] lg:text-xs font-bold uppercase tracking-widest ${p.color} mb-3 md:mb-4 lg:mb-6 opacity-90`}>{p.subtitle}</p>
                <p className="text-white/80 text-xs md:text-[13px] lg:text-base leading-relaxed mb-4 md:mb-6 lg:mb-8 line-clamp-3 md:line-clamp-none font-medium">{p.desc}</p>
                {p.hasMore && (
                  <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                    Photos <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 md:w-32 md:h-32 bg-white/5 blur-[40px] md:blur-[50px] rounded-full group-hover:bg-white/20 transition-colors" />
              </>
            )

            const cardClasses = "group p-6 md:p-6 lg:p-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md hover:border-[var(--color-creative-blue)]/50 hover:shadow-[0_0_40px_rgba(var(--color-creative-blue-rgb),0.2)] transition-all duration-500 relative overflow-hidden"
            const accentStyle = {} // Remove manual brutalist border top

            return p.hasMore ? (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="contents"
              >
                <Link
                  to="/photographie"
                  className={cardClasses}
                  style={accentStyle}
                >
                  {CardContent}
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cardClasses}
                style={accentStyle}
              >
                {CardContent}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
