import { useState, useEffect } from 'react'

export default function Navbar({ lang, setLang, theme, toggleTheme, t, adminMode, toggleAdminMode, onEditProfile }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: t('navHome'), id: 'home' },
    { label: t('navAbout'), id: 'about' },
    { label: t('navProjects'), id: 'projects' },
    { label: t('navCertifications'), id: 'certifications' },
    { label: t('navTimeline'), id: 'timeline' },
    { label: t('navContact'), id: 'contact' }
  ]

  const handleLangChange = (e) => {
    setLang(e.target.value)
  }

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 500,
      transition: 'all 0.3s ease',
      padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
      background: scrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Brand Logo */}
      <a href="#home" style={{
        fontSize: '1.4rem',
        fontWeight: 800,
        textDecoration: 'none',
        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.5px'
      }}>
        Rahul.dev
      </a>

      {/* Nav Actions (Links + Switchers) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Nav Links */}
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          {navLinks.map(link => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              style={{
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 600,
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                transition: 'var(--transition)'
              }}
              onMouseEnter={e => {
                e.target.style.color = 'var(--text-primary)'
                e.target.style.background = 'var(--primary-light)'
              }}
              onMouseLeave={e => {
                e.target.style.color = 'var(--text-secondary)'
                e.target.style.background = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Separator line */}
        <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)' }} />

        {/* Controls (Theme, Language) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {/* Language Switcher */}
          <select 
            value={lang} 
            onChange={handleLangChange}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              cursor: 'pointer',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600
            }}
          >
            <option value="english">EN 🌐</option>
            <option value="hindi">हिं 🌐</option>
          </select>

          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--card-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.95rem',
              transition: 'var(--transition)'
            }}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Admin Mode Switcher */}
          <button 
            onClick={toggleAdminMode}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: adminMode ? 'var(--primary-light)' : 'var(--card-bg)',
              border: '1px solid',
              borderColor: adminMode ? 'var(--primary)' : 'var(--glass-border)',
              color: adminMode ? 'var(--primary)' : 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.95rem',
              transition: 'var(--transition)'
            }}
            title={adminMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          >
            {adminMode ? '🔓' : '🔒'}
          </button>

          {adminMode && (
            <button
              onClick={onEditProfile}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '6px', whiteSpace: 'nowrap' }}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
