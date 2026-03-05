import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const [mode, setMode]       = useState('login')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const navigate              = useNavigate()

  async function handleSubmit() {
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password,
        options: { data: { full_name: name } }
      })
      if (error) setError(error.message)
      else navigate('/profile')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate('/profile')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    border: '1px solid #dde1e7', borderRadius: '8px',
    fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif',
    outline: 'none', marginBottom: '14px',
  }

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#f0f2f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2rem', color: '#1c1e21' }}>
            ro<span style={{ color: '#0082fb', fontStyle: 'italic' }}>am</span>
          </div>
          <p style={{ color: '#65676b', fontSize: '0.9rem', marginTop: '8px', fontWeight: '300' }}>
            {mode === 'login' ? 'Welcome back, traveler.' : 'Start your travel story.'}
          </p>
        </div>

        {/* Card */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #dde1e7', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', marginBottom: '24px', background: '#f0f2f5', borderRadius: '10px', padding: '4px' }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError('') }} style={{ flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: mode === m ? 'white' : 'transparent', color: mode === m ? '#1c1e21' : '#65676b', fontSize: '0.875rem', fontWeight: mode === m ? '600' : '400', cursor: 'pointer', boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', textTransform: 'capitalize' }}>{m === 'login' ? 'Sign In' : 'Sign Up'}</button>
            ))}
          </div>

          {/* Fields */}
          {mode === 'signup' && (
            <input style={inputStyle} placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
          )}
          <input style={inputStyle} placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

          {/* Error */}
          {error && (
            <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '14px' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: '#0082fb', color: 'white', border: 'none', padding: '13px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.82rem', color: '#65676b' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }} style={{ color: '#0082fb', cursor: 'pointer', fontWeight: '500' }}>
            {mode === 'login' ? 'Sign up free' : 'Sign in'}
          </span>
        </p>

      </div>
    </div>
  )
}

export default Auth