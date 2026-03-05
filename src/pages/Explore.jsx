import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function Explore() {
  const [trips, setTrips] = useState([])
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('🆕 Newest')
  const [activeTag, setActiveTag] = useState(null)

  useEffect(() => {
    async function fetchTrips() {
      let query = supabase.from('trips').select('*')
      if (search) query = query.ilike('destination', `%${search}%`)
      if (activeTag) query = query.ilike('tags', `%${activeTag}%`)
      if (activeTab === '🆕 Newest') query = query.order('created_at', { ascending: false })
      else if (activeTab === '💸 Budget') query = query.order('total_cost', { ascending: true })
      else if (activeTab === '💎 Luxury') query = query.order('total_cost', { ascending: false })
      const { data, error } = await query
      if (!error) setTrips(data)
    }
    fetchTrips()
  }, [search, activeTab, activeTag])

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#f0f2f5', minHeight: '100vh' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2545 40%, #0a3d62 100%)', padding: '64px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', minHeight: '380px', position: 'relative', overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', width: i % 3 === 0 ? '2px' : '1px', height: i % 3 === 0 ? '2px' : '1px', background: 'rgba(255,255,255,0.7)', borderRadius: '50%', top: `${Math.sin(i * 137.5) * 50 + 50}%`, left: `${Math.cos(i * 137.5) * 50 + 50}%` }} />
        ))}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', fontWeight: '500', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '100px', marginBottom: '20px' }}>
            <span style={{ width: '6px', height: '6px', background: '#31a24c', borderRadius: '50%', display: 'inline-block' }} />
            Live · Updated daily
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '3rem', color: 'white', letterSpacing: '-0.03em', lineHeight: '1.1', marginBottom: '12px' }}>
            Discover trips from<br />travelers <em style={{ color: '#7ab8fb' }}>just like you.</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', fontWeight: '300', maxWidth: '420px', lineHeight: '1.65', marginBottom: '32px' }}>
            Real destinations. Real costs. Real people who've already been there.
          </p>
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', overflow: 'hidden' }}>
            {[{ n: '24,817', l: 'Trips Posted' }, { n: '143', l: 'Countries' }, { n: '8,302', l: 'Travelers' }, { n: '$1,840', l: 'Avg Cost' }].map((s, i) => (
              <div key={s.l} style={{ padding: '14px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.4rem', color: 'white' }}>{s.n}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #1a6bb5, #0a2a52 60%, #040f1a)', boxShadow: '0 0 60px rgba(26,107,181,0.4)' }} />
        </div>
      </div>

      {/* SEARCH + FILTER TABS */}
      <div style={{ background: 'white', borderBottom: '1px solid #dde1e7', padding: '0 28px', position: 'sticky', top: '60px', zIndex: 100 }}>
        <div style={{ padding: '12px 0 0' }}>
          <input
            placeholder="🔍 Search by destination..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 16px', border: '1px solid #dde1e7', borderRadius: '8px', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', background: '#f0f2f5' }}
          />
        </div>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {['🔥 Trending', '✨ Featured', '🆕 Newest', '💸 Budget', '💎 Luxury', '🎒 Solo', '👨‍👩‍👧 Family'].map((tab) => (
            <div key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: '500', color: activeTab === tab ? '#0082fb' : '#65676b', borderBottom: activeTab === tab ? '2px solid #0082fb' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>{tab}</div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', padding: '10px 0 12px', overflowX: 'auto' }}>
          {['🏖️ Beach', '🏔️ Mountains', '🌿 Nature', '🏙️ City', '🕌 Culture', '🍜 Food', '🎒 Backpacking', '💎 Luxury', '🏄 Adventure'].map(tag => (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} style={{ padding: '5px 14px', borderRadius: '100px', whiteSpace: 'nowrap', border: `1.5px solid ${activeTag === tag ? '#0082fb' : '#dde1e7'}`, background: activeTag === tag ? '#e7f3ff' : 'white', color: activeTag === tag ? '#0082fb' : '#65676b', fontSize: '0.78rem', fontWeight: activeTag === tag ? '600' : '400', cursor: 'pointer' }}>{tag}</button>
          ))}
        </div>
      </div>

      {/* MAIN BODY */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 24px 80px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px' }}>

        <div>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.3rem', marginBottom: '16px' }}>⭐ Trip of the Week</h2>
          <div style={{ borderRadius: '14px', overflow: 'hidden', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.10)', marginBottom: '24px', cursor: 'pointer' }}>
            <div style={{ height: '280px', position: 'relative', background: 'linear-gradient(135deg, #1a8a5a, #7ab8a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem' }}>
              🌿
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 2 }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.8rem', color: 'white', marginBottom: '6px' }}>12 Days in Costa Rica</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>@mia.travels · ❤️ 1,247 likes</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.3rem' }}>🌍 Latest Trips</h2>
            <Link to="/create" style={{ background: '#0082fb', color: 'white', padding: '8px 18px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', textDecoration: 'none' }}>✚ Post a Trip</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {trips.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#65676b', background: 'white', borderRadius: '14px', border: '1px solid #dde1e7' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🌍</div>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.3rem', marginBottom: '8px' }}>No trips found</div>
                <p style={{ fontSize: '0.85rem', fontWeight: '300', marginBottom: '20px' }}>Try a different search or be the first to post!</p>
                <Link to="/create" style={{ background: '#0082fb', color: 'white', padding: '10px 24px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>✚ Post a Trip</Link>
              </div>
            ) : (
              trips.map(card => (
                <div key={card.id} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', border: '1px solid #dde1e7', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                  <div style={{ height: '150px', background: 'linear-gradient(135deg, #1a8a5a, #7ab8a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative' }}>
                    🌍
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%)' }} />
                    <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1rem', color: 'white' }}>{card.destination}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.75)' }}>{card.start_date}</div>
                    </div>
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '6px' }}>{card.title}</div>
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      {card.tags && card.tags.split(', ').map(tag => (
                        <span key={tag} style={{ background: '#f0f2f5', color: '#65676b', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '100px', border: '1px solid #dde1e7' }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #dde1e7' }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>${card.total_cost?.toLocaleString()}</div>
                        <div style={{ fontSize: '0.68rem', color: '#65676b' }}>per person</div>
                      </div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', color: '#65676b' }}>❤️ Like</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0a1628, #0f2545)', borderRadius: '14px', padding: '24px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✈️</div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', color: 'white', marginBottom: '6px' }}>Share your own trip</div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5', marginBottom: '16px' }}>Join 8,000+ travelers already inspiring the world.</p>
            <Link to="/create" style={{ display: 'block', background: '#0082fb', color: 'white', padding: '11px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>Post a Trip</Link>
          </div>
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', fontSize: '0.78rem', fontWeight: '700', color: '#65676b', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #dde1e7' }}>📈 Trending Destinations</div>
            <div style={{ padding: '0 18px' }}>
              {[{ flag: '🇧🇦', name: 'Mostar, Bosnia', count: '38 trips this week', rank: '#1' }, { flag: '🇻🇳', name: 'Hội An, Vietnam', count: '31 trips this week', rank: '#2' }, { flag: '🇨🇴', name: 'Cartagena, Colombia', count: '27 trips this week', rank: '#3' }, { flag: '🇬🇪', name: 'Tbilisi, Georgia', count: '24 trips this week', rank: '#4' }].map((d, i) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 3 ? '1px solid #dde1e7' : 'none', cursor: 'pointer' }}>
                  <span style={{ fontSize: '1.4rem' }}>{d.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>{d.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#65676b' }}>{d.count}</div>
                  </div>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1rem', color: '#dde1e7' }}>{d.rank}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Explore