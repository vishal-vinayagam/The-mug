import React from 'react';
import LiveCafe from '../components/LiveCafe/LiveCafe';
import './LiveCafePage.css';

const LiveCafePage = () => {
  return (
    <div className="live-cafe-page">
      <div className="container">
        <h1 className="page-title">360° Virtual Café Tour</h1>
        <div className="page-content">
          <LiveCafe />
          <div className="page-info">
            <h2>Experience Our Café Virtually</h2>
            <p>
              Take a virtual tour of our café space and immerse yourself in the 
              Mug Vibe atmosphere from anywhere in the world. Navigate through 
              our carefully designed interior, check out the seating arrangements, 
              and get a feel for our unique ambiance.
            </p>
            <div className="features">
              <div className="feature">
                <i className="fas fa-vr-cardboard"></i>
                <h3>360° View</h3>
                <p>Navigate the space in full 360 degrees</p>
              </div>
              <div className="feature">
                <i className="fas fa-mouse-pointer"></i>
                <h3>Interactive</h3>
                <p>Click and drag to explore the café</p>
              </div>
              <div className="feature">
                <i className="fas fa-search-plus"></i>
                <h3>Zoom Control</h3>
                <p>Zoom in to see the details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCafePage;