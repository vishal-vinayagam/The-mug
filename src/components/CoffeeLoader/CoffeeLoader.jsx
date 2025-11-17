import React, { useEffect, useState } from 'react';
import './CoffeeLoader.css';

const CoffeeLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress for the loading bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="coffee-loader">
      <div className="loader-content">
        <div className="coffee-animation">
          <svg width="300" height="300" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            {/* Cup with gradient and shadow */}
            <defs>
              <linearGradient id="cupGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5f5f5" />
                <stop offset="40%" stopColor="#e6e6e6" />
                <stop offset="100%" stopColor="#d6d6d6" />
              </linearGradient>
              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6d4c41" />
                <stop offset="40%" stopColor="#5d4037" />
                <stop offset="100%" stopColor="#4e342e" />
              </linearGradient>
              <filter id="cupShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                <feOffset dx="0" dy="5" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="0.5"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Cup */}
            <path
              d="M368,128H144c-8.8,0-16,7.2-16,16v192c0,8.8,7.2,16,16,16h224c8.8,0,16-7.2,16-16V144C384,135.2,376.8,128,368,128z"
              fill="url(#cupGradient)"
              stroke="#5d4037"
              strokeWidth="12"
              filter="url(#cupShadow)"
            />

            {/* Coffee liquid with animation */}
            <path
              className="coffee-liquid"
              d="M368,128H144c-8.8,0-16,7.2-16,16v192c0,8.8,7.2,16,16,16h224c8.8,0,16-7.2,16-16V144C384,135.2,376.8,128,368,128z"
              fill="url(#liquidGradient)"
              stroke="none"
            />

            {/* Cup rim */}
            <path
              d="M144,128h224c8.8,0,16,7.2,16,16H128C128,135.2,135.2,128,144,128z"
              fill="#5d4037"
            />

            

            {/* Coffee surface with foam */}
            <ellipse cx="256" cy="128" rx="112" ry="8" fill="#d7ccc8" opacity="0.8">
              <animate attributeName="ry" dur="3s" repeatCount="indefinite" values="8;5;8" />
              <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.8;0.9;0.8" />
            </ellipse>

            {/* Coffee bubbles */}
            <circle cx="220" cy="125" r="2" fill="#ffffff" opacity="0.7">
              <animate attributeName="cy" dur="4s" repeatCount="indefinite" values="125;120;125" />
              <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.7;0;0.7" />
            </circle>
            <circle cx="280" cy="122" r="1.5" fill="#ffffff" opacity="0.6">
              <animate attributeName="cy" dur="3.5s" repeatCount="indefinite" values="122;118;122" begin="0.5s" />
              <animate attributeName="opacity" dur="3.5s" repeatCount="indefinite" values="0.6;0;0.6" begin="0.5s" />
            </circle>
            <circle cx="240" cy="120" r="1" fill="#ffffff" opacity="0.8">
              <animate attributeName="cy" dur="4.5s" repeatCount="indefinite" values="120;115;120" begin="1s" />
              <animate attributeName="opacity" dur="4.5s" repeatCount="indefinite" values="0.8;0;0.8" begin="1s" />
            </circle>

            {/* Snow effect on cup */}
            <g className="snow">
              <circle cx="180" cy="180" r="3" fill="white">
                <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0;1;0" />
              </circle>
              <circle cx="220" cy="220" r="2" fill="white">
                <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0;1;0" begin="0.3s" />
              </circle>
              <circle cx="280" cy="160" r="2.5" fill="white">
                <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0;1;0" begin="0.6s" />
              </circle>
              <circle cx="320" cy="200" r="3" fill="white">
                <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0;1;0" begin="0.9s" />
              </circle>
            </g>
          </svg>

          {/* Enhanced steam animation using CSS instead of SVG animations */}
          <div className="steam-container">
            <div className="steam steam-1"></div>
            <div className="steam steam-2"></div>
            <div className="steam steam-3"></div>
          </div>
        </div>

        <h2 className="loader-text">Brewing your perfect experience 
          <br></br>Sip, Relax, Repeat
        </h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeLoader;