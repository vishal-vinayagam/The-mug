import { useState } from "react";
import "./LiveCafe.css";

const LiveCafe = () => {
  const [showMap, setShowMap] = useState(false);

  const handleGoLive = () => {
    setShowMap(true);
  };

  return (
    <section id="live" className="live-cafe section">
      <div className="container">
        <h2 className="section-title">Live Cafe Experience</h2>

        <div className="live-content">
          {/* Map or Info Section */}
          <div className="live-preview">
            {showMap ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1758472277051!6m8!1m7!1sO2U6NEICP0dNMWX8ka5kPw!2m2!1d11.25402153122221!2d75.77309120713016!3f176.86878887684105!4f4.170058528948928!5f0.7820865974627469"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  borderRadius: "10px",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  color: "#333",
                }}
              >
                Click "Go Live" to see our cafe in 360°
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="live-info">
            <h3>Experience The Mug From Anywhere</h3>
            <p>
              Check our live feed to see the current ambiance and available
              seating. Can't visit in person? Take our virtual tour to explore
              our café from the comfort of your home.
            </p>

            <div className="live-features">
              <div className="feature">
                <i className="fas fa-camera"></i>
                <h4>Live View</h4>
                <p>See real-time activity in our café</p>
              </div>

              <div className="feature">
                <i className="fas fa-chair"></i>
                <h4>Seat Availability</h4>
                <p>Check available seating before you visit</p>
              </div>

              <div className="feature">
                <i className="fas fa-vr-cardboard"></i>
                <h4>Virtual Tour</h4>
                <p>360° immersive experience of our space</p>
              </div>
            </div>

            <div className="live-buttons">
              <button className="btn btn-primary" onClick={handleGoLive}>
                Go Live
              </button>
              <button className="btn btn-secondary">Reserve Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveCafe;
