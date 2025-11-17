
import { useState } from 'react'
import './Messages.css'

const Messages = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState(null)

  const messages = [
    {
      id: 1,
      type: 'order',
      title: 'Order Shipped',
      content: 'Your order #ORD-12345 has been shipped. Tracking number: TRK-789456',
      date: '2023-10-16',
      time: '14:30',
      read: false,
      orderId: 'ORD-12345'
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Special Offer Just for You!',
      content: 'Get 20% off on your next purchase with code SPECIAL20. Valid until October 31st.',
      date: '2023-10-15',
      time: '09:15',
      read: true
    },
    {
      id: 3,
      type: 'system',
      title: 'Account Security Update',
      content: 'We\'ve enhanced our security system. Please ensure your password is strong and unique.',
      date: '2023-10-10',
      time: '16:45',
      read: true
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Delivered',
      content: 'Your order #ORD-12340 was successfully delivered. We hope you enjoy your purchase!',
      date: '2023-10-05',
      time: '11:20',
      read: true,
      orderId: 'ORD-12340'
    }
  ]

  const filteredMessages = activeCategory === 'all' 
    ? messages 
    : messages.filter(message => message.type === activeCategory)

  const unreadCount = messages.filter(message => !message.read).length

  const markAsRead = (id) => {
    // In a real app, you would update the message status in your backend
    console.log(`Marking message ${id} as read`)
    setSelectedMessage(
      selectedMessage?.id === id 
        ? { ...selectedMessage, read: true }
        : selectedMessage
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="messages-page">
      <div className="container">
        <h1 className="page-title">Messages {unreadCount > 0 && <span className="badge">{unreadCount}</span>}</h1>
        
        <div className="messages-container">
          <div className="messages-sidebar">
            <div className="messages-categories">
              <button 
                className={activeCategory === 'all' ? 'active' : ''}
                onClick={() => setActiveCategory('all')}
              >
                <i className="fas fa-inbox"></i>
                All Messages
              </button>
              <button 
                className={activeCategory === 'order' ? 'active' : ''}
                onClick={() => setActiveCategory('order')}
              >
                <i className="fas fa-shopping-bag"></i>
                Orders
              </button>
              <button 
                className={activeCategory === 'promotion' ? 'active' : ''}
                onClick={() => setActiveCategory('promotion')}
              >
                <i className="fas fa-tag"></i>
                Promotions
              </button>
              <button 
                className={activeCategory === 'system' ? 'active' : ''}
                onClick={() => setActiveCategory('system')}
              >
                <i className="fas fa-cog"></i>
                System
              </button>
            </div>
          </div>

          <div className="messages-content">
            <div className="messages-list">
              {filteredMessages.map(message => (
                <div 
                  key={message.id} 
                  className={`message-item ${!message.read ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message)
                    markAsRead(message.id)
                  }}
                >
                  <div className="message-icon">
                    {message.type === 'order' && <i className="fas fa-shopping-bag"></i>}
                    {message.type === 'promotion' && <i className="fas fa-tag"></i>}
                    {message.type === 'system' && <i className="fas fa-cog"></i>}
                  </div>
                  
                  <div className="message-preview">
                    <div className="message-header">
                      <h4>{message.title}</h4>
                      <span className="message-time">
                        {formatDate(message.date)} • {message.time}
                      </span>
                    </div>
                    <p>{message.content.substring(0, 60)}...</p>
                  </div>

                  {!message.read && <div className="unread-dot"></div>}
                </div>
              ))}
            </div>

            <div className="message-detail">
              {selectedMessage ? (
                <>
                  <div className="message-detail-header">
                    <h2>{selectedMessage.title}</h2>
                    <div className="message-meta">
                      <span className="message-date">
                        {formatDate(selectedMessage.date)} • {selectedMessage.time}
                      </span>
                      {selectedMessage.orderId && (
                        <span className="message-order">
                          Order: #{selectedMessage.orderId}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="message-detail-content">
                    <p>{selectedMessage.content}</p>
                    
                    {selectedMessage.type === 'order' && (
                      <div className="message-actions">
                        <button className="track-order-btn">
                          Track Order
                        </button>
                        <button className="view-order-btn">
                          View Order Details
                        </button>
                      </div>
                    )}

                    {selectedMessage.type === 'promotion' && (
                      <div className="message-actions">
                        <button className="shop-now-btn">
                          Shop Now
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="no-message-selected">
                  <i className="fas fa-comments"></i>
                  <h3>Select a message to view</h3>
                  <p>Choose a message from the list to read its contents</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
