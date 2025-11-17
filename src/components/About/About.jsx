import './About.css'

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">Our Story</h2>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Welcome to Mug Vibe</h3>
            <p>Founded in 2015, Mug Vibe began as a small passion project between two college friends who shared a love for exceptional coffee and community spaces. What started as a humble corner café has grown into a beloved neighborhood establishment.</p>
            
            <p>Our philosophy is simple: serve premium coffee in a welcoming environment where everyone feels at home. We source our beans ethically from sustainable farms around the world, roast them in small batches to ensure freshness, and craft each beverage with care and precision.</p>
            
            <p>But Mug Vibe is more than just a coffee shop—it's a community hub. We host local artists, open mic nights, and community events because we believe in creating connections beyond the counter.</p>
            
            <div className="about-stats">
              
              
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Coffee Varieties</span>
              </div>
              
              <div className="stat">
                <span className="stat-number">12</span>
                <span className="stat-label">Skilled Baristas</span>
              </div>
            </div>
          </div>
          
          <div className="about-images">
            <div className="image-grid">
              <div className="image-item">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Cafe interior" />
              </div>
              
              <div className="image-item">
                <img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Coffee preparation" />
              </div>
              
              <div className="image-item">
                <img src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Cafe exterior" />
              </div>
              
              <div className="image-item">
                <img src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Customers enjoying coffee" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About