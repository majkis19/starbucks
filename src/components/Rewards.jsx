import { useState, useEffect, useRef } from 'react'
import { Star, Gift, Zap, ChevronRight, Check } from 'lucide-react'
import './Rewards.css'

const TIERS = [
  {
    name: 'Green',
    stars: 0,
    color: '#00704A',
    perks: ['Free birthday drink', 'Mobile ordering', 'Exclusive offers', 'Free customization add-ons'],
    cta: 'Current Level',
    active: true,
  },
  {
    name: 'Gold',
    stars: 300,
    color: '#CBA258',
    perks: ['All Green benefits', 'Free drink every 200⭐', 'Personalized offers', 'Free refills in store'],
    cta: 'Join Free',
    active: false,
  },
  {
    name: 'Reserve',
    stars: 750,
    color: '#1E3932',
    perks: ['All Gold benefits', 'Reserve tasting events', 'Priority support', 'Exclusive Reserve drinks'],
    cta: 'Join Free',
    active: false,
  },
]

const PERKS_COSTS = [
  { stars: 25, label: 'Customize your drink', icon: '✦' },
  { stars: 100, label: 'Brewed hot coffee or tea', icon: '☕' },
  { stars: 200, label: 'Handcrafted beverage', icon: '🥤' },
  { stars: 300, label: 'Food item', icon: '🥐' },
  { stars: 400, label: 'Select merchandise', icon: '🛍' },
]

export default function Rewards() {
  const [stars, setStars] = useState(0)
  const [animating, setAnimating] = useState(false)
  const barRef = useRef(null)
  const MAX_STARS = 400

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animating) {
          setAnimating(true)
          let s = 0
          const end = 147
          const step = () => {
            s += Math.ceil((end - s) / 12)
            setStars(Math.min(s, end))
            if (s < end) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    if (barRef.current) observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [animating])

  return (
    <section className="rewards" id="rewards">
      {/* Header */}
      <div className="rewards__hero">
        <div className="container">
          <div className="rewards__hero-inner">
            <div className="rewards__hero-text">
              <span className="section-tag" style={{background:'rgba(255,255,255,0.12)',color:'#fff',backdropFilter:'blur(8px)'}}>
                <Star size={11} fill="currentColor"/> Starbucks® Rewards
              </span>
              <h2 className="rewards__hero-title">
                Earn stars.<br />
                <span className="serif-italic">Get rewarded.</span>
              </h2>
              <p className="rewards__hero-sub">
                Join millions of members who earn Stars with every purchase and unlock free drinks, food, and more.
              </p>
              <a href="#" className="btn btn-gold rewards__hero-cta">
                Join for Free <ChevronRight size={16}/>
              </a>
            </div>

            {/* Stars tracker card */}
            <div className="rewards__tracker" ref={barRef}>
              <div className="rewards__tracker-header">
                <span className="rewards__tracker-label mono">Your Stars Progress</span>
                <span className="rewards__tracker-count">
                  <Star size={14} fill="#CBA258" color="#CBA258"/> {stars} / {MAX_STARS}
                </span>
              </div>

              {/* Progress bar */}
              <div className="rewards__bar-wrap">
                <div className="rewards__bar">
                  <div
                    className="rewards__bar-fill"
                    style={{ width: `${(stars / MAX_STARS) * 100}%` }}
                  />
                </div>
                {/* Milestone ticks */}
                {PERKS_COSTS.map(p => (
                  <div
                    key={p.stars}
                    className={`rewards__milestone ${stars >= p.stars ? 'rewards__milestone--reached' : ''}`}
                    style={{ left: `${(p.stars / MAX_STARS) * 100}%` }}
                  >
                    <span className="rewards__milestone-dot">{stars >= p.stars ? <Check size={8}/> : ''}</span>
                    <span className="rewards__milestone-val">{p.stars}⭐</span>
                    <span className="rewards__milestone-label">{p.icon} {p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div className="container">
        <h3 className="rewards__tiers-title">
          Choose your <span className="serif-italic">tier</span>
        </h3>
        <div className="rewards__tiers">
          {TIERS.map((tier, i) => (
            <div key={tier.name} className={`rewards__tier card ${i === 1 ? 'rewards__tier--featured' : ''}`}
              style={{'--tier-color': tier.color}}>
              {i === 1 && <div className="rewards__tier-badge">Most Popular</div>}
              <div className="rewards__tier-icon" style={{background: `${tier.color}15`, color: tier.color}}>
                {i === 0 ? <Zap size={24}/> : i === 1 ? <Star size={24}/> : <Gift size={24}/>}
              </div>
              <h4 className="rewards__tier-name">{tier.name}</h4>
              <p className="rewards__tier-stars mono">
                {tier.stars === 0 ? 'Free to join' : `${tier.stars}+ stars`}
              </p>
              <ul className="rewards__tier-perks">
                {tier.perks.map(perk => (
                  <li key={perk} className="rewards__tier-perk">
                    <Check size={14} color={tier.color}/> {perk}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`btn rewards__tier-cta ${i === 1 ? 'btn-primary' : 'btn-outline-dark'}`}
                style={i !== 1 ? {color: tier.color, borderColor: `${tier.color}40`, background: `${tier.color}08`} : {}}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
