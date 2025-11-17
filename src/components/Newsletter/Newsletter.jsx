import { useState } from 'react'
import './Newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Subscribed with email:', email)
    setSubscribed(true)
    setEmail('')
    setIsLoading(false)
    
    // Reset after 5 seconds
    setTimeout(() => {
      setSubscribed(false)
    }, 5000)
  }

  return (
    <section id="newsletter" className="newsletter section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <div className="newsletter-icon">
              <i className="fas fa-paper-plane"></i>
            </div>
            <h2>Stay Updated with Mug</h2>
            <p>Join our community of coffee lovers and be the first to know about new flavors, exclusive events, special promotions, and limited-time offers.</p>
            <div className="newsletter-benefits">
              <div className="benefit-item">
                <i className="fas fa-check-circle"></i>
                <span>Exclusive member discounts</span>
              </div>
              <div className="benefit-item">
                <i className="fas fa-check-circle"></i>
                <span>Early access to new menu items</span>
              </div>
              <div className="benefit-item">
                <i className="fas fa-check-circle"></i>
                <span>Event invitations and special offers</span>
              </div>
            </div>
          </div>
          
          <div className="newsletter-form-container">
            {subscribed ? (
              <div className="success-message">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Welcome to the Mug Family!</h3>
                <p>Thank you for subscribing to our newsletter. Check your inbox for a special welcome offer.</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => setSubscribed(false)}
                >
                  Subscribe Another Email
                </button>
              </div>
            ) : (
              <div className="newsletter-form">
                <h3>Subscribe Now</h3>
                <p>Enter your email to join our community</p>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="input-container">
                      <i className="fas fa-envelope"></i>
                      <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i>
                          Subscribe
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="privacy-note">
                  <i className="fas fa-lock"></i>
                  <span>We respect your privacy and will never share your information</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter