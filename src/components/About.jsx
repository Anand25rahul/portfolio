import { useState } from 'react'

const SKILL_ITEMS = [
  // Cloud (AWS)
  { name: 'Amazon EC2 & S3', category: 'frontend', level: 92, icon: '☁️' },
  { name: 'AWS IAM, VPC & CloudWatch', category: 'frontend', level: 90, icon: '🛡️' },
  { name: 'AWS Lambda & RDS', category: 'frontend', level: 85, icon: '⚡' },
  { name: 'Prometheus & Grafana (Monitoring)', category: 'frontend', level: 82, icon: '📈' },
  { name: 'SQL & MySQL Databases', category: 'frontend', level: 88, icon: '📊' },

  // DevOps & Automation
  { name: 'Docker Containers', category: 'backend', level: 92, icon: '🐳' },
  { name: 'Kubernetes Orchestration (kubectl / Minikube)', category: 'backend', level: 88, icon: '☸️' },
  { name: 'Terraform Infrastructure-as-Code', category: 'backend', level: 90, icon: '🛠️' },
  { name: 'Ansible Automation', category: 'backend', level: 85, icon: '🤖' },
  { name: 'Jenkins & GitHub Actions CI/CD', category: 'backend', level: 90, icon: '🚀' },
  { name: 'Google Cloud Platform (GCP)', category: 'backend', level: 80, icon: '🌐' },

  // Scripting & Tools
  { name: 'Python & Bash Scripting', category: 'tools', level: 88, icon: '🐍' },
  { name: 'Java & JavaScript', category: 'tools', level: 90, icon: '☕' },
  { name: 'Linux OS (Ubuntu CLI)', category: 'tools', level: 90, icon: '🐧' },
  { name: 'Git & GitHub Version Control', category: 'tools', level: 92, icon: '🐙' },
  { name: 'VS Code & Postman', category: 'tools', level: 90, icon: '💻' }
]

export default function About({ t, skills, adminMode, onEdit, onDelete, profile }) {
  const bio = profile?.aboutBio || t('aboutBio')
  const [activeTab, setActiveTab] = useState('frontend')

  const items = skills && skills.length > 0 ? skills : SKILL_ITEMS
  const filteredSkills = items.filter(s => s.category === activeTab)

  const tabs = [
    { key: 'frontend', label: t('skillsTabFrontend') },
    { key: 'backend', label: t('skillsTabBackend') },
    { key: 'tools', label: t('skillsTabTools') }
  ]

  return (
    <section 
      id="about" 
      style={{
        padding: '5rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto'
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>{t('aboutTitle')}</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>{t('aboutSub')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start', flexWrap: 'wrap' }}>
        {/* Left column — Description bio */}
        <div className="glass-card" style={{ padding: '2.2rem' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--primary)' }}>Who I Am</h3>
          <p style={{ marginBottom: '1.4rem', fontSize: '0.98rem', lineHeight: '1.7' }}>
            {bio}
          </p>
          <p style={{ fontSize: '0.98rem', lineHeight: '1.7' }}>
            I specialize in orchestrating AWS cloud services, containerized applications, and automated release pipelines to achieve reliable, high-availability deployments with zero downtime.
          </p>
        </div>

        {/* Right column — Interactive filtered skills */}
        <div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.4rem' }}>{t('skillsTitle')}</h3>
          
          {/* Skill Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.8rem', overflowX: 'auto', paddingBottom: '4px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {tabs.map(tab => {
                const isSelected = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      background: isSelected ? 'var(--primary)' : 'var(--card-bg)',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--primary)' : 'var(--glass-border)',
                      color: isSelected ? '#fff' : 'var(--text-secondary)',
                      padding: '0.55rem 1.1rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      fontFamily: 'var(--font-sans)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
            {adminMode && (
              <button 
                onClick={() => onEdit('skill', null)} 
                className="btn btn-secondary" 
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', borderRadius: '8px' }}
              >
                ➕ Add Skill
              </button>
            )}
          </div>

          {/* Skill Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '340px' }}>
            {filteredSkills.map(skill => (
              <div 
                key={skill.name} 
                className="glass-card" 
                style={{ 
                  padding: '1.1rem 1.4rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: '1rem',
                  borderColor: 'rgba(108, 99, 255, 0.15)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 auto' }}>
                  <span style={{ fontSize: '1.3rem' }}>{skill.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</span>
                </div>
                
                {/* Progress bar visualizer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '220px', flexShrink: 0 }}>
                  <div style={{ flex: 1, height: '6px', background: 'var(--glass-border)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${skill.level}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius: '3px' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', width: '32px', textAlign: 'right' }}>
                    {skill.level}%
                  </span>
                </div>

                {adminMode && (
                  <div style={{ display: 'flex', gap: '0.35rem', marginLeft: '0.5rem', flexShrink: 0 }}>
                    <button onClick={() => onEdit('skill', skill)} className="btn btn-outline" style={{ padding: '0.35rem', borderRadius: '6px', fontSize: '0.78rem' }} title="Edit Skill">✏️</button>
                    <button onClick={() => onDelete('skill', skill)} className="btn btn-outline" style={{ padding: '0.35rem', borderRadius: '6px', fontSize: '0.78rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }} title="Delete Skill">🗑️</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
