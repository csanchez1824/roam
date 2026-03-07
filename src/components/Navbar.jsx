import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useEffect, useState } from 'react'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (location.pathname === '/auth') return null

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#ffffff', borderBottom: '1px solid #dde1e7',
      height: '60px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 28px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.10)',
      fontFamily: 'DM Sans, sans-serif',
    }}>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1c1e21' }}>
          ro<span style={{ color: '#0082fb', fontStyle: 'italic' }}>am</span>
        </span>
      </Link>

      {/* Desktop links */}
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/explore" style={linkStyle}>Explore</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
        {user ? (
          <>
            <Link to="/create" style={{ background: '#0082fb', color: 'white', padding: '8px 20px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none', marginLeft: '8px' }}>✚ Post a Trip</Link>
            <button onClick={handleSignOut} style={{ background: 'none', border: '1px solid #dde1e7', padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500', color: '#65676b', cursor: 'pointer', marginLeft: '4px' }}>Sign Out</button>
          </>
        ) : (
          <Link to="/auth" style={{ background: '#0082fb', color: 'white', padding: '8px 20px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none', marginLeft: '8px' }}>Sign In</Link>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="nav-mobile"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#1c1e21' }}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '60px', left: 0, right: 0,
          background: 'white', borderBottom: '1px solid #dde1e7',
          padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 99,
        }}>
          <Link to="/" onClick={() => setMenuOpen(false)} style={mobileLinkStyle}>Home</Link>
          <Link to="/explore" onClick={() => setMenuOpen(false)} style={mobileLinkStyle}>Explore</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)} style={mobileLinkStyle}>Profile</Link>
          {user ? (
            <>
              <Link to="/create" onClick={() => setMenuOpen(false)} style={{ ...mobileLinkStyle, color: '#0082fb', fontWeight: '600' }}>✚ Post a Trip</Link>
              <button onClick={handleSignOut} style={{ background: 'none', border: 'none', padding: '8px 0', fontSize: '0.9rem', color: '#65676b', cursor: 'pointer', textAlign: 'left' }}>Sign Out</button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMenuOpen(false)} style={{ ...mobileLinkStyle, color: '#0082fb', fontWeight: '600' }}>Sign In</Link>
          )}
        </div>
      )}

    </nav>
  )
}

const linkStyle = {
  padding: '8px 14px', borderRadius: '8px',
  fontSize: '0.875rem', fontWeight: '500',
  color: '#65676b', textDecoration: 'none',
}

const mobileLinkStyle = {
  fontSize: '0.9rem', fontWeight: '500',
  color: '#1c1e21', textDecoration: 'none',
  padding: '8px 0',
}

export default Navbar