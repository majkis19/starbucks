import { useState, useRef, useEffect } from 'react'
import { ShoppingCart, Star, Flame, Leaf } from 'lucide-react'
import './Menu.css'

const TABS = ['Hot Drinks', 'Cold Drinks', 'Food', 'Merch']

const ITEMS = {
  'Hot Drinks': [
    { id: 1, name: 'Caffè Latte', desc: 'Espresso with steamed milk and a light layer of foam', price: '$5.75', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80&auto=format&fit=crop', tag: 'Classic', tagIcon: <Star size={11}/> },
    { id: 2, name: 'Cappuccino', desc: 'Bold espresso with thick, velvety steamed milk foam', price: '$5.45', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80&auto=format&fit=crop', tag: 'Popular', tagIcon: <Flame size={11}/> },
    { id: 3, name: 'Vanilla Latte', desc: 'Our signature latte with rich vanilla syrup', price: '$6.25', img: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400&q=80&auto=format&fit=crop', tag: 'Bestseller', tagIcon: <Star size={11}/> },
    { id: 4, name: 'Caramel Macchiato', desc: 'Vanilla, milk, espresso and caramel drizzle', price: '$6.75', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80&auto=format&fit=crop', tag: 'Iconic', tagIcon: <Flame size={11}/> },
    { id: 5, name: 'Pike Place Roast', desc: 'Smooth, well-rounded medium roast, brewed fresh all day', price: '$3.25', img: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&q=80&auto=format&fit=crop', tag: 'Classic', tagIcon: <Star size={11}/> },
    { id: 6, name: 'Pumpkin Spice Latte', desc: 'Espresso with pumpkin, cinnamon, nutmeg and clove', price: '$6.95', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80&auto=format&fit=crop', tag: 'Seasonal', tagIcon: <Leaf size={11}/> },
  ],
  'Cold Drinks': [
    { id: 7, name: 'Cold Brew', desc: '20-hour slow-steeped for smooth, sweet coffee', price: '$5.45', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80&auto=format&fit=crop', tag: 'Popular', tagIcon: <Flame size={11}/> },
    { id: 8, name: 'Iced Caramel Macchiato', desc: 'Vanilla and caramel over ice with espresso layered on top', price: '$6.75', img: 'https://images.unsplash.com/photo-1572490122747-3e9b0f2db84f?w=400&q=80&auto=format&fit=crop', tag: 'Bestseller', tagIcon: <Star size={11}/> },
    { id: 9, name: 'Iced Matcha Latte', desc: 'Premium matcha green tea with oat milk over ice', price: '$6.45', img: 'https://images.unsplash.com/photo-1619445025382-f1adb400b2da?w=400&q=80&auto=format&fit=crop', tag: 'Trending', tagIcon: <Leaf size={11}/> },
    { id: 10, name: 'Pink Drink', desc: 'Strawberry acai refresher with coconut milk', price: '$6.25', img: 'https://images.unsplash.com/photo-1582641399820-e64b02f41cb0?w=400&q=80&auto=format&fit=crop', tag: 'Iconic', tagIcon: <Star size={11}/> },
    { id: 11, name: 'Vanilla Sweet Cream Cold Brew', desc: 'Cold Brew topped with vanilla sweet cream', price: '$6.25', img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&q=80&auto=format&fit=crop', tag: 'Popular', tagIcon: <Flame size={11}/> },
    { id: 12, name: 'Mango Dragonfruit Refresher', desc: 'Tropical mango, dragonfruit pieces and green coffee extract', price: '$5.95', img: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=400&q=80&auto=format&fit=crop', tag: 'Seasonal', tagIcon: <Leaf size={11}/> },
  ],
  'Food': [
    { id: 13, name: 'Butter Croissant', desc: 'Flaky, buttery layers baked to golden perfection', price: '$3.95', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80&auto=format&fit=crop', tag: 'Bestseller', tagIcon: <Star size={11}/> },
    { id: 14, name: 'Avocado Spread', desc: 'Wholesome sourdough with creamy seasoned avocado', price: '$6.25', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80&auto=format&fit=crop', tag: 'Popular', tagIcon: <Flame size={11}/> },
    { id: 15, name: 'Chocolate Chip Cookie', desc: 'Chewy, loaded cookie with rich chocolate chips', price: '$3.25', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80&auto=format&fit=crop', tag: 'Classic', tagIcon: <Star size={11}/> },
    { id: 16, name: 'Protein Box', desc: 'Eggs, Tillamook cheddar, turkey, and multigrain bread', price: '$8.95', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80&auto=format&fit=crop', tag: 'Healthy', tagIcon: <Leaf size={11}/> },
    { id: 17, name: 'Spinach Wrap', desc: 'Cage-free eggs, spinach, tomato and feta cheese', price: '$7.45', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80&auto=format&fit=crop', tag: 'Healthy', tagIcon: <Leaf size={11}/> },
    { id: 18, name: 'Cake Pop', desc: 'Moist birthday cake pop dipped in white chocolatey coating', price: '$3.95', img: 'https://images.unsplash.com/photo-1564278048-1db1f8f5b4b7?w=400&q=80&auto=format&fit=crop', tag: 'Trending', tagIcon: <Flame size={11}/> },
  ],
  'Merch': [
    { id: 19, name: 'Green Ceramic Mug', desc: 'Classic 12oz ceramic mug in Starbucks signature green', price: '$18.95', img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80&auto=format&fit=crop', tag: 'Classic', tagIcon: <Star size={11}/> },
    { id: 20, name: 'Cold Cup Tumbler', desc: 'Reusable 24oz venti cold cup — reduce, reuse, refresh', price: '$26.95', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop', tag: 'Popular', tagIcon: <Flame size={11}/> },
    { id: 21, name: 'Pike Place Beans', desc: '12oz whole bean medium roast, ground to order', price: '$14.95', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80&auto=format&fit=crop', tag: 'Bestseller', tagIcon: <Star size={11}/> },
    { id: 22, name: 'Starbucks Thermos', desc: 'Stainless steel 16oz insulated travel flask', price: '$34.95', img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80&auto=format&fit=crop', tag: 'Popular', tagIcon: <Flame size={11}/> },
    { id: 23, name: 'Reserve Blend', desc: 'Small-lot, single-origin beans from Ethiopia', price: '$22.00', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop', tag: 'Premium', tagIcon: <Star size={11}/> },
    { id: 24, name: 'Tote Bag', desc: 'Organic cotton canvas tote with embroidered logo', price: '$16.95', img: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&q=80&auto=format&fit=crop', tag: 'Trending', tagIcon: <Leaf size={11}/> },
  ],
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('Hot Drinks')
  const [addedItems, setAddedItems] = useState({})

  const handleAdd = (id) => {
    setAddedItems(prev => ({ ...prev, [id]: true }))
    setTimeout(() => setAddedItems(prev => ({ ...prev, [id]: false })), 1500)
  }

  return (
    <section className="menu" id="menu">
      <div className="container">
        {/* Section header */}
        <div className="menu__header">
          <span className="section-tag">☕ Full Menu</span>
          <h2 className="menu__title">
            Crafted for<br />
            <span className="serif-italic" style={{color:'var(--green-primary)'}}>every craving.</span>
          </h2>
          <p className="menu__subtitle">
            From our iconic espresso beverages to seasonal specialties — there's something perfect for every moment.
          </p>
        </div>

        {/* Tabs */}
        <div className="menu__tabs" role="tablist">
          {TABS.map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`menu__tab ${activeTab === tab ? 'menu__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="menu__grid">
          {(ITEMS[activeTab] || []).map((item, i) => (
            <div
              key={item.id}
              className="menu__card card"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="menu__card-img-wrap">
                <img
                  src={item.img}
                  alt={item.name}
                  className="menu__card-img"
                  loading="lazy"
                />
                <span className="menu__card-tag">
                  {item.tagIcon} {item.tag}
                </span>
              </div>
              <div className="menu__card-body">
                <h3 className="menu__card-name">{item.name}</h3>
                <p className="menu__card-desc">{item.desc}</p>
                <div className="menu__card-footer">
                  <span className="menu__card-price">{item.price}</span>
                  <button
                    className={`menu__card-btn btn btn-primary ${addedItems[item.id] ? 'menu__card-btn--added' : ''}`}
                    onClick={() => handleAdd(item.id)}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    {addedItems[item.id] ? (
                      <><span>✓</span> Added</>
                    ) : (
                      <><ShoppingCart size={14} /> Add</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
