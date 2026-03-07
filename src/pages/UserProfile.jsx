import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'

function UserProfile() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

      if (!profileData) { setNotFound(true); setLoading(false); return }
      setProfile(profileData)

      const { data: tripData } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false })

      if (tripData) setTrips(tripData)
      setLoading(false)
    }
    fetchData()
  }, [id])

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', gap: '16px' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '3px solid #f0f2f5', borderTop: '3px solid #0082fb', animation: 'spin 0.8s linear infinite' }} />
      <div style={{ color: '#65676b', fontSize: '0.875rem', fontWeight: '300' }}>Loading profile...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (notFound) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', gap: '16px' }}>
      <div style={{ fontSize: '3rem' }}>🔍</div>
      <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.5rem' }}>Traveler not found</div>
      <Link to="/discover" style={{ color: '#0082fb', fontSize: '0.875rem' }}>← Back to Discover</Link>
    </div>
  )

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : profile?.username?.[0]?.toUpperCase() || '?'

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px 80px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: 'linear-gradient(135deg, #0a1628, #0f2545, #0a3d62)', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '-36px', left: '20px', width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #0082fb, #7ab8a0)', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: '700' }}>
                {initials}
              </div>
            </div>
            <div style={{ padding: '44px 20px 20px' }}>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>{profile?.full_name || profile?.username || 'Traveler'}</div>
              {profile?.username && <div style={{ fontSize: '0.82rem', color: '#65676b', marginBottom: '8px' }}>@{profile.username}</div>}
              {profile?.bio && <p style={{ fontSize: '0.82rem', color: '#1c1e21', lineHeight: '1.6', marginBottom: '10px', fontWeight: '300' }}>{profile.bio}</p>}
              {profile?.location && <div style={{ fontSize: '0.78rem', color: '#65676b', marginBottom: '16px' }}>📍 {profile.location}</div>}

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px', padding: '12px 0', borderTop: '1px solid #dde1e7', borderBottom: '1px solid #dde1e7' }}>
                {[{ n: trips.length, l: 'Trips' }, { n: '0', l: 'Followers' }, { n: '0', l: 'Following' }].map(s => (
                  <div key={s.l} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.2rem' }}>{s.n}</div>
                    <div style={{ fontSize: '0.7rem', color: '#65676b' }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <Link to="/discover" style={{ display: 'block', textAlign: 'center', background: '#f0f2f5', color: '#1c1e21', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', textDecoration: 'none' }}>
                ← Back to Discover
              </Link>
            </div>
          </div>

          {/* Destinations */}
          {trips.length > 0 && (
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', fontSize: '0.78rem', fontWeight: '700', color: '#65676b', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #dde1e7' }}>🗺️ Destinations · {trips.length}</div>
              <div style={{ padding: '0 18px' }}>
                {trips.slice(0, 5).map((trip, i) => (
                  <div key={trip.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < Math.min(trips.length, 5) - 1 ? '1px solid #dde1e7' : 'none' }}>
                    <span style={{ fontSize: '1.3rem' }}>🌍</span>
                    <div style={{ flex: 1, fontSize: '0.85rem', fontWeight: '500' }}>{trip.destination}</div>
                    <div style={{ fontSize: '0.72rem', color: '#65676b' }}>{trip.status}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <div>
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', marginBottom: '20px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #dde1e7' }}>
              <div style={{ padding: '14px 20px', fontSize: '0.85rem', fontWeight: '500', color: '#0082fb', borderBottom: '2px solid #0082fb' }}>✈️ Trips</div>
            </div>
          </div>

          {trips.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #dde1e7', padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🌍</div>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.3rem', marginBottom: '8px' }}>No trips yet</div>
              <p style={{ fontSize: '0.85rem', color: '#65676b', fontWeight: '300' }}>This traveler hasn't posted any trips yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {trips.map(card => (
                <div key={card.id} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', border: '1px solid #dde1e7', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                  <div style={{ height: '160px', background: 'linear-gradient(135deg, #1a8a5a, #7ab8a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', position: 'relative' }}>
                    🌍
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px' }}>
                      <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', color: 'white' }}>{card.destination}</div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)' }}>{card.start_date} – {card.end_date}</div>
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
                        <div style={{ fontSize: '0.68rem', color: '#65676b' }}>total trip</div>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#65676b', background: '#f0f2f5', padding: '3px 8px', borderRadius: '100px' }}>{card.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default UserProfile