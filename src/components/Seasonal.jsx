import { useState, useEffect } from 'react'
import { Clock, Leaf, ChevronRight } from 'lucide-react'
import './Seasonal.css'

const SEASONAL_ITEMS = [
  {
    id: 1,
    name: 'Lavender Oat Latte',
    tagline: 'Light, floral, and dreamy',
    desc: 'Espresso meets the gentle fragrance of lavender with creamy oat milk. A soft escape in every sip.',
    price: '$7.25',
    badge: 'Spring Exclusive',
    bg: '#E8D5F5',
    accent: '#7B4FA6',
    img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=85&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Strawberry Matcha',
    tagline: 'Bold, earthy, and vibrant',
    desc: 'Premium ceremonial matcha layered with strawberry cold foam and oat milk. A visual masterpiece.',
    price: '$7.45',
    badge: 'Limited Time',
    bg: '#FCE4EC',
    accent: '#C62828',
    img: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=800&q=85&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Honey Oat Cold Brew',
    tagline: 'Smooth, sweet, and grounding',
    desc: '20-hour cold brew with golden honey, oat milk foam and just a hint of sea salt caramel.',
    price: '$6.95',
    badge: 'New Arrival',
    bg: '#FFF8E1',
    accent: '#F57F17',
    img: 'https://images.unsplash.com/photo-1524420000_unsplash_fallback.jpg?w=800&q=85&auto=format&fit=crop',
  },
]

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({})
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - Date.now()
      if (diff <= 0) return setTimeLeft({ d: 0, h: 0, m: 0, s: 0 })
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return timeLeft
}

export default function Seasonal() {
  const [active, setActive] = useState(0)
  const item = SEASONAL_ITEMS[active]
  const t = useCountdown('2026-06-21T00:00:00')

  return (
    <section className="seasonal" id="seasonal">
      <div className="container">
        <div className="seasonal__header">
          <span className="section-tag"><Leaf size={11}/> Seasonal Specials</span>
          <h2 className="seasonal__title">
            Here for a<br/>
            <span className="serif-italic" style={{color:'var(--green-primary)'}}>limited time.</span>
          </h2>
        </div>

        <div className="seasonal__main" style={{'--accent': item.accent, '--bg': item.bg}}>
          {/* Image */}
          <div className="seasonal__img-wrap">
            <img
              src={item.img}
              alt={item.name}
              className="seasonal__img"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=85&auto=format&fit=crop' }}
            />
            <div className="seasonal__img-overlay" />
            <div className="seasonal__badge">
              <Clock size={12}/>{item.badge}
            </div>
          </div>

          {/* Info */}
          <div className="seasonal__info">
            <p className="seasonal__tagline">{item.tagline}</p>
            <h3 className="seasonal__name">{item.name}</h3>
            <p className="seasonal__desc">{item.desc}</p>

            {/* Countdown */}
            <div className="seasonal__countdown">
              <p className="seasonal__countdown-label mono">Available until summer solstice</p>
              <div className="seasonal__countdown-grid">
                {[['d', 'Days'], ['h', 'Hrs'], ['m', 'Min'], ['s', 'Sec']].map(([key, lbl]) => (
                  <div key={key} className="seasonal__tick">
                    <span className="seasonal__tick-val">{String(t[key] ?? 0).padStart(2, '0')}</span>
                    <span className="seasonal__tick-lbl">{lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="seasonal__actions">
              <span className="seasonal__price">{item.price}</span>
              <a href="#" className="btn btn-dark">
                Order Now <ChevronRight size={16}/>
              </a>
            </div>

            {/* Dot nav */}
            <div className="seasonal__dots">
              {SEASONAL_ITEMS.map((_, i) => (
                <button
                  key={i}
                  className={`seasonal__dot ${i === active ? 'seasonal__dot--active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`View seasonal item ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
