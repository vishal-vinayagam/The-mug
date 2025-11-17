import { useState } from 'react'
import './Reservation.css'

const Reservation = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '1',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  })

  const [showNotification, setShowNotification] = useState(false)
  const [reservationToken, setReservationToken] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateToken = () => {
    return 'MV-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = generateToken()
    setReservationToken(token)
    
    // Simulate API call
    setTimeout(() => {
      setShowNotification(true)
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    }, 1000)
  }

  return (
    <section id="reservation" className="reservation section">
      <div className="container">
        <h2 className="section-title">Make a Reservation</h2>
        <p className="section-subtitle">Book your table and enjoy the perfect coffee experience</p>
        
        <div className="reservation-content">
          <div className="reservation-form">
            <h3>Book Your Table</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input 
                    type="time" 
                    id="time" 
                    name="time" 
                    value={formData.time}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="guests">Number of Guests</label>
                  <select 
                    id="guests" 
                    name="guests" 
                    value={formData.guests}
                    onChange={handleChange}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                    <option value="9">9+ people (large group)</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="specialRequests">Special Requests (Optional)</label>
                <textarea 
                  id="specialRequests" 
                  name="specialRequests" 
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any special requirements or celebrations?"
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">Reserve Now</button>
            </form>
          </div>
          
          <div className="reservation-info">
            <h3>Special Offers</h3>
            
            <div className="offer-card">
              <div className="offer-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="offer-content">
                <h4>Happy Hour</h4>
                <p>Weekdays 3PM - 5PM</p>
                <p className="highlight">20% off all drinks</p>
              </div>
            </div>
            
            <div className="offer-card">
              <div className="offer-icon">
                <i className="fas fa-coffee"></i>
              </div>
              <div className="offer-content">
                <h4>Weekend Brunch</h4>
                <p>Saturday & Sunday 10AM - 2PM</p>
                <p className="highlight">Free pastry with any coffee order</p>
              </div>
            </div>
            
            <div className="offer-card">
              <div className="offer-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="offer-content">
                <h4>Loyalty Program</h4>
                <p>Join our loyalty program and earn points with every purchase</p>
                <p className="highlight">Every 10th drink is on us!</p>
              </div>
            </div>
            
            <div className="contact-info">
              <h4>Need help with your reservation?</h4>
              <p><i className="fas fa-phone"></i> (+91) 9345457411</p>
              <p><i className="fas fa-envelope"></i> reservations@mugvibe.com</p>
              <p><i className="fas fa-map-marker-alt"></i> Visit us at our location</p>
            </div>
          </div>
        </div>
      </div>
      
      {showNotification && (
        <div className="reservation-notification">
          <div className="notification-content">
            <i className="fas fa-check-circle"></i>
            <div>
              <h4>Reservation Confirmed!</h4>
              <p>Your reservation token: <strong>{reservationToken}</strong></p>
              <p>We've sent details to your email.</p>
            </div>
            <button onClick={() => setShowNotification(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Reservation