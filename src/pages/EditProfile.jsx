import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function EditProfile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    username: '',
    full_name: '',
    bio: '',
    location: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setForm({
          username: data.username || '',
          full_name: data.full_name || user.user_metadata?.full_name || '',
          bio: data.bio || '',
          location: data.location || '',
        })
      } else {
        setForm(f => ({
          ...f,
          full_name: user.user_metadata?.full_name || '',
        }))
      }
      setLoading(false)
    }
    fetchProfile()
  }, [])

  async function handleSave() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username: form.username,
        full_name: form.full_name,
        bio: form.bio,
        location: form.location,
        created_at: new Date().toISOString(),
      })

    if (error) {
      alert('Error saving profile: ' + error.message)
    } else {
      navigate('/profile')
    }
    setSaving(false)
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: '1px solid #dde1e7', borderRadius: '8px',
    fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif',
    outline: 'none', background: 'white', color: '#1c1e21',
  }

  const labelStyle = {
    display: 'block', fontSize: '0.82rem',
    fontWeight: '500', color: '#1c1e21', marginBottom: '6px',
  }

  if (loading) return (
  <div style={{
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', gap: '16px'
  }}>
    <div style={{
      width: '44px', height: '44px', borderRadius: '50%',
      border: '3px solid #f0f2f5',
      borderTop: '3px solid #0082fb',
      animation: 'spin 0.8s linear infinite'
    }} />
    <div style={{ color: '#65676b', fontSize: '0.875rem', fontWeight: '300' }}>Loading profile...</div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#f0f2f5', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: '6px' }}>Edit Profile</h1>
          <p style={{ color: '#65676b', fontSize: '0.9rem', fontWeight: '300' }}>Update your traveler profile</p>
        </div>

        {/* Card */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #dde1e7', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>

          {/* Avatar preview */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #dde1e7' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #0082fb, #7ab8a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: '700', flexShrink: 0 }}>
              {form.full_name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem' }}>{form.full_name || 'Your Name'}</div>
              <div style={{ fontSize: '0.82rem', color: '#65676b' }}>@{form.username || 'username'}</div>
            </div>
          </div>

          {/* Form fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            <div>
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle} placeholder="Your full name" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} />
            </div>

            <div>
              <label style={labelStyle}>Username</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#65676b', fontSize: '0.875rem' }}>@</span>
                <input style={{ ...inputStyle, paddingLeft: '28px' }} placeholder="yourhandle" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value.toLowerCase().replace(/\s/g, '') }))} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Bio</label>
              <textarea style={{ ...inputStyle, height: '100px', resize: 'vertical' }} placeholder="Tell travelers about yourself..." value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
            </div>

            <div>
              <label style={labelStyle}>Location</label>
              <input style={inputStyle} placeholder="e.g. Austin, TX" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </div>

          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #dde1e7' }}>
            <button onClick={() => navigate('/profile')} style={{ flex: 1, padding: '11px', borderRadius: '8px', border: '1px solid #dde1e7', background: 'white', color: '#65676b', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: '11px', borderRadius: '8px', border: 'none', background: '#0082fb', color: 'white', fontSize: '0.875rem', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditProfile