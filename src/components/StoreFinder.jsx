import { useState } from 'react'
import { MapPin, Clock, Phone, Navigation, Search } from 'lucide-react'
import './StoreFinder.css'

const STORES = [
  {
    id: 1,
    name: 'Pike Place Market',
    address: '1912 Pike Place, Seattle, WA 98101',
    hours: 'Open until 9:00 PM',
    distance: '0.2 mi',
    phone: '+1 (206) 448-8762',
    features: ['Drive-Thru', 'Mobile Order', 'Reserve Bar'],
    open: true,
  },
  {
    id: 2,
    name: 'Capitol Hill',
    address: '401 Broadway E, Seattle, WA 98102',
    hours: 'Open until 10:00 PM',
    distance: '1.4 mi',
    phone: '+1 (206) 323-0773',
    features: ['Mobile Order', 'Pickup'],
    open: true,
  },
  {
    id: 3,
    name: 'Ballard',
    address: '5317 Ballard Ave NW, Seattle, WA 98107',
    hours: 'Closed · Opens 6:00 AM',
    distance: '4.8 mi',
    phone: '+1 (206) 782-3410',
    features: ['Drive-Thru', 'Mobile Order'],
    open: false,
  },
  {
    id: 4,
    name: 'South Lake Union',
    address: '400 Fairview Ave N, Seattle, WA 98109',
    hours: 'Open until 8:00 PM',
    distance: '2.1 mi',
    phone: '+1 (206) 621-1244',
    features: ['Mobile Order', 'Reserve Bar', 'Pickup'],
    open: true,
  },
]

export default function StoreFinder() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(1)

  const filtered = STORES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="store-finder" id="store">
      <div className="container">
        <div className="store-finder__header">
          <span className="section-tag"><MapPin size={11}/> Find a Store</span>
          <h2 className="store-finder__title">
            A Starbucks<br />
            <span className="serif-italic" style={{color: 'var(--green-primary)'}}>near you.</span>
          </h2>
          <p className="store-finder__sub">
            Over 35,000 stores worldwide. Find your nearest location for mobile ordering, Drive-Thru, or Reserve experience.
          </p>
        </div>

        <div className="store-finder__layout">
          {/* Left panel */}
          <div className="store-finder__panel">
            {/* Search */}
            <div className="store-finder__search">
              <Search size={16} className="store-finder__search-icon"/>
              <input
                type="text"
                placeholder="City, state, or zip code..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="store-finder__input"
              />
            </div>

            {/* Store cards */}
            <div className="store-finder__list">
              {filtered.map(store => (
                <div
                  key={store.id}
                  className={`store-finder__card ${selected === store.id ? 'store-finder__card--active' : ''}`}
                  onClick={() => setSelected(store.id)}
                >
                  <div className="store-finder__card-top">
                    <div className="store-finder__card-info">
                      <h4 className="store-finder__card-name">{store.name}</h4>
                      <p className="store-finder__card-addr">{store.address}</p>
                    </div>
                    <span className="store-finder__card-dist mono">{store.distance}</span>
                  </div>
                  <div className="store-finder__card-meta">
                    <span className={`store-finder__status ${store.open ? 'store-finder__status--open' : 'store-finder__status--closed'}`}>
                      <span className="store-finder__status-dot"/>
                      {store.hours}
                    </span>
                  </div>
                  <div className="store-finder__card-features">
                    {store.features.map(f => (
                      <span key={f} className="store-finder__feature">{f}</span>
                    ))}
                  </div>
                  {selected === store.id && (
                    <div className="store-finder__card-actions">
                      <a href={`tel:${store.phone}`} className="btn btn-primary store-finder__btn">
                        <Phone size={14}/> Call
                      </a>
                      <a
                        href={`https://maps.google.com?q=${encodeURIComponent(store.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn store-finder__btn store-finder__btn-nav"
                      >
                        <Navigation size={14}/> Directions
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map embed */}
          <div className="store-finder__map">
            <iframe
              title="Starbucks Store Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-122.3450%2C47.5990%2C-122.2950%2C47.6590&layer=mapnik&marker=47.6097%2C-122.3422"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="store-finder__iframe"
            />
            <div className="store-finder__map-pin">
              <MapPin size={20} fill="var(--green-primary)" color="var(--green-primary)"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
