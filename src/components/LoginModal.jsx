import { useState } from 'react'

export default function LoginModal({ onClose, onLoginSuccess, onError }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        if (res.success) {
          onLoginSuccess()
          onClose()
        } else {
          onError('Authentication Failed', res.message || 'Invalid username or password.')
        }
      })
      .catch(err => {
        setLoading(false)
        onError('Network Error', 'Could not reach database.')
        console.error('Login Error:', err)
      })
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div 
        className="glass-card" 
        style={{
          width: '100%',
          maxWidth: '380px',
          padding: '2.5rem 2rem',
          position: 'relative',
          borderColor: 'var(--primary-light)',
          textAlign: 'center',
          animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
        >
          ✕
        </button>

        {/* Title */}
        <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🔒</div>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Admin Edit Access</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.8rem' }}>
          Enter credentials to unlock edit controls.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Username / ID</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="form-input" 
              placeholder="e.g. anand" 
              required 
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="form-input" 
              placeholder="••••••" 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.65rem' }} disabled={loading}>
            {loading ? <span className="spinner spinner-sm" /> : 'Unlock Controls'}
          </button>
        </form>
      </div>
    </div>
  )
}
