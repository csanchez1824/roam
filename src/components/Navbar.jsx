import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useEffect, useState } from 'react'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

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

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/explore" style={linkStyle}>Explore</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
        {user ? (
          <>
            <Link to="/create" style={{
              background: '#0082fb', color: 'white',
              padding: '8px 20px', borderRadius: '8px',
              fontSize: '0.875rem', fontWeight: '600',
              textDecoration: 'none', marginLeft: '8px',
            }}>✚ Post a Trip</Link>
            <button onClick={handleSignOut} style={{
              background: 'none', border: '1px solid #dde1e7',
              padding: '8px 16px', borderRadius: '8px',
              fontSize: '0.875rem', fontWeight: '500',
              color: '#65676b', cursor: 'pointer', marginLeft: '4px',
            }}>Sign Out</button>
          </>
        ) : (
          <Link to="/auth" style={{
            background: '#0082fb', color: 'white',
            padding: '8px 20px', borderRadius: '8px',
            fontSize: '0.875rem', fontWeight: '600',
            textDecoration: 'none', marginLeft: '8px',
          }}>Sign In</Link>
        )}
      </div>

    </nav>
  )
}

const linkStyle = {
  padding: '8px 14px', borderRadius: '8px',
  fontSize: '0.875rem', fontWeight: '500',
  color: '#65676b', textDecoration: 'none',
}

export default Navbar