import { useEffect, useRef } from 'react'
import { ArrowDown, ChevronRight } from 'lucide-react'
import './Hero.css'

export default function Hero() {
  const headlineRef = useRef(null)

  useEffect(() => {
    const items = headlineRef.current?.querySelectorAll('.hero__anim')
    if (!items) return
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(40px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 300 + i * 160)
    })
  }, [])

  return (
    <section className="hero" id="home">
      {/* Background image */}
      <div className="hero__bg" />
      {/* Gradient overlay */}
      <div className="hero__overlay" />

      {/* Floating coffee cup visual */}
      <div className="hero__cup animate-float">
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop"
          alt="Starbucks Coffee"
          className="hero__cup-img"
        />
        <div className="hero__cup-glow" />
      </div>

      {/* Content */}
      <div className="hero__content" ref={headlineRef}>
        <div className="hero__anim">
          <span className="section-tag" style={{background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(8px)'}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'#5de0a0',display:'inline-block',animation:'pulse 2s infinite'}}/>
            New Season Arriving
          </span>
        </div>

        <h1 className="hero__title hero__anim">
          <span className="hero__title-line">More Than</span>
          <span className="hero__title-line hero__title-serif">just coffee.</span>
        </h1>

        <p className="hero__subtitle hero__anim">
          A ritual. A reward. A reason to pause.<br />
          Crafted for you, one cup at a time.
        </p>

        <div className="hero__actions hero__anim">
          <a href="#menu" className="btn btn-primary hero__btn-main">
            Explore Menu <ChevronRight size={16} />
          </a>
          <a href="#rewards" className="btn btn-outline">
            Join Rewards
          </a>
        </div>

        {/* Stats row */}
        <div className="hero__stats hero__anim">
          {[
            { value: '35,000+', label: 'Locations worldwide' },
            { value: '87M', label: 'Rewards members' },
            { value: '1971', label: 'Founded in Seattle' },
          ].map(s => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#menu" className="hero__scroll-cue">
        <ArrowDown size={18} />
        <span>Scroll to explore</span>
      </a>
    </section>
  )
}
