import { useEffect } from 'react'

export default function Toast({ title, message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  }

  const borderColors = {
    success: 'rgba(16, 185, 129, 0.4)',
    error: 'rgba(239, 68, 68, 0.4)',
    info: 'rgba(108, 99, 255, 0.4)'
  }

  return (
    <div style={{
      padding: '1rem 1.4rem',
      borderRadius: '12px',
      background: 'var(--card-hover-bg)',
      color: 'var(--text-primary)',
      boxShadow: 'var(--shadow-lg)',
      border: `1px solid ${borderColors[type] || borderColors.info}`,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      backdropFilter: 'blur(16px)',
      animation: 'fadeInUp 0.3s ease-out',
      minWidth: '280px',
      maxWidth: '380px'
    }}>
      <span style={{ fontSize: '1.25rem' }}>{icons[type] || 'ℹ️'}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{title}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '0.1rem' }}>{message}</div>
      </div>
      <button 
        onClick={onClose} 
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontSize: '0.85rem',
          padding: '2px',
          marginLeft: '4px'
        }}
      >
        ✕
      </button>
    </div>
  )
}
