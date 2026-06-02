import './HeroPhoto.css';

const HeroPhoto = ({ src, alt = 'Tharsanan' }) => {
  return (
    <div className="hero-photo-wrapper">

      {/* ① Anneau lumineux tournant */}
      <div className="hero-photo-ring" aria-hidden="true" />

      {/* ② Fond intermédiaire (évite de voir le ring sous la photo) */}
      <div className="hero-photo-bg" aria-hidden="true" />

      {/* ③ Ta photo */}
      <img
        className="hero-photo-img"
        src={src}
        alt={alt}
        fetchPriority="high"
        width={800}
        height={800}
      />

      {/* ④ Ligne de scan animée */}
      <div className="hero-photo-scanline" aria-hidden="true" />

      {/* ⑤ Coins angulaires (viewfinder) */}
      <span className="hero-corner hero-corner--tl" aria-hidden="true" />
      <span className="hero-corner hero-corner--tr" aria-hidden="true" />
      <span className="hero-corner hero-corner--bl" aria-hidden="true" />
      <span className="hero-corner hero-corner--br" aria-hidden="true" />

    </div>
  );
};

export default HeroPhoto;
