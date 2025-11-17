import './Hero.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-video">
        <video autoPlay muted loop>
          <source src="public/cafe-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="container">
          <div className="hero-buttons">
            <a href="#menu" className="btn btn-primary">View Menu</a>
            <a href="#reservation" className="btn btn-secondary">Reserve a Table</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
