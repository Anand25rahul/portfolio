import { useState } from 'react'

export default function InboxModal({ messages, onClose, onRefresh, onError, showToast }) {
  const [filter, setFilter] = useState('all') // 'all' | 'unread'
  const [loadingId, setLoadingId] = useState(null)

  const filteredMessages = (messages || []).filter(m => filter === 'all' || !m.read)
  const unreadCount = (messages || []).filter(m => !m.read).length

  const handleToggleRead = (msg) => {
    setLoadingId(msg._id || msg.id)
    const newReadStatus = !msg.read

    fetch(`/api/messages/${msg._id || msg.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: newReadStatus })
    })
      .then(res => res.json())
      .then(res => {
        setLoadingId(null)
        if (res.success) {
          showToast('Updated', newReadStatus ? 'Marked as read' : 'Marked as unread', 'success')
          onRefresh()
        } else {
          onError('Error', res.message || 'Failed to update message status')
        }
      })
      .catch(err => {
        setLoadingId(null)
        onError('Network Error', 'Could not update message.')
        console.error('Update message error:', err)
      })
  }

  const handleDelete = (msg) => {
    if (!window.confirm(`Delete message from ${msg.name}?`)) return
    setLoadingId(msg._id || msg.id)

    fetch(`/api/messages/${msg._id || msg.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => {
        setLoadingId(null)
        if (res.success) {
          showToast('Deleted', 'Message removed from inbox.', 'success')
          onRefresh()
        } else {
          onError('Delete Error', res.message || 'Failed to delete message.')
        }
      })
      .catch(err => {
        setLoadingId(null)
        onError('Network Error', 'Could not delete message.')
        console.error('Delete message error:', err)
      })
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div 
        className="glass-card" 
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderColor: 'var(--primary-light)',
          padding: 0,
          overflow: 'hidden',
          animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--card-bg)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem'
            }}>
              📥
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Let's Connect Messages</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {(messages || []).length} total • <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{unreadCount} unread</span>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button 
              onClick={onRefresh}
              className="btn btn-outline"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              title="Refresh Messages"
            >
              🔄 Refresh
            </button>
            <button 
              onClick={onClose} 
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '1.4rem',
                lineHeight: 1,
                padding: '0.4rem'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{
          padding: '0.8rem 2rem',
          background: 'rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: filter === 'all' ? 'var(--primary)' : 'transparent',
              color: filter === 'all' ? '#fff' : 'var(--text-secondary)',
              transition: 'var(--transition)'
            }}
          >
            All Messages ({(messages || []).length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: filter === 'unread' ? 'var(--primary)' : 'transparent',
              color: filter === 'unread' ? '#fff' : 'var(--text-secondary)',
              transition: 'var(--transition)'
            }}
          >
            Unread Only ({unreadCount})
          </button>
        </div>

        {/* Message List Area */}
        <div style={{
          padding: '1.5rem 2rem',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }}>
          {filteredMessages.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>📭</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>No messages found</h4>
              <p style={{ fontSize: '0.85rem' }}>
                {filter === 'unread' ? 'You have read all messages!' : 'No visitor messages submitted yet.'}
              </p>
            </div>
          ) : (
            filteredMessages.map(msg => {
              const id = msg._id || msg.id
              const isUnread = !msg.read
              const dateStr = msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Recently'

              return (
                <div 
                  key={id}
                  className="glass-card"
                  style={{
                    padding: '1.4rem',
                    borderColor: isUnread ? 'var(--primary)' : 'var(--glass-border)',
                    background: isUnread ? 'rgba(108, 99, 255, 0.06)' : 'var(--card-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem',
                    transition: 'var(--transition)'
                  }}
                >
                  {/* Top info line */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                          {msg.name}
                        </span>
                        {isUnread && (
                          <span className="badge badge-accent" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                            New
                          </span>
                        )}
                      </div>
                      <a 
                        href={`mailto:${msg.email}`}
                        style={{ fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none' }}
                      >
                        ✉️ {msg.email}
                      </a>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      🕒 {dateStr}
                    </span>
                  </div>

                  {/* Subject */}
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', borderTop: '1px solid var(--glass-border)', paddingTop: '0.6rem' }}>
                    Subject: {msg.subject}
                  </div>

                  {/* Message body */}
                  <div style={{
                    fontSize: '0.88rem',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'pre-line',
                    background: 'rgba(0, 0, 0, 0.15)',
                    padding: '0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)'
                  }}>
                    {msg.message}
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <button
                      onClick={() => handleToggleRead(msg)}
                      disabled={loadingId === id}
                      className="btn btn-outline"
                      style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}
                    >
                      {msg.read ? '✉️ Mark Unread' : '✅ Mark Read'}
                    </button>
                    <button
                      onClick={() => handleDelete(msg)}
                      disabled={loadingId === id}
                      className="btn btn-outline"
                      style={{
                        padding: '0.35rem 0.8rem',
                        fontSize: '0.78rem',
                        borderColor: 'rgba(239, 68, 68, 0.4)',
                        color: '#ef4444'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
