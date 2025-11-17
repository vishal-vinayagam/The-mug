import { useState } from 'react'
import './Events.css'

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const events = [
    {
      id: 1,
      title: "Live Music Night",
      date: "Every Friday",
      time: "7PM - 9PM",
      description: "Enjoy acoustic performances by local artists while sipping your favorite coffee. Perfect atmosphere for relaxing evenings with friends and family.",
      fullDescription: "Join us every Friday for an unforgettable evening of live acoustic music performed by talented local artists. Our cozy atmosphere, combined with the perfect blend of coffee and music, creates the ideal setting for a relaxing night out. Enjoy our specialty drinks and delicious pastries while listening to soothing melodies.",
      image: "./public/cafe-live-music-stockcake.jpg"
    },
    {
      id: 2,
      title: "Coffee Tasting Workshop",
      date: "October 15, 2023",
      time: "2PM - 4PM",
      description: "Learn about different coffee brewing methods and taste various single-origin coffees with our expert baristas.",
      fullDescription: "Dive deep into the world of coffee with our expert baristas. This hands-on workshop will teach you about different brewing methods, coffee origins, and tasting techniques. You'll get to sample various single-origin coffees and learn how to identify flavor notes like a professional. Perfect for coffee enthusiasts looking to expand their knowledge.",
      image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Seasonal Drink Launch",
      date: "November 1, 2023",
      time: "All Day",
      description: "Be the first to try our new autumn-inspired drinks and pastries crafted with seasonal ingredients.",
      fullDescription: "Celebrate the changing seasons with our exclusive autumn menu launch! Be among the first to experience our new seasonal drinks crafted with the finest ingredients. From pumpkin spice lattes to apple cinnamon creations, we've developed unique flavors that capture the essence of fall. Pair your drink with our limited-edition pastries for the perfect autumn treat.",
      image: "./public/Seasonal Drink Launch.jpg"
    }
  ]

  const openEventModal = (event) => {
    setSelectedEvent(event)
  }

  const closeEventModal = () => {
    setSelectedEvent(null)
  }

  return (
    <section id="events" className="events section">
      <div className="container">
        <h2 className="section-title">Events & Promotions</h2>
        <p className="section-subtitle">Join us for special events and enjoy exclusive promotions</p>
        
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div className="event-date">
                  <span className="date">{event.date}</span>
                  <span className="time">{event.time}</span>
                </div>
              </div>
              
              <div className="event-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <button 
                  className="btn btn-secondary"
                  onClick={() => openEventModal(event)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="promotions">
          <h3>Current Promotions</h3>
          
          <div className="promotion-cards">
            <div className="promotion-card">
              <div className="promotion-icon">
                <i className="fas fa-mug-hot"></i>
              </div>
              <h4>Happy Hour</h4>
              <p>Weekdays 3PM - 5PM</p>
              <span className="discount">20% OFF</span>
            </div>
            
            <div className="promotion-card">
              <div className="promotion-icon">
                <i className="fas fa-user-friends"></i>
              </div>
              <h4>Bring a Friend</h4>
              <p>Get 2 drinks for the price of 1</p>
              <span className="discount">50% OFF</span>
            </div>
            
            <div className="promotion-card">
              <div className="promotion-icon">
                <i className="fas fa-award"></i>
              </div>
              <h4>Loyalty Program</h4>
              <p>Earn points with every purchase</p>
              <span className="discount">FREE DRINK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={closeEventModal}>
          <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="event-modal-header">
              <h3>{selectedEvent.title}</h3>
              <button className="modal-close" onClick={closeEventModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="event-modal-body">
              <div className="event-modal-image">
                <img src={selectedEvent.image} alt={selectedEvent.title} />
                <div className="event-modal-date">
                  <span className="date">{selectedEvent.date}</span>
                  <span className="time">{selectedEvent.time}</span>
                </div>
              </div>
              <div className="event-modal-details">
                <p>{selectedEvent.fullDescription}</p>
                <div className="event-actions">
                  <button className="btn btn-primary">
                    <i className="fas fa-calendar-plus"></i> Add to Calendar
                  </button>
                  <button className="btn btn-secondary">
                    <i className="fas fa-share-alt"></i> Share Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Events