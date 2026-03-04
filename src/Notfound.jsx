import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#f0f2f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px' }}>
      <div>
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🗺️</div>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '3rem', letterSpacing: '-0.03em', marginBottom: '12px' }}>Lost on the map.</h1>
        <p style={{ color: '#65676b', fontSize: '1rem', fontWeight: '300', marginBottom: '32px' }}>This page doesn't exist — but the world is full of places that do.</p>
        <Link to="/" style={{ background: '#0082fb', color: 'white', padding: '12px 28px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>Take me home</Link>
      </div>
    </div>
  )
}

export default NotFound