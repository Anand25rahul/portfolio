export default function Hero({ t, profile }) {
  const name = profile?.name || t('heroName')
  const title = profile?.title || t('heroTitle')
  const sub = profile?.subTitle || t('heroSub')

  return (
    <section 
      id="home" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6rem 2rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
        gap: '2rem',
        flexWrap: 'wrap'
      }}
    >
      {/* Left side — Intro info */}
      <div 
        className="animate-fade-in-up"
        style={{
          flex: '1 1 500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <span className="badge badge-primary" style={{ marginBottom: '1rem', fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
          ✨ {t('heroGreeting')}
        </span>
        <h1 style={{
          fontSize: 'clamp(2.3rem, 5.5vw, 3.8rem)',
          fontWeight: 800,
          letterSpacing: '-1.5px',
          marginBottom: '0.5rem',
          lineHeight: 1.1
        }}>
          <span className="gradient-text">{name}</span>
        </h1>
        <h2 style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '1.25rem',
          letterSpacing: '-0.5px'
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
          color: 'var(--text-secondary)',
          maxWidth: '540px',
          marginBottom: '2.2rem',
          lineHeight: 1.6
        }}>
          {sub}
        </p>

        {/* Hero CTA buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#contact" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t('heroCTA')}
          </a>
          <a 
            href={profile?.linkedinUrl || "https://linkedin.com/in/rahul-anand-22a546218"} 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline" 
            style={{ textDecoration: 'none' }}
          >
            👔 LinkedIn
          </a>
          <a 
            href={profile?.githubUrl || "https://github.com/Anand25rahul"} 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline" 
            style={{ textDecoration: 'none' }}
          >
            🐙 GitHub
          </a>
          <a 
            href={profile?.cvPdf || "/RAHUL_ANAND_CV.pdf"} 
            download="RAHUL_ANAND_CV.pdf"
            className="btn btn-outline" 
            style={{ textDecoration: 'none' }}
          >
            📄 Download CV
          </a>
        </div>
      </div>

      {/* Right side — DevOps AWS abstract graphic */}
      <div 
        className="animate-float"
        style={{
          flex: '1 1 350px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{
          position: 'relative',
          width: '320px',
          height: '320px'
        }}>
          {/* Decorative glows */}
          <div style={{
            position: 'absolute',
            inset: '-10px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            opacity: 0.18,
            filter: 'blur(30px)',
            zIndex: -1
          }} />
          
          {/* Profile Photo container */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--card-bg)',
            border: '2px solid var(--glass-border)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={profile?.profilePhoto || "/profile.jpg"} 
              alt="Rahul Anand Profile" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'var(--transition)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
