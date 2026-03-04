import { useState } from 'react'
import { Link } from 'react-router-dom'

function CreateTrip() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    title: '', destination: '', status: 'past',
    startDate: '', endDate: '', description: '',
    tags: [], events: [{ day: 1, title: '', category: '', cost: '' }],
    flights: '', accommodation: '', activities: '', food: '', transport: '', other: '',
    transportType: '', stayType: '', stayName: '', rating: '',
  })

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function toggleTag(tag) {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag]
    }))
  }

  const totalCost = ['flights','accommodation','activities','food','transport','other']
    .reduce((sum, k) => sum + (parseFloat(form[k]) || 0), 0)

  const tags = ['🏖️ Beach','🏔️ Mountains','🌿 Nature','🏙️ City','🕌 Culture','🍜 Food','🎒 Backpacking','💎 Luxury','💸 Budget','👨‍👩‍👧 Family','💑 Couples','🧘 Wellness','🏄 Adventure','📸 Photography']

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1px solid #dde1e7', borderRadius: '8px',
    fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif',
    outline: 'none', background: 'white', color: '#1c1e21',
  }

  const labelStyle = {
    display: 'block', fontSize: '0.82rem',
    fontWeight: '500', color: '#1c1e21', marginBottom: '6px',
  }

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#f0f2f5', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            {step < totalSteps + 1 ? 'Share your trip' : ''}
          </h1>
          <p style={{ color: '#65676b', fontSize: '0.9rem', fontWeight: '300' }}>
            {step < totalSteps + 1 ? `Step ${step} of ${totalSteps}` : ''}
          </p>
        </div>

        {/* Progress bar */}
        {step <= totalSteps && (
          <div style={{ background: '#dde1e7', borderRadius: '100px', height: '4px', marginBottom: '32px' }}>
            <div style={{ background: '#0082fb', height: '100%', borderRadius: '100px', width: `${progress}%`, transition: 'width 0.3s ease' }} />
          </div>
        )}

        {/* Card */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #dde1e7', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>

          {/* ── STEP 1: BASICS ── */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.4rem', marginBottom: '24px' }}>✈️ The Basics</h2>

              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Trip Title</label>
                <input style={inputStyle} placeholder="e.g. 12 Days in Costa Rica" value={form.title} onChange={e => update('title', e.target.value)} />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Destination</label>
                <input style={inputStyle} placeholder="e.g. San José, Costa Rica" value={form.destination} onChange={e => update('destination', e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                <div>
                  <label style={labelStyle}>Start Date</label>
                  <input style={inputStyle} type="date" value={form.startDate} onChange={e => update('startDate', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>End Date</label>
                  <input style={inputStyle} type="date" value={form.endDate} onChange={e => update('endDate', e.target.value)} />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Trip Status</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['past', 'upcoming', 'ongoing'].map(s => (
                    <button key={s} onClick={() => update('status', s)} style={{ flex: 1, padding: '9px', borderRadius: '8px', border: `1.5px solid ${form.status === s ? '#0082fb' : '#dde1e7'}`, background: form.status === s ? '#e7f3ff' : 'white', color: form.status === s ? '#0082fb' : '#65676b', fontSize: '0.82rem', fontWeight: form.status === s ? '600' : '400', cursor: 'pointer', textTransform: 'capitalize' }}>{s}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Description</label>
                <textarea style={{ ...inputStyle, height: '100px', resize: 'vertical' }} placeholder="Tell your story..." value={form.description} onChange={e => update('description', e.target.value)} />
              </div>

              <div style={{ marginBottom: '8px' }}>
                <label style={labelStyle}>Trip Vibes</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {tags.map(tag => (
                    <button key={tag} onClick={() => toggleTag(tag)} style={{ padding: '6px 14px', borderRadius: '100px', border: `1.5px solid ${form.tags.includes(tag) ? '#0082fb' : '#dde1e7'}`, background: form.tags.includes(tag) ? '#e7f3ff' : 'white', color: form.tags.includes(tag) ? '#0082fb' : '#65676b', fontSize: '0.78rem', fontWeight: form.tags.includes(tag) ? '600' : '400', cursor: 'pointer' }}>{tag}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: COSTS ── */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.4rem', marginBottom: '24px' }}>💰 Cost Breakdown</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                {[
                  { key: 'flights',       label: '✈️ Flights',       placeholder: '0.00' },
                  { key: 'accommodation', label: '🏨 Accommodation',  placeholder: '0.00' },
                  { key: 'activities',    label: '🎯 Activities',     placeholder: '0.00' },
                  { key: 'food',          label: '🍜 Food & Drink',   placeholder: '0.00' },
                  { key: 'transport',     label: '🚗 Local Transport', placeholder: '0.00' },
                  { key: 'other',         label: '🛍️ Other',          placeholder: '0.00' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <input style={inputStyle} type="number" placeholder={f.placeholder} value={form[f.key]} onChange={e => update(f.key, e.target.value)} />
                  </div>
                ))}
              </div>

              {/* Total */}
              <div style={{ background: '#f0f2f5', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: '#65676b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Total Trip Cost</div>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2.5rem', color: '#1c1e21', letterSpacing: '-0.02em' }}>${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div style={{ fontSize: '0.78rem', color: '#65676b', marginTop: '4px' }}>per person</div>
              </div>
            </div>
          )}

          {/* ── STEP 3: TRANSPORT & STAY ── */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.4rem', marginBottom: '24px' }}>🚀 Transport & Stay</h2>

              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>How did you get there?</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {['✈️ Flight','🚗 Road Trip','🚂 Train','🚢 Cruise','🚌 Bus','🛵 Moped','🚲 Cycling','🚶 Walking'].map(t => (
                    <button key={t} onClick={() => update('transportType', t)} style={{ padding: '12px 8px', borderRadius: '10px', border: `1.5px solid ${form.transportType === t ? '#0082fb' : '#dde1e7'}`, background: form.transportType === t ? '#e7f3ff' : 'white', color: form.transportType === t ? '#0082fb' : '#65676b', fontSize: '0.78rem', fontWeight: form.transportType === t ? '600' : '400', cursor: 'pointer', textAlign: 'center' }}>{t}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Where did you stay?</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
                  {['🏨 Hotel','🏠 Airbnb','🏕️ Hostel','⛺ Camping','🏖️ Resort','🏡 Guesthouse','👨‍👩‍👧 Friends','🏛️ Boutique'].map(t => (
                    <button key={t} onClick={() => update('stayType', t)} style={{ padding: '12px 8px', borderRadius: '10px', border: `1.5px solid ${form.stayType === t ? '#0082fb' : '#dde1e7'}`, background: form.stayType === t ? '#e7f3ff' : 'white', color: form.stayType === t ? '#0082fb' : '#65676b', fontSize: '0.78rem', fontWeight: form.stayType === t ? '600' : '400', cursor: 'pointer', textAlign: 'center' }}>{t}</button>
                  ))}
                </div>
                <input style={inputStyle} placeholder="Property name (optional)" value={form.stayName} onChange={e => update('stayName', e.target.value)} />
              </div>

              <div>
                <label style={labelStyle}>Your rating</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['⭐ 1','⭐⭐ 2','⭐⭐⭐ 3','⭐⭐⭐⭐ 4','⭐⭐⭐⭐⭐ 5'].map(r => (
                    <button key={r} onClick={() => update('rating', r)} style={{ flex: 1, padding: '9px 4px', borderRadius: '8px', border: `1.5px solid ${form.rating === r ? '#0082fb' : '#dde1e7'}`, background: form.rating === r ? '#e7f3ff' : 'white', color: form.rating === r ? '#0082fb' : '#65676b', fontSize: '0.72rem', fontWeight: form.rating === r ? '600' : '400', cursor: 'pointer' }}>{r}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: PREVIEW ── */}
          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.4rem', marginBottom: '24px' }}>👀 Preview & Publish</h2>

              {/* Preview card */}
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #dde1e7', marginBottom: '24px' }}>
                <div style={{ height: '160px', background: 'linear-gradient(135deg, #1a8a5a, #7ab8a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
                  🌍
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: '14px', left: '16px' }}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.2rem', color: 'white' }}>{form.title || 'Your Trip Title'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)' }}>{form.destination || 'Destination'} · {form.startDate || 'Start'} – {form.endDate || 'End'}</div>
                  </div>
                  {totalCost > 0 && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '6px 12px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem' }}>${totalCost.toLocaleString()}</div>
                      <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)' }}>TOTAL</div>
                    </div>
                  )}
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <p style={{ fontSize: '0.85rem', color: '#65676b', fontWeight: '300', lineHeight: '1.6', marginBottom: '12px' }}>{form.description || 'Your trip description will appear here...'}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {form.tags.map(tag => (
                      <span key={tag} style={{ background: '#f0f2f5', color: '#65676b', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '100px', border: '1px solid #dde1e7' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Publish settings */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                  { label: 'Make this trip public', sub: 'Anyone can discover it on Explore' },
                  { label: 'Show cost breakdown',   sub: 'Help other travelers budget' },
                  { label: 'Allow comments',        sub: 'Let people ask questions' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f0f2f5', borderRadius: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{s.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#65676b' }}>{s.sub}</div>
                    </div>
                    <div style={{ width: '40px', height: '22px', background: '#0082fb', borderRadius: '100px', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ position: 'absolute', right: '3px', top: '3px', width: '16px', height: '16px', background: 'white', borderRadius: '50%' }} />
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setStep(5)} style={{ width: '100%', background: '#0082fb', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
                🚀 Publish Trip
              </button>
            </div>
          )}

          {/* ── SUCCESS ── */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.8rem', marginBottom: '12px' }}>Trip Published!</h2>
              <p style={{ color: '#65676b', fontSize: '0.9rem', fontWeight: '300', marginBottom: '32px', lineHeight: '1.7' }}>
                Your trip is now live on Roam. Travelers around the world can discover and be inspired by your adventure.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Link to="/profile" style={{ background: '#0082fb', color: 'white', padding: '12px 28px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>View My Profile</Link>
                <Link to="/explore" style={{ background: '#f0f2f5', color: '#1c1e21', padding: '12px 28px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}>Explore Trips</Link>
              </div>
            </div>
          )}

        </div>

        {/* Navigation buttons */}
        {step <= totalSteps && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button onClick={() => setStep(s => Math.max(1, s - 1))} style={{ padding: '11px 28px', borderRadius: '8px', border: '1px solid #dde1e7', background: 'white', color: '#65676b', fontSize: '0.875rem', fontWeight: '500', cursor: step === 1 ? 'not-allowed' : 'pointer', opacity: step === 1 ? 0.4 : 1 }} disabled={step === 1}>← Back</button>
            {step < totalSteps && (
              <button onClick={() => setStep(s => s + 1)} style={{ padding: '11px 28px', borderRadius: '8px', border: 'none', background: '#0082fb', color: 'white', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}>Continue →</button>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default CreateTrip