import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="hero-grid" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* ── HERO ── */}
      <section className="hero-grid" style={{
  minHeight: '100vh',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
        background: '#ffffff',
      }}>

        {/* Left side — text */}
        <div className="hero-text" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 64px 80px 80px',
        }}>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#e7f3ff',
            color: '#0064e0',
            fontSize: '0.78rem',
            fontWeight: '500',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '6px 14px',
            borderRadius: '100px',
            marginBottom: '32px',
            width: 'fit-content',
          }}>
            ✈️ Your travel story, beautifully told
          </div>

          <h1 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: '4rem',
            lineHeight: '1.08',
            letterSpacing: '-0.03em',
            color: '#1c1e21',
            marginBottom: '24px',
          }}>
            Every trip<br />deserves to be<br />
            <em style={{ color: '#0082fb' }}>remembered.</em>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            lineHeight: '1.7',
            color: '#65676b',
            maxWidth: '420px',
            marginBottom: '48px',
            fontWeight: '300',
          }}>
            Share where you went, what you did, and what it cost — 
            and inspire thousands of travelers to follow in your footsteps.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/create" style={{
              background: '#1c1e21',
              color: 'white',
              padding: '15px 32px',
              borderRadius: '100px',
              fontSize: '0.95rem',
              fontWeight: '500',
              textDecoration: 'none',
            }}>
              Start your journey
            </Link>
            <Link to="/explore" style={{
              color: '#1c1e21',
              fontSize: '0.9rem',
              textDecoration: 'none',
              opacity: '0.7',
            }}>
              See how it works →
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '48px',
            marginTop: '64px',
            paddingTop: '40px',
            borderTop: '1px solid #e4e1da',
          }}>
            {[
              { num: '24k+', label: 'Trips shared' },
              { num: '8.3k', label: 'Travel creators' },
              { num: '140+', label: 'Countries covered' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'DM Serif Display, serif',
                  fontSize: '2rem',
                  color: '#1c1e21',
                  letterSpacing: '-0.02em',
                }}>{stat.num}</div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#65676b',
                  marginTop: '2px',
                  fontWeight: '300',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — trip cards collage */}
        <div className="hero-grid" style={{
          background: '#f8f7f4',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '12px',
          padding: '40px 40px 40px 24px',
        }}>
          {[
            { emoji: '🌿', dest: 'Costa Rica', user: '@mia.travels', days: '12 days', bg: 'linear-gradient(135deg, #7ab8a0, #2a6b4f)', gridRow: '1 / 3' },
            { emoji: '🏜️', dest: 'Morocco',    user: '@jaden.roams', days: '9 days',  bg: 'linear-gradient(135deg, #e8c99a, #b07a3c)' },
            { emoji: '🌊', dest: 'Santorini',  user: '@lunaaway',    days: '6 days',  bg: 'linear-gradient(135deg, #a8c4e0, #2e6494)' },
          ].map(card => (
            <div key={card.dest} style={{
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              background: card.bg,
              gridRow: card.gridRow || 'auto',
              cursor: 'pointer',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
              }} />
              <div style={{
                position: 'absolute',
                fontSize: '4rem',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -60%)',
              }}>{card.emoji}</div>
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '16px', zIndex: 2,
              }}>
                <div style={{
                  fontFamily: 'DM Serif Display, serif',
                  fontSize: '1rem', color: 'white',
                }}>{card.dest}</div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.75)',
                  marginTop: '4px',
                }}>{card.user} · {card.days}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '120px 80px', background: '#ffffff' }}>
        <div style={{
          fontSize: '0.78rem', fontWeight: '500',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#0082fb', marginBottom: '16px',
        }}>How it works</div>
        <h2 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: '3rem', letterSpacing: '-0.03em',
          lineHeight: '1.15', marginBottom: '80px',
        }}>
          Three steps to your <em style={{ color: '#0082fb' }}>travel profile.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
          {[
            { num: '01', title: 'Create your account', desc: 'Sign up for free and build your personal travel profile. Add a photo, write your bio, and let the world know where you\'ve been.' },
            { num: '02', title: 'Log your trips',       desc: 'For each vacation, add your destination, daily events, where you stayed, how you got around, and a full cost breakdown.' },
            { num: '03', title: 'Build your following', desc: 'Get discovered on the Explore page, gain followers, and become a trusted source of inspiration for travelers everywhere.' },
          ].map(step => (
            <div key={step.num}>
              <div style={{
                fontFamily: 'DM Serif Display, serif',
                fontSize: '3.5rem', color: '#e4e1da', lineHeight: 1, marginBottom: '20px',
              }}>{step.num}</div>
              <h3 style={{
                fontFamily: 'DM Serif Display, serif',
                fontSize: '1.35rem', letterSpacing: '-0.02em', marginBottom: '12px',
              }}>{step.title}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.8', color: '#65676b', fontWeight: '300' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: '#1c1e21', padding: '120px 80px', textAlign: 'center',
      }}>
        <div style={{
          fontSize: '0.78rem', fontWeight: '500', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#e7f3ff', marginBottom: '16px',
        }}>Join Roam</div>
        <h2 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: '3.5rem', color: 'white',
          letterSpacing: '-0.03em', lineHeight: '1.1',
          marginBottom: '24px',
        }}>
          Your next trip is someone's{' '}
          <em style={{ color: '#7ab8a0' }}>dream trip.</em>
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.5)', fontSize: '1rem',
          fontWeight: '300', marginBottom: '48px', lineHeight: '1.7',
        }}>
          Join thousands of travelers sharing real experiences and real inspiration.
        </p>
        <Link to="/create" style={{
          background: '#0082fb', color: 'white',
          padding: '15px 36px', borderRadius: '100px',
          fontSize: '0.95rem', fontWeight: '600',
          textDecoration: 'none',
        }}>
          Get started free
        </Link>
      </section>

    </div>
  )
}

export default Landing