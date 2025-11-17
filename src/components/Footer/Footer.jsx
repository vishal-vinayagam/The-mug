import { useState } from 'react';
import './Footer.css'

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [email, setEmail] = useState('');

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  const renderModal = () => {
    if (!activeModal) return null;

    const modalContents = {
      privacy: {
        title: "Privacy Policy",
        content: (
          <div>
            <h3>Your Privacy Matters</h3>
            <p>Last Updated: January 1, 2025</p>
            <p>At The Mug Cafe, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
            
            <h4>Information We Collect</h4>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Make a reservation</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in promotions or surveys</li>
              <li>Contact us with inquiries</li>
            </ul>
            
            <h4>How We Use Your Information</h4>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, operate, and maintain our services</li>
              <li>Process your transactions and reservations</li>
              <li>Send you promotional communications</li>
              <li>Improve our website and customer experience</li>
            </ul>
          </div>
        )
      },
      terms: {
        title: "Terms of Service",
        content: (
          <div>
            <h3>Terms of Service</h3>
            <p>Last Updated: January 1, 2025</p>
            <p>Welcome to The Mug Cafe! These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.</p>
            
            <h4>Use of Our Website</h4>
            <p>You may use our website only for lawful purposes and in accordance with these Terms. You agree not to use our website:</p>
            <ul>
              <li>In any way that violates any applicable law or regulation</li>
              <li>To engage in any fraudulent or deceptive activities</li>
              <li>To transmit any advertising or promotional material without our consent</li>
            </ul>
            
            <h4>Reservations and Orders</h4>
            <p>When you make a reservation or place an order through our website, you agree to provide accurate and complete information. We reserve the right to refuse service to anyone for any reason at any time.</p>
            
            <h4>Intellectual Property</h4>
            <p>The content on our website, including text, graphics, logos, and images, is the property of Mug Vibe Cafe and is protected by copyright and other intellectual property laws.</p>
          </div>
        )
      },
      careers: {
        title: "Careers at Mug Vibe",
        content: (
          <div>
            <h3>Join Our Team</h3>
            <p>At The Mug Cafe, we believe that our team is our greatest asset. We're always looking for passionate, dedicated individuals who share our love for coffee and community.</p>
            
            <h4>Current Openings</h4>
            <ul>
              <li><strong>Barista</strong> - Full-time/Part-time</li>
              <li><strong>Shift Supervisor</strong> - Full-time</li>
              <li><strong>Pastry Chef</strong> - Full-time</li>
              <li><strong>Cafe Manager</strong> - Full-time</li>
            </ul>
            
            <h4>Why Work With Us?</h4>
            <ul>
              <li>Competitive wages and tips</li>
              <li>Flexible scheduling</li>
              <li>Free coffee during shifts</li>
              <li>Opportunities for growth and advancement</li>
              <li>Positive and supportive work environment</li>
            </ul>
            
            <h4>How to Apply</h4>
            <p>If you're interested in joining our team, please send your resume and a brief introduction to careers@mugvibe.com or visit our cafe in person to fill out an application.</p>
          </div>
        )
      }
    };

    const content = modalContents[activeModal];

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{content.title}</h2>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="modal-body">
            {content.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/logo.png" alt="Mug Vibe" />
              <span>The Mug</span>
            </div>
            <p>Sip, Relax, Repeat at your favorite neighborhood café. We serve premium coffee in a welcoming environment.</p>
            
            <div className="social-links">
              <a href="https://www.instagram.com/mr_vishal_0ff/" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#live">Live Cafe</a></li>
              <li><a href="#reservation">Reservation</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul className="contact-info">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>
                  23, MIG, KHB Colony, 8th Block, 
                  Koramangala, Bengaluru - 560095
                </span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>(+91) 9345457411</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>info@mugvibe.com</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Mon-Fri: 7AM-9PM, Sat-Sun: 8AM-10PM</span>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>Subscribe to get special offers, free giveaways, and event invites.</p>
            
            <form className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 The Mug Cafe. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); openModal('privacy'); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openModal('terms'); }}>Terms of Service</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openModal('careers'); }}>Careers</a>
          </div>
        </div>
      </div>
      
      {renderModal()}
    </footer>
  )
}

export default Footer