import './Hero.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-video">
       <video autoPlay muted loop className="bg-video">
  <source src="/cafe-video.mp4" type="video/mp4" />
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
