import { Link } from 'react-router-dom'

function Profile() {
  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#f0f2f5', minHeight: '100vh' }}>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px 80px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Profile card */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', overflow: 'hidden' }}>
            {/* Cover */}
            <div style={{ height: '100px', background: 'linear-gradient(135deg, #0a1628, #0f2545, #0a3d62)', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '-36px', left: '20px', width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #0082fb, #7ab8a0)', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: '700' }}>M</div>
            </div>

            <div style={{ padding: '44px 20px 20px' }}>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Mia Fontaine</div>
              <div style={{ fontSize: '0.82rem', color: '#65676b', marginBottom: '8px' }}>@mia.travels</div>
              <p style={{ fontSize: '0.82rem', color: '#1c1e21', lineHeight: '1.6', marginBottom: '10px', fontWeight: '300' }}>
                Solo traveler & storyteller. 23 countries and counting. Chasing sunsets, street food, and spontaneous adventures. 🌍
              </p>
              <div style={{ fontSize: '0.78rem', color: '#65676b', marginBottom: '16px' }}>📍 Austin, TX</div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px', padding: '12px 0', borderTop: '1px solid #dde1e7', borderBottom: '1px solid #dde1e7' }}>
                {[{ n: '42', l: 'Trips' }, { n: '8.4k', l: 'Followers' }, { n: '214', l: 'Following' }].map(s => (
                  <div key={s.l} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.2rem' }}>{s.n}</div>
                    <div style={{ fontSize: '0.7rem', color: '#65676b' }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ flex: 1, background: '#0082fb', color: 'white', border: 'none', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}>Follow</button>
                <button style={{ flex: 1, background: '#f0f2f5', color: '#1c1e21', border: '1px solid #dde1e7', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '500', cursor: 'pointer' }}>Message</button>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', fontSize: '0.78rem', fontWeight: '700', color: '#65676b', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #dde1e7' }}>🏅 Badges</div>
            <div style={{ padding: '14px 18px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { icon: '🌍', label: 'Globetrotter' },
                { icon: '✈️', label: 'Frequent Flyer' },
                { icon: '🏕️', label: 'Off-Grid' },
                { icon: '💸', label: 'Budget Pro' },
                { icon: '⭐', label: 'Top Creator' },
              ].map(b => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#f0f2f5', padding: '5px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '500' }}>
                  {b.icon} {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', fontSize: '0.78rem', fontWeight: '700', color: '#65676b', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #dde1e7' }}>🗺️ Countries Visited · 23</div>
            <div style={{ padding: '0 18px' }}>
              {[
                { flag: '🇨🇷', name: 'Costa Rica', trips: '2 trips' },
                { flag: '🇲🇦', name: 'Morocco',    trips: '1 trip' },
                { flag: '🇬🇷', name: 'Greece',     trips: '3 trips' },
                { flag: '🇯🇵', name: 'Japan',      trips: '2 trips' },
                { flag: '🇵🇪', name: 'Peru',       trips: '1 trip' },
              ].map((c, i) => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < 4 ? '1px solid #dde1e7' : 'none' }}>
                  <span style={{ fontSize: '1.3rem' }}>{c.flag}</span>
                  <div style={{ flex: 1, fontSize: '0.85rem', fontWeight: '500' }}>{c.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#65676b' }}>{c.trips}</div>
                </div>
              ))}
            </div>
          </div>

        </aside>

        {/* ── MAIN CONTENT ── */}
        <div>

          {/* Tabs */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', marginBottom: '20px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #dde1e7' }}>
              {['✈️ Trips', '📅 Upcoming', '🔖 Saved', 'ℹ️ About'].map((tab, i) => (
                <div key={tab} style={{ padding: '14px 20px', fontSize: '0.85rem', fontWeight: '500', color: i === 0 ? '#0082fb' : '#65676b', borderBottom: i === 0 ? '2px solid #0082fb' : '2px solid transparent', cursor: 'pointer' }}>{tab}</div>
              ))}
            </div>
          </div>

          {/* Trip cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { emoji: '🌿', dest: 'Costa Rica',  date: 'Mar 4–16, 2025',  tags: ['🏖️ Beach', '🌿 Nature'], cost: '$2,700', bg: 'linear-gradient(135deg, #1a8a5a, #7ab8a0)', likes: '1,247' },
              { emoji: '🏜️', dest: 'Morocco',     date: 'Jan 10–18, 2025', tags: ['🕌 Culture', '🍜 Food'],  cost: '$1,740', bg: 'linear-gradient(135deg, #e8c99a, #b07a3c)', likes: '892' },
              { emoji: '🌊', dest: 'Santorini',   date: 'Sep 5–10, 2024',  tags: ['💎 Luxury', '⛵ Boat'],   cost: '$2,780', bg: 'linear-gradient(135deg, #a8c4e0, #2e6494)', likes: '2,103' },
              { emoji: '🌸', dest: 'Kyoto, Japan', date: 'Apr 2–11, 2024', tags: ['⛩️ Culture', '🍣 Food'],  cost: '$2,870', bg: 'linear-gradient(135deg, #f7b8c4, #c45070)', likes: '1,580' },
            ].map(card => (
              <div key={card.dest} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', border: '1px solid #dde1e7', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                <div style={{ height: '160px', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', position: 'relative' }}>
                  {card.emoji}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px' }}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', color: 'white' }}>{card.dest}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)' }}>{card.date}</div>
                  </div>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    {card.tags.map(tag => (
                      <span key={tag} style={{ background: '#f0f2f5', color: '#65676b', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '100px', border: '1px solid #dde1e7' }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #dde1e7' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{card.cost}</div>
                      <div style={{ fontSize: '0.68rem', color: '#65676b' }}>total trip</div>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#65676b' }}>❤️ {card.likes}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Post a trip CTA */}
          <div style={{ marginTop: '20px', background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🗺️</div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.2rem', marginBottom: '8px' }}>Share another adventure</div>
            <p style={{ fontSize: '0.85rem', color: '#65676b', marginBottom: '20px', fontWeight: '300' }}>Your next trip is waiting to be told.</p>
            <Link to="/create" style={{ background: '#0082fb', color: 'white', padding: '10px 28px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>✚ Post a Trip</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile