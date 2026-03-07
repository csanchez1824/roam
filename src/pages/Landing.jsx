import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

const SAMPLE_TRIPS = [
  { destination: 'Kyoto, Japan', title: 'Cherry blossom season', cost: '$2,400', tags: '🌸 Culture · ✈️ Solo', emoji: '🏯', days: '10 days' },
  { destination: 'Amalfi Coast, Italy', title: 'Mediterranean summer', cost: '$3,800', tags: '🌊 Beach · 👫 Couple', emoji: '🌊', days: '8 days' },
  { destination: 'Patagonia, Chile', title: 'End of the world trek', cost: '$1,900', tags: '🏔️ Adventure · 🎒 Solo', emoji: '🏔️', days: '14 days' },
  { destination: 'Marrakech, Morocco', title: 'Medina & desert dunes', cost: '$1,200', tags: '🕌 Culture · 👨‍👩‍👧 Family', emoji: '🏜️', days: '7 days' },
  { destination: 'Bali, Indonesia', title: 'Temples & rice terraces', cost: '$1,600', tags: '🌿 Nature · 🧘 Wellness', emoji: '🌴', days: '12 days' },
  { destination: 'Cartagena, Colombia', title: 'Caribbean coast vibes', cost: '$1,100', tags: '🏖️ Beach · 🎒 Solo', emoji: '🌺', days: '9 days' },
]

