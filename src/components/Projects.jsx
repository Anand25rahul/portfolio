const PROJECTS_LIST = [
  {
    id: 1,
    title: 'GPS Tracking System',
    desc: '• Implemented live location tracking using GPS modules and integrated map visualization.\n• Enabled route history and location updates for better monitoring and analysis.\n• Focused on accuracy, real-time updates, and system reliability.',
    tags: ['GPS Modules', 'Map API Integration', 'Real-time Tracking', 'Location History'],
    category: 'web',
    icon: '🗺️',
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 2,
    title: 'School Management System',
    desc: '• Designed modules for student registration, attendance, exams, fees, and results.\n• Implemented role-based access for Admin, Teachers, and Students.\n• Reduced manual work by digitizing daily school operations.',
    tags: ['Java', 'React.js', 'Role Access Control', 'Administrative Automation', 'SQL Database'],
    category: 'web',
    icon: '🏫',
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 3,
    title: 'Yatra Bus Reservation Portal',
    desc: '• Designed and developed a full-stack bus booking dashboard with role validations (Admins & Passengers).\n• Integrated dynamic multi-language translations across 8 Indian languages and custom light/dark theme variables.\n• Enabled ticket booking schedules, seat reservation matrix layouts, and dynamic ticket downloads.',
    tags: ['React.js', 'Express.js', 'MongoDB', 'i18next', 'Theme Toggle'],
    category: 'web',
    icon: '🚌',
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 4,
    title: 'Developer Portfolio Website',
    desc: '• Designed and developed a premium glassmorphic single-page developer portfolio with responsive page graphics.\n• Integrated multi-language dictionaries (English/Hindi) and customized theme selectors (Dark/Light).\n• Connected with Express & MongoDB backend to serve CRUD API endpoints for dynamic projects, skills, timeline, and certifications loading.',
    tags: ['React.js', 'Vite', 'Express.js', 'MongoDB', 'Glassmorphism'],
    category: 'web',
    icon: '💻',
    demoLink: '#',
    codeLink: '#'
  }
]

export default function Projects({ t, projects, adminMode, onEdit, onDelete }) {
  const items = projects && projects.length > 0 ? projects : PROJECTS_LIST

  return (
    <section 
      id="projects" 
      style={{
        padding: '5rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto'
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>{t('projectsTitle')}</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', marginBottom: adminMode ? '1.2rem' : 0 }}>{t('projectsSub')}</p>
        {adminMode && (
          <button 
            onClick={() => onEdit('project', null)} 
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
          >
            ➕ Add Project
          </button>
        )}
      </div>

      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2.5rem',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        {items.map(p => (
          <div 
            key={p._id || p.id} 
            className="glass-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              borderColor: 'rgba(108, 99, 255, 0.15)',
              padding: '2.2rem'
            }}
          >
            <div>
              {/* Card Header Icon & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.4rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem'
                }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{p.title}</h3>
              </div>

              {/* Card Description (parsed for list lines) */}
              <div style={{ 
                fontSize: '0.92rem', 
                lineHeight: '1.7', 
                marginBottom: '1.8rem', 
                color: 'var(--text-secondary)',
                whiteSpace: 'pre-line',
                textAlign: 'left'
              }}>
                {p.desc}
              </div>
            </div>

            <div>
              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.8rem' }}>
                {p.tags.map(tag => (
                  <span key={tag} className="badge badge-primary" style={{ fontSize: '0.74rem', padding: '0.3rem 0.8rem' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.2rem', flexWrap: 'wrap' }}>
                <a 
                  href={p.links?.demo || p.demoLink || '#'} 
                  className="btn btn-secondary btn-sm" 
                  style={{ flex: 1, padding: '0.55rem', fontSize: '0.85rem', textDecoration: 'none', textAlign: 'center' }}
                >
                  🚀 Demo Reference
                </a>
                <a 
                  href={p.links?.code || p.codeLink || '#'} 
                  className="btn btn-outline btn-sm" 
                  style={{ flex: 1, padding: '0.55rem', fontSize: '0.85rem', textDecoration: 'none', textAlign: 'center' }}
                >
                  🐙 Source Code
                </a>
                {adminMode && (
                  <div style={{ display: 'flex', gap: '0.35rem', width: '100%', marginTop: '0.4rem' }}>
                    <button onClick={() => onEdit('project', p)} className="btn btn-outline" style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem' }}>✏️ Edit</button>
                    <button onClick={() => onDelete('project', p)} className="btn btn-outline" style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}>🗑️</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
