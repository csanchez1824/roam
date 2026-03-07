import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'

function Discover() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    if (!search.trim()) return
    setLoading(true)
    setSearched(true)

    const { data } = await supabase
      .from('profiles_with_trips')
      .select('*')
      .or(`username.ilike.%${search}%,full_name.ilike.%${search}%`)
      .limit(20)

    setResults(data || [])
    setLoading(false)
  }

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#f0f2f5', minHeight: '100vh' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2545 40%, #0a3d62 100%)', padding: '64px 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2.8rem', color: 'white', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          Find your fellow <em style={{ color: '#7ab8fb' }}>travelers.</em>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', fontWeight: '300', marginBottom: '32px' }}>
          Search by name or username to discover people who love to travel
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', maxWidth: '520px', margin: '0 auto' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or @username..."
            style={{
              flex: 1, padding: '13px 18px', borderRadius: '10px',
              border: 'none', fontSize: '0.9rem',
              fontFamily: 'DM Sans, sans-serif', outline: 'none',
            }}
          />
          <button type="submit" style={{
            background: '#0082fb', color: 'white', border: 'none',
            padding: '13px 24px', borderRadius: '10px',
            fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer',
          }}>
            Search
          </button>
        </form>
      </div>

      {/* RESULTS */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '60px 0' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '3px solid #f0f2f5', borderTop: '3px solid #0082fb', animation: 'spin 0.8s linear infinite' }} />
            <div style={{ color: '#65676b', fontSize: '0.875rem' }}>Searching travelers...</div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* No results */}
        {!loading && searched && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px', border: '1px solid #dde1e7' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.3rem', marginBottom: '8px' }}>No travelers found</div>
            <p style={{ color: '#65676b', fontSize: '0.875rem', fontWeight: '300' }}>Try a different name or username</p>
          </div>
        )}

        {/* Default state */}
        {!loading && !searched && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🌍</div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.3rem', marginBottom: '8px', color: '#1c1e21' }}>Search for travelers</div>
            <p style={{ color: '#65676b', fontSize: '0.875rem', fontWeight: '300' }}>Find people who share your passion for travel</p>
          </div>
        )}

        {/* Results grid */}
        {!loading && results.length > 0 && (
          <div>
            <div style={{ fontSize: '0.82rem', color: '#65676b', marginBottom: '16px' }}>{results.length} traveler{results.length !== 1 ? 's' : ''} found</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {results.map(person => {
                const initials = person.full_name
                  ? person.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
                  : person.username?.[0]?.toUpperCase() || '?'
                const tripCount = person.trip_count || 0

                return (
                  <Link key={person.id} to={`/user/${person.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'}
                    >
                      {/* Avatar */}
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #0082fb, #7ab8a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem', fontWeight: '700', flexShrink: 0 }}>
                        {initials}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1c1e21', marginBottom: '2px' }}>{person.full_name || person.username || 'Traveler'}</div>
                        {person.username && <div style={{ fontSize: '0.78rem', color: '#65676b', marginBottom: '4px' }}>@{person.username}</div>}
                        {person.bio && <div style={{ fontSize: '0.78rem', color: '#65676b', fontWeight: '300', marginBottom: '4px' }}>{person.bio.slice(0, 80)}{person.bio.length > 80 ? '...' : ''}</div>}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                          {person.location && <span style={{ fontSize: '0.72rem', color: '#65676b' }}>📍 {person.location}</span>}
                          <span style={{ fontSize: '0.72rem', color: '#65676b' }}>✈️ {tripCount} trip{tripCount !== 1 ? 's' : ''}</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div style={{ color: '#dde1e7', fontSize: '1.2rem' }}>→</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Discover