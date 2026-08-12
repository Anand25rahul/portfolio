import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Toast from './components/Toast'
import AdminModal from './components/AdminModal'
import LoginModal from './components/LoginModal'
import InboxModal from './components/InboxModal'
import { translations } from './utils/translations'

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio_lang') || 'english')
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio_theme') || 'dark')
  const [toasts, setToasts] = useState([])

  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [timelineData, setTimelineData] = useState([])
  const [certifications, setCertifications] = useState([])
  const [profile, setProfile] = useState(null)
  const [messages, setMessages] = useState([])
  
  const [adminMode, setAdminMode] = useState(() => localStorage.getItem('portfolio_admin') === 'true')
  const [modal, setModal] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showInboxModal, setShowInboxModal] = useState(false)

  const fetchProjects = () => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) setProjects(res.data)
      })
      .catch(err => console.error('Error fetching projects:', err))
  }

  const fetchSkills = () => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) setSkills(res.data)
      })
      .catch(err => console.error('Error fetching skills:', err))
  }

  const fetchTimeline = () => {
    fetch('/api/timeline')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) setTimelineData(res.data)
      })
      .catch(err => console.error('Error fetching timeline:', err))
  }

  const fetchCertifications = () => {
    fetch('/api/certifications')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) setCertifications(res.data)
      })
      .catch(err => console.error('Error fetching certifications:', err))
  }

  const fetchProfile = () => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) setProfile(res.data)
      })
      .catch(err => console.error('Error fetching profile:', err))
  }

  const fetchMessages = () => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) setMessages(res.data)
      })
      .catch(err => console.error('Error fetching messages:', err))
  }

  // Fetch initial data from Node.js APIs
  useEffect(() => {
    fetchProjects()
    fetchSkills()
    fetchTimeline()
    fetchCertifications()
    fetchProfile()
    fetchMessages()
  }, [])

  // Sync admin mode preference
  useEffect(() => {
    localStorage.setItem('portfolio_admin', adminMode)
  }, [adminMode])

  const handleToggleAdmin = () => {
    if (adminMode) {
      setAdminMode(false)
      showToast('Access Locked', 'Logged out of Admin Edit Mode.', 'success')
    } else {
      setShowLoginModal(true)
    }
  }

  const handleEdit = (type, item) => {
    setModal({ type, item })
  }

  const handleEditProfile = () => {
    setModal({ type: 'profile', item: profile })
  }

  const handleDelete = (type, item) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return
    
    const endpoint = `/api/${type === 'timeline' ? 'timeline' : type + 's'}/${item._id || item.id}`
    fetch(endpoint, { method: 'DELETE' })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          showToast('Deleted', `${type.toUpperCase()} deleted successfully!`, 'success')
          if (type === 'project') fetchProjects()
          else if (type === 'skill') fetchSkills()
          else if (type === 'certification') fetchCertifications()
          else if (type === 'timeline') fetchTimeline()
        } else {
          showToast('Delete Error', res.message || 'Failed to delete.', 'error')
        }
      })
      .catch(err => {
        showToast('Network Error', 'Could not reach database.', 'error')
        console.error('Delete error:', err)
      })
  }

  // Sync theme to root html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio_theme', theme)
  }, [theme])

  // Sync language selection to local storage
  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang)
  }, [lang])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Translation lookup helper
  const t = (key) => {
    const langDict = translations[lang] || translations.english
    return langDict[key] || key
  }

  const showToast = (title, message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, title, message, type }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const unreadMessagesCount = messages.filter(m => !m.read).length

  return (
    <>
      <div className="bg-grid-overlay" />
      
      {/* Navbar Header controls */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        t={t} 
        adminMode={adminMode}
        toggleAdminMode={handleToggleAdmin}
        onEditProfile={handleEditProfile}
        onOpenInbox={() => setShowInboxModal(true)}
        unreadCount={unreadMessagesCount}
      />

      {/* Main Sections Layout */}
      <main style={{ padding: '0 1.5rem' }}>
        <Hero t={t} profile={profile} />
        <About t={t} skills={skills} adminMode={adminMode} onEdit={handleEdit} onDelete={handleDelete} profile={profile} />
        <Projects t={t} projects={projects} adminMode={adminMode} onEdit={handleEdit} onDelete={handleDelete} />
        <Certifications t={t} certifications={certifications} adminMode={adminMode} onEdit={handleEdit} onDelete={handleDelete} />
        <Timeline t={t} timelineData={timelineData} adminMode={adminMode} onEdit={handleEdit} onDelete={handleDelete} />
        <Contact 
          t={t} 
          onSuccess={(title, msg) => {
            showToast(title, msg, 'success')
            fetchMessages()
          }} 
          onError={(title, msg) => showToast(title, msg, 'error')} 
        />
      </main>

      {/* Admin Modal Panel */}
      {modal && (
        <AdminModal
          type={modal.type}
          item={modal.item}
          onClose={() => setModal(null)}
          onSaveSuccess={(msg) => {
            showToast('Saved', msg, 'success')
            if (modal.type === 'project') fetchProjects()
            else if (modal.type === 'skill') fetchSkills()
            else if (modal.type === 'certification') fetchCertifications()
            else if (modal.type === 'timeline') fetchTimeline()
            else if (modal.type === 'profile') fetchProfile()
          }}
          onError={(title, msg) => showToast(title, msg, 'error')}
        />
      )}

      {/* Admin Inbox Modal */}
      {showInboxModal && (
        <InboxModal
          messages={messages}
          onClose={() => setShowInboxModal(false)}
          onRefresh={fetchMessages}
          onError={(title, msg) => showToast(title, msg, 'error')}
          showToast={showToast}
        />
      )}

      {/* Login Modal overlay */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setAdminMode(true)
            showToast('Controls Unlocked', 'Logged in as Admin. Edit mode and Inbox unlocked!', 'success')
            fetchProjects()
            fetchSkills()
            fetchTimeline()
            fetchCertifications()
            fetchProfile()
            fetchMessages()
          }}
          onError={(title, msg) => showToast(title, msg, 'error')}
        />
      )}

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        borderTop: '1px solid var(--glass-border)',
        textAlign: 'center',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href={profile?.linkedinUrl || "https://linkedin.com/in/rahul-anand-22a546218"} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', transition: 'var(--transition)' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>LinkedIn</a>
          <a href={profile?.githubUrl || "https://github.com/Anand25rahul"} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', transition: 'var(--transition)' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>GitHub</a>
          <a href={`mailto:${profile?.email || "anaashutosh888@gmail.com"}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', transition: 'var(--transition)' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Email</a>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()} Rahul Anand. All Rights Reserved. Built with React & Vite.
        </p>
      </footer>

      {/* Toast notifications stack */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast 
            key={toast.id}
            title={toast.title}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  )
}

export default App
