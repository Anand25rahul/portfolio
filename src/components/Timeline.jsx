const TIMELINE_DATA = [
  {
    year: 'Jan 2025 – Present',
    title: 'DevOps Engineer',
    subtitle: 'Speedotrack GPS Pvt. Ltd., Ranchi',
    description: '• Managed build, release, and deployment workflows for a real-time GPS tracking platform.\n• Deployed and maintained School Management System (Edusoft) across several client environments.\n• Partnered directly with clients to gather infrastructure and release requirements.\n• Owned the release lifecycle end-to-end — build, test, deploy, and monitor.'
  },
  {
    year: 'Aug 2023 – Dec 2024',
    title: 'Java Full Stack Development Training',
    subtitle: 'JSpiders Academy',
    description: 'Underwent intensive developer specialization. Mastered Core Java, Spring Boot microservices, SQL databases, database integrations, and essential modern web markup and styling technologies.'
  },
  {
    year: '2019 – 2023',
    title: 'B.Tech in Computer Science',
    subtitle: 'Jai Narain College of Technology, Bhopal',
    description: 'Acquired core computing knowledge, scoring a CGPA of 7.93. Specialized in engineering mathematics, data structures, algorithms, operating systems, and computer architectures.'
  }
]

export default function Timeline({ t, timelineData, adminMode, onEdit, onDelete }) {
  const items = timelineData && timelineData.length > 0 ? timelineData : TIMELINE_DATA

  return (
    <section 
      id="timeline" 
      style={{
        padding: '5rem 2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>{t('timelineTitle')}</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', marginBottom: adminMode ? '1.2rem' : 0 }}>{t('timelineSub')}</p>
        {adminMode && (
          <button 
            onClick={() => onEdit('timeline', null)} 
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
          >
            ➕ Add Milestone
          </button>
        )}
      </div>

      {/* Visual Timeline Nodes */}
      <div className="timeline">
        {items.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot" />
            <div className="glass-card" style={{ padding: '1.5rem 1.8rem', borderColor: 'rgba(108, 99, 255, 0.15)' }}>
              <span className="badge badge-accent" style={{ marginBottom: '0.6rem', fontSize: '0.72rem' }}>
                {item.year}
              </span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{item.title}</h3>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.8rem' }}>
                {item.subtitle}
              </h4>
              <p style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
                {item.description}
              </p>
              {adminMode && (
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '0.8rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => onEdit('timeline', item)} className="btn btn-outline" style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}>✏️ Edit</button>
                  <button onClick={() => onDelete('timeline', item)} className="btn btn-outline" style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}>🗑️</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
