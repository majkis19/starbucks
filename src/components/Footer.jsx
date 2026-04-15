import { Instagram, Twitter, Youtube, Facebook, MapPin, Circle } from 'lucide-react'
import './Footer.css'

const LINKS = {
  Company: ['About Us', 'Careers', 'Newsroom', 'Investor Relations', 'Accessibility'],
  Products: ['Coffee', 'Tea', 'Cold Drinks', 'Food', 'At-Home Coffee'],
  Social: ['Starbucks Rewards', 'Gift Cards', 'Mobile App', 'Starbucks Reserve', 'Starbucks for Life'],
  Support: ['Customer Service', 'FAQs', 'Store Policies', 'Water Stewardship', 'Ethical Sourcing'],
}

export default function Footer() {
  return (
    <footer className="footer" id="gift">
      {/* CTA band */}
      <div className="footer__cta-band">
        <div className="container footer__cta-inner">
          <div>
            <h2 className="footer__cta-title">
              Start earning with<br/>
              <span className="serif-italic">Starbucks Rewards.</span>
            </h2>
            <p className="footer__cta-sub">
              Join for free and earn Stars toward free drinks and more.
            </p>
          </div>
          <div className="footer__cta-actions">
            <a href="#" className="btn btn-gold footer__cta-btn">Join Now — It's Free</a>
            <a href="#" className="btn btn-outline footer__cta-btn-outline">Learn More</a>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="footer__body">
        <div className="container">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand-col">
              <div className="footer__logo">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                  <circle cx="30" cy="30" r="28" fill="#00704A"/>
                  <circle cx="30" cy="30" r="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
                    fontFamily="Playfair Display, serif" fontSize="20" fontStyle="italic" fill="white">S</text>
                </svg>
                <span className="footer__logo-text">Starbucks</span>
              </div>
              <p className="footer__brand-desc">
                Inspiring and nurturing the human spirit — one person, one cup and one neighborhood at a time.
              </p>
              {/* Social icons */}
              <div className="footer__social">
                {[
                  { Icon: Instagram, href: 'https://instagram.com/starbucks', label: 'Instagram' },
                  { Icon: Twitter,   href: 'https://twitter.com/starbucks',   label: 'Twitter' },
                  { Icon: Facebook,  href: 'https://facebook.com/Starbucks',  label: 'Facebook' },
                  { Icon: Youtube,   href: 'https://youtube.com/starbucks',   label: 'YouTube' },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} className="footer__social-icon" aria-label={label} target="_blank" rel="noopener noreferrer">
                    <Icon size={16}/>
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(LINKS).map(([col, links]) => (
              <div key={col} className="footer__link-col">
                <h4 className="footer__link-heading">{col}</h4>
                <ul className="footer__link-list">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="footer__link">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="footer__bottom">
            <div className="footer__bottom-left">
              <div className="footer__status">
                <span className="footer__status-dot animate-pulse-dot"/>
                <span className="footer__status-txt mono">All Systems Operational</span>
              </div>
              <p className="footer__legal">
                © {new Date().getFullYear()} Starbucks Coffee Company. All rights reserved.
              </p>
            </div>
            <div className="footer__bottom-right">
              <a href="#" className="footer__legal-link">Privacy Policy</a>
              <a href="#" className="footer__legal-link">Terms of Use</a>
              <a href="#" className="footer__legal-link">Cookie Settings</a>
              <a href="#" className="footer__legal-link">CA Privacy Rights</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
