import React from "react";
import { Link } from "react-router-dom";
import "./Landingpage.css"; // Import the CSS file

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="left-content">
        <h1 className="heading">Sen-forge</h1>
        <h2>Welcome to Sen-forge: Your Image Forgery Detection Solution</h2>
        <p>
          Sen-forge leverages cutting-edge machine learning techniques to detect
          and classify image forgeries. Our tool highlights manipulated regions,
          ensuring you can trust the images you see.
        </p>
        <p>
          Whether you are a professional in digital forensics or just looking to
          verify the authenticity of an image, Sen-forge provides accurate and
          efficient solutions to help you in your journey. 
        </p>
        <ul>
          <li className="btn-1">
            <Link to="/upload" className="button">
              Upload
            </Link>
          </li>
        </ul>
      </div>
      
    </div>
  );
}

export default LandingPage;

