import { Link } from 'react-router-dom'

function Explore() {
  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#f0f2f5', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #0f2545 40%, #0a3d62 100%)',
        padding: '64px 56px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        minHeight: '380px',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Stars background */}
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 3 === 0 ? '2px' : '1px',
            height: i % 3 === 0 ? '2px' : '1px',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '50%',
            top: `${Math.sin(i * 137.5) * 50 + 50}%`,
            left: `${Math.cos(i * 137.5) * 50 + 50}%`,
          }} />
        ))}

        {/* Left — text */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.75rem', fontWeight: '500',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '6px 14px', borderRadius: '100px',
            marginBottom: '20px',
          }}>
            <span style={{ width: '6px', height: '6px', background: '#31a24c', borderRadius: '50%', display: 'inline-block' }} />
            Live · Updated daily
          </div>

          <h1 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: '3rem', color: 'white',
            letterSpacing: '-0.03em', lineHeight: '1.1',
            marginBottom: '12px',
          }}>
            Discover trips from<br />
            travelers <em style={{ color: '#7ab8fb' }}>just like you.</em>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.55)', fontSize: '1rem',
            fontWeight: '300', maxWidth: '420px',
            lineHeight: '1.65', marginBottom: '32px',
          }}>
            Real destinations. Real costs. Real people who've already been there.
          </p>

          {/* Stats bar */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '12px', overflow: 'hidden',
          }}>
            {[
              { n: '24,817', l: 'Trips Posted' },
              { n: '143',    l: 'Countries' },
              { n: '8,302',  l: 'Travelers' },
              { n: '$1,840', l: 'Avg Cost' },
            ].map((s, i) => (
              <div key={s.l} style={{
                padding: '14px 24px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.4rem', color: 'white' }}>{s.n}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — globe placeholder (animated) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '260px', height: '260px', borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #1a6bb5, #0a2a52 60%, #040f1a)',
            boxShadow: '0 0 60px rgba(26,107,181,0.4), inset 0 0 40px rgba(0,0,0,0.5)',
            position: 'relative',
            animation: 'globeSpin 20s linear infinite',
          }}>
            {/* Continent blobs */}
            {[
              { top: '25%', left: '20%', w: '30%', h: '25%', r: '60% 40% 50% 50%' },
              { top: '55%', left: '15%', w: '20%', h: '20%', r: '50% 50% 40% 60%' },
              { top: '20%', left: '55%', w: '35%', h: '30%', r: '50% 60% 40% 50%' },
              { top: '50%', left: '50%', w: '25%', h: '30%', r: '40% 60% 50% 50%' },
              { top: '35%', left: '75%', w: '18%', h: '22%', r: '55% 45% 50% 50%' },
            ].map((c, i) => (
              <div key={i} style={{
                position: 'absolute',
                top: c.top, left: c.left,
                width: c.w, height: c.h,
                background: 'rgba(45,122,79,0.85)',
                borderRadius: c.r,
              }} />
            ))}
            {/* Atmosphere glow */}
            <div style={{
              position: 'absolute', inset: '-8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, transparent 55%, rgba(26,107,181,0.2) 100%)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>

      </div>

      {/* ── FILTER TABS ── */}
      <div style={{
        background: 'white', borderBottom: '1px solid #dde1e7',
        padding: '0 28px', position: 'sticky', top: '60px', zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
          {['🔥 Trending', '✨ Featured', '🆕 Newest', '💸 Budget', '💎 Luxury', '🎒 Solo', '👨‍👩‍👧 Family'].map((tab, i) => (
            <div key={tab} style={{
              padding: '16px 20px',
              fontSize: '0.85rem', fontWeight: '500',
              color: i === 0 ? '#0082fb' : '#65676b',
              borderBottom: i === 0 ? '2px solid #0082fb' : '2px solid transparent',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>{tab}</div>
          ))}
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '28px 24px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        gap: '24px',
      }}>

        {/* MAIN FEED */}
        <div>

          {/* Featured trip */}
          <div style={{ marginBottom: '8px' }}>
            <h2 style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: '1.3rem', marginBottom: '16px',
            }}>⭐ Trip of the Week</h2>
          </div>

          <div style={{
            borderRadius: '14px', overflow: 'hidden',
            background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
            marginBottom: '24px', cursor: 'pointer',
          }}>
            <div style={{
              height: '280px', position: 'relative',
              background: 'linear-gradient(135deg, #1a8a5a, #7ab8a0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '6rem',
            }}>
              🌿
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 50%)' }} />
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                {['🌿 Nature', '🏄 Adventure', '💸 Budget'].map(tag => (
                  <span key={tag} style={{
                    background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                    color: 'white', fontSize: '0.72rem', padding: '4px 10px',
                    borderRadius: '100px', border: '1px solid rgba(255,255,255,0.25)',
                  }}>{tag}</span>
                ))}
              </div>
              <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 14px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.2rem' }}>$2,700</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>12 days</div>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 2 }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.8rem', color: 'white', marginBottom: '6px' }}>12 Days in Costa Rica</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>@mia.travels · Mar 4–16, 2025 · ❤️ 1,247 likes</div>
              </div>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #dde1e7' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['❤️ 1,247', '💬 83', '🔗 Share', '🔖 Save'].map(btn => (
                  <button key={btn} style={{ background: 'none', border: 'none', padding: '7px 10px', borderRadius: '7px', fontSize: '0.8rem', color: '#65676b', cursor: 'pointer' }}>{btn}</button>
                ))}
              </div>
              <button style={{ background: '#e7f3ff', color: '#0082fb', border: '1.5px solid #0082fb', padding: '7px 18px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}>Follow @mia.travels</button>
            </div>
          </div>

          {/* Trip grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { emoji: '🏜️', dest: 'Marrakech, Morocco', days: '9 days', user: 'Jaden Reyes', handle: '@jaden.roams', tags: ['🕌 Culture', '🍜 Food'], cost: '$1,740', bg: 'linear-gradient(135deg, #e8c99a, #b07a3c)', av: 'J', avBg: 'linear-gradient(135deg, #c45070, #f7b8c4)' },
              { emoji: '🌊', dest: 'Santorini, Greece',  days: '6 days', user: 'Luna Vasquez', handle: '@lunaaway',    tags: ['💎 Luxury', '⛵ Boat'],   cost: '$2,780', bg: 'linear-gradient(135deg, #a8c4e0, #2e6494)', av: 'L', avBg: 'linear-gradient(135deg, #7a4a70, #d4b8c7)' },
              { emoji: '🌸', dest: 'Kyoto, Japan',       days: '10 days', user: 'Kai Nakamura', handle: '@nomad.kai',   tags: ['⛩️ Temples', '🚄 Train'], cost: '$2,870', bg: 'linear-gradient(135deg, #f7b8c4, #c45070)', av: 'K', avBg: 'linear-gradient(135deg, #e8c99a, #b07a3c)' },
              { emoji: '🏔️', dest: 'Cusco, Peru',        days: '8 days',  user: 'Sara Osei',    handle: '@sara.wanders', tags: ['🏔️ Hiking', '🎒 Trek'],  cost: '$1,920', bg: 'linear-gradient(135deg, #d4b8c7, #7a4a70)', av: 'S', avBg: 'linear-gradient(135deg, #2e6494, #a8c4e0)' },
              { emoji: '🌋', dest: 'Reykjavik, Iceland', days: '7 days',  user: 'Thomas Bell',  handle: '@arctic.tom',   tags: ['🌌 Aurora', '🚗 Drive'],  cost: '$3,100', bg: 'linear-gradient(135deg, #6c7a89, #2c3e50)', av: 'T', avBg: 'linear-gradient(135deg, #1a8a5a, #7ab8a0)' },
              { emoji: '🌴', dest: 'Bali, Indonesia',    days: '14 days', user: 'Aisha Diallo',  handle: '@aisha.far',    tags: ['🧘 Wellness', '🌿 Nature'], cost: '$1,580', bg: 'linear-gradient(135deg, #7ab8a0, #1a8a5a)', av: 'A', avBg: 'linear-gradient(135deg, #0082fb, #7ab8a0)' },
            ].map(card => (
              <div key={card.dest} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', border: '1px solid #dde1e7', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                <div style={{ height: '150px', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative' }}>
                  {card.emoji}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1rem', color: 'white' }}>{card.dest}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.75)' }}>{card.days}</div>
                  </div>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: card.avBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: '600' }}>{card.av}</div>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: '500' }}>{card.user}</div>
                      <div style={{ fontSize: '0.72rem', color: '#65676b' }}>{card.handle}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    {card.tags.map(tag => (
                      <span key={tag} style={{ background: '#f0f2f5', color: '#65676b', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '100px', border: '1px solid #dde1e7' }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #dde1e7' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{card.cost}</div>
                      <div style={{ fontSize: '0.68rem', color: '#65676b' }}>per person</div>
                    </div>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', color: '#65676b' }}>❤️ Like</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Join CTA */}
          <div style={{ background: 'linear-gradient(135deg, #0a1628, #0f2545)', borderRadius: '14px', padding: '24px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✈️</div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', color: 'white', marginBottom: '6px' }}>Share your own trip</div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5', marginBottom: '16px' }}>Join 8,000+ travelers already inspiring the world.</p>
            <Link to="/create" style={{ display: 'block', background: '#0082fb', color: 'white', padding: '11px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none', marginBottom: '8px' }}>Create a free account</Link>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Already a member? <a href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>Sign in</a></div>
          </div>

          {/* Trending destinations */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', fontSize: '0.78rem', fontWeight: '700', color: '#65676b', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #dde1e7' }}>📈 Trending Destinations</div>
            <div style={{ padding: '0 18px' }}>
              {[
                { flag: '🇧🇦', name: 'Mostar, Bosnia',      count: '38 trips this week', rank: '#1' },
                { flag: '🇻🇳', name: 'Hội An, Vietnam',     count: '31 trips this week', rank: '#2' },
                { flag: '🇨🇴', name: 'Cartagena, Colombia', count: '27 trips this week', rank: '#3' },
                { flag: '🇬🇪', name: 'Tbilisi, Georgia',    count: '24 trips this week', rank: '#4' },
                { flag: '🇪🇹', name: 'Addis Ababa, Ethiopia', count: '19 trips this week', rank: '#5' },
              ].map((d, i) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 4 ? '1px solid #dde1e7' : 'none', cursor: 'pointer' }}>
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

          {/* Suggested travelers */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', fontSize: '0.78rem', fontWeight: '700', color: '#65676b', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #dde1e7' }}>👤 Travelers to Follow</div>
            <div style={{ padding: '0 18px' }}>
              {[
                { av: 'J', bg: 'linear-gradient(135deg, #c45070, #f7b8c4)', name: 'Jaden Reyes',   handle: '@jaden.roams', trips: '12 trips · 4.1k followers' },
                { av: 'L', bg: 'linear-gradient(135deg, #7a4a70, #d4b8c7)', name: 'Luna Vasquez',  handle: '@lunaaway',    trips: '9 trips · 6.7k followers' },
                { av: 'K', bg: 'linear-gradient(135deg, #e8c99a, #b07a3c)', name: 'Kai Nakamura',  handle: '@nomad.kai',   trips: '21 trips · 9.2k followers' },
                { av: 'S', bg: 'linear-gradient(135deg, #2e6494, #a8c4e0)', name: 'Sara Osei',     handle: '@sara.wanders', trips: '16 trips · 3.8k followers' },
              ].map((t, i) => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < 3 ? '1px solid #dde1e7' : 'none' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', flexShrink: 0 }}>{t.av}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{t.name}</div>
                    <div style={{ fontSize: '0.73rem', color: '#65676b' }}>{t.handle}</div>
                    <div style={{ fontSize: '0.7rem', color: '#65676b' }}>{t.trips}</div>
                  </div>
                  <button style={{ background: '#e7f3ff', color: '#0082fb', border: '1.5px solid #0082fb', padding: '5px 14px', borderRadius: '7px', fontSize: '0.76rem', fontWeight: '600', cursor: 'pointer' }}>Follow</button>
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