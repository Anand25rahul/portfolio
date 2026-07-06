const STATIC_CERTS = [
  { 
    title: '[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2026', 
    issuer: 'Udemy', 
    icon: '☁️', 
    url: 'https://ude.my/UC-01ff7934-4c2c-4dcb-9be4-1376a0cd846d',
    credentialId: 'UC-01ff7934-4c2c-4dcb-9be4-1376a0cd846d'
  },
  { 
    title: '[NEW] Ultimate AWS Certified AI Practitioner AIF-C01', 
    issuer: 'Udemy', 
    icon: '🤖', 
    url: 'https://ude.my/UC-7a86ce50-2ec3-492c-a475-266dde27eb11',
    credentialId: 'UC-7a86ce50-2ec3-492c-a475-266dde27eb11'
  },
  { 
    title: 'Master DevOps with AWS, Docker, Kubernetes, GCP, GitHub Actions, ArgoCD, GitOps, Terraform, Monitoring & AI', 
    issuer: 'Udemy', 
    icon: '🚀', 
    url: '#' 
  },
  { 
    title: 'Core Java', 
    issuer: 'Coursera', 
    icon: '☕', 
    url: 'https://www.coursera.org/account/accomplishments/specialization/CQH492ZVGC3C',
    credentialId: 'CQH492ZVGC3C'
  },
  { 
    title: 'SQL', 
    issuer: 'Coursera', 
    icon: '📊', 
    url: 'https://www.coursera.org/account/accomplishments/verify/R45HQU44DEC3',
    credentialId: 'R45HQU44DEC3'
  }
]

export default function Certifications({ t, certifications, adminMode, onEdit, onDelete }) {
  const items = certifications && certifications.length > 0 ? certifications : STATIC_CERTS

  return (
    <section 
      id="certifications" 
      style={{
        padding: '5rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto'
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>{t('certificationsTitle') || 'Certifications'}</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', marginBottom: adminMode ? '1.2rem' : 0 }}>{t('certificationsSub') || 'Verified credentials and engineering specializations.'}</p>
        {adminMode && (
          <button 
            onClick={() => onEdit('certification', null)} 
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
          >
            ➕ Add Certification
          </button>
        )}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.8rem',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        {items.map((cert, index) => (
          <div 
            key={index} 
            className="glass-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderColor: 'rgba(255, 101, 132, 0.15)',
              padding: '1.6rem',
              height: '100%'
            }}
          >
            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
              {/* Left side: Icon Badge */}
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'var(--accent-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                {cert.icon || '📜'}
              </div>

              {/* Right side: Information */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <span className="badge badge-primary" style={{ width: 'fit-content', fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
                  {cert.issuer}
                </span>
                
                <h3 style={{ fontSize: '0.98rem', fontWeight: 600, lineHeight: '1.4', color: 'var(--text-primary)' }}>
                  {cert.title}
                </h3>

                {cert.credentialId && (
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    ID: {cert.credentialId}
                  </span>
                )}
              </div>
            </div>

            {/* Verification / Admin Buttons */}
            {(adminMode || (cert.url && cert.url !== '#')) && (
              <div style={{ marginTop: '1.2rem', paddingTop: '0.8rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.35rem', flexDirection: 'column' }}>
                {cert.url && cert.url !== '#' && (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      padding: '0.45rem', 
                      fontSize: '0.8rem', 
                      textDecoration: 'none' 
                    }}
                  >
                    Verify Credential ↗
                  </a>
                )}
                {adminMode && (
                  <div style={{ display: 'flex', gap: '0.35rem', width: '100%', marginTop: '0.2rem' }}>
                    <button onClick={() => onEdit('certification', cert)} className="btn btn-outline" style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem' }}>✏️ Edit</button>
                    <button onClick={() => onDelete('certification', cert)} className="btn btn-outline" style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}>🗑️</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
