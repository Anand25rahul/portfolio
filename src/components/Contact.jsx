import { useState } from 'react'

export default function Contact({ t, onSuccess, onError }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validations
    if (!form.name || !form.email || !form.subject || !form.message) {
      return onError(t('toastErrorTitle'), t('toastErrorMsg'))
    }
    if (!form.email.includes('@')) {
      return onError(t('toastErrorTitle'), 'Please enter a valid email address.')
    }

    setLoading(true)

    // Submit to Express backend API
    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        if (res.success) {
          onSuccess(t('toastSuccessTitle'), t('toastSuccessMsg'))
          setForm({ name: '', email: '', subject: '', message: '' })
        } else {
          onError(t('toastErrorTitle'), res.message || 'Failed to send message.')
        }
      })
      .catch(err => {
        setLoading(false)
        onError(t('toastErrorTitle'), 'Network error. Please try again.')
        console.error('Submit message error:', err)
      })
  }

  return (
    <section 
      id="contact" 
      style={{
        padding: '5rem 2rem 8rem',
        maxWidth: '700px',
        margin: '0 auto'
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>{t('contactTitle')}</h2>
        <p>{t('contactSub')}</p>
      </div>

      {/* Form Glass Card */}
      <div className="glass-card" style={{ borderColor: 'rgba(255, 101, 132, 0.2)' }}>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.2rem' }}>
            {/* Name */}
            <div className="form-group">
              <label className="form-label">{t('formName')}</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder={t('formPlaceholderName')}
                className="form-input"
                required
              />
            </div>
            
            {/* Email */}
            <div className="form-group">
              <label className="form-label">{t('formEmail')}</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder={t('formPlaceholderEmail')}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div className="form-group">
            <label className="form-label">{t('formSubject')}</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={onChange}
              placeholder={t('formPlaceholderSubject')}
              className="form-input"
              required
            />
          </div>

          {/* Message */}
          <div className="form-group" style={{ marginBottom: '1.8rem' }}>
            <label className="form-label">{t('formMessage')}</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder={t('formPlaceholderMessage')}
              className="form-input"
              style={{ minHeight: '120px', resize: 'vertical' }}
              required
            />
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.85rem' }}
            disabled={loading}
          >
            {loading ? <span className="spinner spinner-sm" style={{ marginRight: '6px' }} /> : '✉️ '}
            {loading ? t('formSubmitting') : t('formSubmit')}
          </button>
        </form>
      </div>
    </section>
  )
}
