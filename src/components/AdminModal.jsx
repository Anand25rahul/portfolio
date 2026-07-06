import { useState, useEffect } from 'react'

export default function AdminModal({ type, item, onClose, onSaveSuccess, onError }) {
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)

  // Initialize form fields based on type & edit state
  useEffect(() => {
    if (item) {
      setForm({ ...item, tags: item.tags ? item.tags.join(', ') : '' })
    } else {
      // Default empty structures
      if (type === 'project') {
        setForm({ title: '', desc: '', tags: '', category: 'web', icon: '📁', demoLink: '#', codeLink: '#' })
      } else if (type === 'skill') {
        setForm({ name: '', category: 'frontend', level: 80, icon: '⚡' })
      } else if (type === 'certification') {
        setForm({ title: '', issuer: '', icon: '📜', url: '#', credentialId: '' })
      } else if (type === 'timeline') {
        setForm({ year: '', title: '', subtitle: '', description: '', order: 1 })
      } else if (type === 'profile') {
        setForm({ name: '', title: '', subTitle: '', aboutBio: '', email: '', linkedinUrl: '', githubUrl: '' })
      }
    }
  }, [type, item])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, profilePhoto: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleCvFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, cvPdf: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Prepare body
    const body = { ...form }
    if (type === 'project' && typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    const isProfile = type === 'profile'
    const endpoint = `/api/${isProfile ? 'profile' : (type === 'timeline' ? 'timeline' : type + 's')}`
    const url = (item && !isProfile) ? `${endpoint}/${item._id || item.id}` : endpoint
    const method = isProfile ? 'PUT' : (item ? 'PUT' : 'POST')

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        if (res.success) {
          onSaveSuccess(`${type.toUpperCase()} saved successfully!`)
          onClose()
        } else {
          onError('Save Error', res.message || 'Failed to save details.')
        }
      })
      .catch(err => {
        setLoading(false)
        onError('Network Error', 'Could not reach database.')
        console.error('Modal Save Error:', err)
      })
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
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
          maxWidth: '540px',
          padding: '2.2rem',
          position: 'relative',
          borderColor: 'var(--primary-light)',
          maxHeight: '90vh',
          overflowY: 'auto',
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
            fontSize: '1.2rem',
            zIndex: 10
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textTransform: 'capitalize' }}>
          {item ? 'Edit' : 'Add New'} {type}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* ── PROFILE FORM ── */}
          {type === 'profile' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" value={form.name || ''} onChange={onChange} className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Email</label>
                  <input type="email" name="email" value={form.email || ''} onChange={onChange} className="form-input" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Headline / Title</label>
                <input type="text" name="title" value={form.title || ''} onChange={onChange} className="form-input" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <div className="form-group">
                  <label className="form-label">LinkedIn URL</label>
                  <input type="text" name="linkedinUrl" value={form.linkedinUrl || ''} onChange={onChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input type="text" name="githubUrl" value={form.githubUrl || ''} onChange={onChange} className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Hero Banner Subtitle</label>
                <textarea name="subTitle" value={form.subTitle || ''} onChange={onChange} className="form-input" style={{ minHeight: '80px', resize: 'vertical' }} required />
              </div>
              <div className="form-group">
                <label className="form-label">About Me Bio</label>
                <textarea name="aboutBio" value={form.aboutBio || ''} onChange={onChange} className="form-input" style={{ minHeight: '100px', resize: 'vertical' }} required />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  overflow: 'hidden',
                  background: 'var(--card-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img 
                    src={form.profilePhoto || "/profile.jpg"} 
                    alt="Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ marginBottom: '0.35rem' }}>Profile Image File</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                  />
                </div>
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  overflow: 'hidden',
                  background: 'var(--card-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '1.5rem'
                }}>
                  📄
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ marginBottom: '0.35rem' }}>CV Document File (PDF)</label>
                  <input 
                    type="file" 
                    accept="application/pdf" 
                    onChange={handleCvFileChange}
                    style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                  />
                  {form.cvPdf && form.cvPdf.startsWith('data:') && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.2rem', fontWeight: 600 }}>
                      ✓ New PDF uploaded & ready to save
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ── PROJECT FORM ── */}
          {type === 'project' && (
            <>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input type="text" name="title" value={form.title || ''} onChange={onChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select name="category" value={form.category || 'web'} onChange={onChange} className="form-input" style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
                  <option value="web">Web App</option>
                  <option value="mobile">DevOps/Cloud</option>
                  <option value="systems">System Tools</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma-separated)</label>
                <input type="text" name="tags" value={form.tags || ''} onChange={onChange} className="form-input" placeholder="e.g. React.js, Express, Docker" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <div className="form-group">
                  <label className="form-label">Icon Emoji</label>
                  <input type="text" name="icon" value={form.icon || ''} onChange={onChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Demo Link</label>
                  <input type="text" name="demoLink" value={form.demoLink || ''} onChange={onChange} className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Code Link</label>
                <input type="text" name="codeLink" value={form.codeLink || ''} onChange={onChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea name="desc" value={form.desc || ''} onChange={onChange} className="form-input" style={{ minHeight: '100px', resize: 'vertical' }} required />
              </div>
            </>
          )}

          {/* ── SKILL FORM ── */}
          {type === 'skill' && (
            <>
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input type="text" name="name" value={form.name || ''} onChange={onChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select name="category" value={form.category || 'frontend'} onChange={onChange} className="form-input" style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
                  <option value="frontend">Cloud & Databases</option>
                  <option value="backend">DevOps & Automation</option>
                  <option value="tools">Programming & Tools</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <div className="form-group">
                  <label className="form-label">Icon Emoji</label>
                  <input type="text" name="icon" value={form.icon || ''} onChange={onChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Level ({form.level || 50}%)</label>
                  <input type="range" name="level" min="0" max="100" value={form.level || 50} onChange={onChange} style={{ width: '100%', accentColor: 'var(--primary)', marginTop: '0.6rem' }} />
                </div>
              </div>
            </>
          )}

          {/* ── CERTIFICATION FORM ── */}
          {type === 'certification' && (
            <>
              <div className="form-group">
                <label className="form-label">Certification Title</label>
                <input type="text" name="title" value={form.title || ''} onChange={onChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Issuer</label>
                <input type="text" name="issuer" value={form.issuer || ''} onChange={onChange} className="form-input" placeholder="e.g. Udemy, Coursera" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <div className="form-group">
                  <label className="form-label">Icon Emoji</label>
                  <input type="text" name="icon" value={form.icon || ''} onChange={onChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Credential ID</label>
                  <input type="text" name="credentialId" value={form.credentialId || ''} onChange={onChange} className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Verification URL</label>
                <input type="text" name="url" value={form.url || ''} onChange={onChange} className="form-input" />
              </div>
            </>
          )}

          {/* ── TIMELINE FORM ── */}
          {type === 'timeline' && (
            <>
              <div className="form-group">
                <label className="form-label">Period / Year</label>
                <input type="text" name="year" value={form.year || ''} onChange={onChange} className="form-input" placeholder="e.g. Jan 2025 - Present" required />
              </div>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" name="title" value={form.title || ''} onChange={onChange} className="form-input" placeholder="e.g. Software Developer" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0 1rem' }}>
                <div className="form-group">
                  <label className="form-label">Subtitle</label>
                  <input type="text" name="subtitle" value={form.subtitle || ''} onChange={onChange} className="form-input" placeholder="e.g. Company Name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Sort Order</label>
                  <input type="number" name="order" value={form.order || 1} onChange={onChange} className="form-input" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea name="description" value={form.description || ''} onChange={onChange} className="form-input" style={{ minHeight: '100px', resize: 'vertical' }} required />
              </div>
            </>
          )}

          {/* Submit Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.8rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner spinner-sm" /> : 'Save Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