function TripCard({ trip, style }) {
  return (
    <div style={{
      background: 'white', borderRadius: '16px', overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)', width: '220px', flexShrink: 0,
      border: '1px solid rgba(255,255,255,0.8)', ...style
    }}>
      <div style={{
        height: '110px', background: 'linear-gradient(135deg, #0a2a52, #1a6bb5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '2.8rem', position: 'relative'
      }}>
        {trip.emoji}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: '8px', left: '10px', color: 'white', fontFamily: 'DM Serif Display, serif', fontSize: '0.85rem' }}>{trip.destination}</div>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontWeight: '600', fontSize: '0.8rem', marginBottom: '4px', color: '#1c1e21' }}>{trip.title}</div>
        <div style={{ fontSize: '0.68rem', color: '#65676b', marginBottom: '6px' }}>{trip.tags}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', borderTop: '1px solid #f0f2f5' }}>
          <div style={{ fontWeight: '700', fontSize: '0.82rem', color: '#0082fb' }}>{trip.cost}</div>
          <div style={{ fontSize: '0.65rem', color: '#65676b' }}>{trip.days}</div>
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const [tab, setTab] = useState('signup')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Check if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/explore')
    })
  }, [])

  async function handleSubmit() {
    setLoading(true)
    setError('')
    if (tab === 'signup') {
      const { error } = await supabase.auth.signUp({
        email: form.email, password: form.password,
        options: { data: { full_name: form.name } }
      })
      if (error) { setError(error.message); setLoading(false); return }
      navigate('/explore')
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email, password: form.password
      })
      if (error) { setError(error.message); setLoading(false); return }
      navigate('/explore')
    }
    setLoading(false)
  }

  const row1 = SAMPLE_TRIPS.slice(0, 3)
  const row2 = SAMPLE_TRIPS.slice(3, 6)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', overflow: 'hidden' }}>

      {/* ── LEFT SIDE — App preview ── */}
      <div style={{
        flex: 1, background: 'linear-gradient(145deg, #0a1628 0%, #0f2545 50%, #0a3d62 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px 48px', position: 'relative', overflow: 'hidden',
      }}>

        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 4 === 0 ? '2px' : '1px', height: i % 4 === 0 ? '2px' : '1px',
            background: 'rgba(255,255,255,0.6)', borderRadius: '50%',
            top: `${(Math.sin(i * 137.5) * 0.5 + 0.5) * 100}%`,
            left: `${(Math.cos(i * 137.5) * 0.5 + 0.5) * 100}%`,
          }} />
        ))}

        {/* Logo */}
        <div style={{ marginBottom: '32px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="42" height="42" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" stroke="#7ab8fb" strokeWidth="2" fill="none"/>
              <ellipse cx="18" cy="18" rx="8" ry="16" stroke="#7ab8fb" strokeWidth="1.5" fill="none" opacity="0.4"/>
              <line x1="2" y1="18" x2="34" y2="18" stroke="#7ab8fb" strokeWidth="1.5" opacity="0.4"/>
              <path d="M8 18 L22 10 L20 18 L22 26 Z" fill="#7ab8fb" opacity="0.9"/>
              <line x1="2" y1="14" x2="10" y2="14" stroke="#7ab8fb" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
              <line x1="2" y1="18" x2="7" y2="18" stroke="#7ab8fb" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
              <line x1="2" y1="22" x2="10" y2="22" stroke="#7ab8fb" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            </svg>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2.2rem', color: 'white', letterSpacing: '-0.03em' }}>
              R<span style={{ color: '#7ab8fb', fontStyle: 'italic' }}>oam</span>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', fontWeight: '300', marginTop: '4px' }}>
            The social network for travelers
          </div>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 2, marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: 'DM Serif Display, serif', fontSize: '2.6rem',
            color: 'white', letterSpacing: '-0.03em', lineHeight: '1.15', marginBottom: '14px'
          }}>
            Share your journey.<br />
            <em style={{ color: '#7ab8fb' }}>Inspire the world.</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', fontWeight: '300', lineHeight: '1.65', maxWidth: '380px' }}>
            Real trips. Real costs. Real travelers. Discover where to go next from people who've already been there.
          </p>
        </div>

        {/* Floating trip cards — row 1 */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', animation: 'slideLeft 18s linear infinite' }}>
            {[...row1, ...row1].map((trip, i) => <TripCard key={i} trip={trip} />)}
          </div>
          <div style={{ display: 'flex', gap: '12px', animation: 'slideRight 18s linear infinite' }}>
            {[...row2, ...row2].map((trip, i) => <TripCard key={i} trip={trip} />)}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '32px', marginTop: '36px', position: 'relative', zIndex: 2 }}>
          {[{ n: '24K+', l: 'Trips' }, { n: '143', l: 'Countries' }, { n: '8K+', l: 'Travelers' }].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.4rem', color: 'white' }}>{s.n}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes slideLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes slideRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>

      {/* ── RIGHT SIDE — Auth form ── */}
      <div style={{
        width: '420px', flexShrink: 0, background: 'white',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px 48px', borderLeft: '1px solid #dde1e7'
      }}>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.8rem', letterSpacing: '-0.02em', marginBottom: '6px' }}>
            {tab === 'signup' ? 'Start exploring' : 'Welcome back'}
          </h2>
          <p style={{ color: '#65676b', fontSize: '0.875rem', fontWeight: '300' }}>
            {tab === 'signup' ? 'Create your free account today' : 'Sign in to your Roam account'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#f0f2f5', borderRadius: '10px', padding: '4px', marginBottom: '24px' }}>
          {['signup', 'login'].map(t => (
            <button key={t} onClick={() => { setTab(t); setError('') }} style={{
              flex: 1, padding: '9px', borderRadius: '8px', border: 'none',
              background: tab === t ? 'white' : 'transparent',
              color: tab === t ? '#1c1e21' : '#65676b',
              fontWeight: tab === t ? '600' : '400',
              fontSize: '0.875rem', cursor: 'pointer',
              boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              {t === 'signup' ? 'Sign Up' : 'Log In'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {tab === 'signup' && (
            <input
              placeholder="Full name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              style={inputStyle}
            />
          )}
          <input
            placeholder="Email address"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            style={inputStyle}
          />
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={inputStyle}
          />

          {error && (
            <div style={{ background: '#fff0f0', border: '1px solid #ffcdd2', borderRadius: '8px', padding: '10px 14px', fontSize: '0.8rem', color: '#c62828' }}>
              {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} style={{
            background: '#0082fb', color: 'white', border: 'none',
            padding: '13px', borderRadius: '10px', fontSize: '0.9rem',
            fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, fontFamily: 'DM Sans, sans-serif',
            marginTop: '4px',
          }}>
            {loading ? '...' : tab === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </div>

        {/* Switch tab */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.82rem', color: '#65676b' }}>
          {tab === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => { setTab(tab === 'signup' ? 'login' : 'signup'); setError('') }} style={{ color: '#0082fb', fontWeight: '600', cursor: 'pointer' }}>
            {tab === 'signup' ? 'Log in' : 'Sign up'}
          </span>
        </div>

        {/* Continue without account */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span onClick={() => navigate('/explore')} style={{ fontSize: '0.78rem', color: '#65676b', cursor: 'pointer', textDecoration: 'underline' }}>
            Browse without an account
          </span>
        </div>

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #f0f2f5', fontSize: '0.72rem', color: '#bcc0c4', textAlign: 'center', lineHeight: '1.6' }}>
          By signing up you agree to Roam's Terms of Service and Privacy Policy
        </div>
      </div>

    </div>
  )
}

const inputStyle = {
  padding: '12px 14px', border: '1px solid #dde1e7', borderRadius: '10px',
  fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', outline: 'none',
  background: 'white', color: '#1c1e21', width: '100%',
}