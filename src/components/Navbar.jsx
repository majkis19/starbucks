import { useEffect, useRef, useState } from 'react'
import { Coffee, ShoppingBag, MapPin, Menu, X, Star } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Menu', href: '#menu' },
    { label: 'Rewards', href: '#rewards' },
    { label: 'Gift Cards', href: '#gift' },
    { label: 'Find a Store', href: '#store' },
  ]

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <a href="#" className="navbar__logo" aria-label="Starbucks Home">
            <div className="navbar__logo-circle">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="28" fill={scrolled ? '#00704A' : '#fff'} />
                <circle cx="30" cy="30" r="22" fill="none" stroke={scrolled ? '#fff' : '#00704A'} strokeWidth="1.5"/>
                <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
                  fontFamily="Playfair Display, serif" fontSize="18" fontStyle="italic"
                  fill={scrolled ? '#fff' : '#00704A'}>S</text>
              </svg>
            </div>
            <span className="navbar__logo-text">Starbucks</span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} className="navbar__link">{l.label}</a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar__actions">
            <a href="#rewards" className="navbar__action-icon" aria-label="Rewards">
              <Star size={18} />
            </a>
            <a href="#" className="navbar__action-icon" aria-label="Cart">
              <ShoppingBag size={18} />
            </a>
            <a href="#" className="btn btn-primary navbar__cta">Order Now</a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <ul className="mobile-menu__links">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#" className="btn btn-primary" style={{marginTop: '2rem', width: '100%', justifyContent: 'center'}}>
          Order Now
        </a>
      </div>
    </>
  )
}
