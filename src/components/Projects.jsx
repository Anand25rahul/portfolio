const PROJECTS_LIST = [
  {
    id: 1,
    title: 'CI/CD Pipeline for a Spring Boot Application',
    desc: '• Built an end-to-end Jenkins pipeline that pulls code from GitHub, builds and tests it, packages it into a Docker image, and deploys it to an EC2 instance.\n• Used a multi-stage Dockerfile and webhook-triggered builds so every push to main deploys automatically, eliminating manual release steps.',
    tags: ['Jenkins', 'Docker', 'GitHub', 'AWS EC2', 'Spring Boot', 'CI/CD'],
    category: 'web',
    icon: '🚀',
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 2,
    title: 'Infrastructure as Code on AWS',
    desc: '• Wrote modular Terraform configurations to provision a VPC, EC2 instances, S3 buckets, and IAM roles/policies from code instead of the console.\n• Used remote state and variables to make the setup repeatable across environments, and destroyed/re-created the stack to validate idempotency.',
    tags: ['Terraform', 'AWS (VPC, EC2, S3, IAM)', 'Infrastructure as Code'],
    category: 'web',
    icon: '🏗️',
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 3,
    title: 'Automated Server Configuration',
    desc: '• Wrote Ansible playbooks and roles to configure EC2 instances automatically — installing Docker, Nginx, and monitoring agents in place of manual setup.\n• Used Python scripts alongside Ansible for pre-flight checks (connectivity, disk space) and to parse/report playbook run results.',
    tags: ['Ansible', 'Python', 'AWS EC2', 'Nginx', 'Automation'],
    category: 'web',
    icon: '🤖',
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 4,
    title: 'Containerized Microservices on Kubernetes',
    desc: '• Dockerized a set of Java and Node.js services and deployed them to a local Kubernetes cluster (Deployments, Services, ConfigMaps).\n• Practiced rolling updates, scaling, and pod-level troubleshooting to build hands-on Kubernetes operations experience with zero downtime deploys.',
    tags: ['Docker', 'Kubernetes (Minikube)', 'kubectl', 'GCP', 'Microservices'],
    category: 'web',
    icon: '☸️',
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
