import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/projets',      label: 'Projets'      },
  { to: '/competences',  label: 'Compétences'  },
  { to: '/cv',           label: 'CV'            },
];

const SOCIALS = [
  { href: 'https://www.linkedin.com/in/tharsanan-arulananthaselvam/', label: 'LinkedIn', icon: <Linkedin size={16} /> },
  { href: 'https://github.com/tharsananarul',  label: 'GitHub', icon: <Github size={16} /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(80);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Lock scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus trap & Escape closing (A11y)
  useEffect(() => {
    if (!open) return;
    const drawer = document.getElementById('mobile-drawer');
    if (!drawer) return;
    
    const focusable = drawer.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    first.focus();

    const trapFocus = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', trapFocus);
    document.addEventListener('keydown', handleEsc);
    
    return () => {
      document.removeEventListener('keydown', trapFocus);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Navigation principale"
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      >
        <div className={styles.pill}>

          {/* Logo */}
          <NavLink to="/" className={styles.logo} aria-label="Retour à l'accueil">
            T.
          </NavLink>

          {/* Liens desktop */}
          <ul className={styles.links} role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                  aria-current={({ isActive }) => isActive ? 'page' : undefined}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Séparateur + socials */}
          <div className={styles.right}>
            <div className={styles.sep} aria-hidden="true" />
            {SOCIALS.map(({ href, label, icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                 aria-label={label} className={styles.social}>
                {icon}
              </a>
            ))}
            <div className={styles.sep} aria-hidden="true" />
            <NavLink to="/contact" className={styles.cta}>
              Contact
            </NavLink>
          </div>

          {/* Hamburger mobile */}
          <button
            className={`${styles.hamburger} ${open ? styles.open : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-drawer" className={styles.drawer}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            role="dialog" aria-modal="true" aria-label="Menu mobile"
          >
            <button onClick={() => setOpen(false)} className={styles.close}
              aria-label="Fermer le menu">✕</button>
            <ul role="list" className={styles.drawerLinks}>
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.li key={to}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}>
                  <NavLink to={to} onClick={() => setOpen(false)}
                    className={({ isActive }) => isActive ? styles.drawerLinkActive : styles.drawerLink}
                    aria-current={({ isActive }) => isActive ? 'page' : undefined}>
                    {label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
                <NavLink to="/contact" onClick={() => setOpen(false)} className={styles.drawerCta}>
                  Contact
                </NavLink>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div className={styles.overlay}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)} aria-hidden="true" />
        )}
      </AnimatePresence>
    </>
  );
}
