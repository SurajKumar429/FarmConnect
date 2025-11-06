import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaLeaf } from "react-icons/fa";


function Footer() {
  return (
    <footer id="footer" className="farm-footer">
      <div className="footer-container">

        {/* Logo and Tagline */}
        <div className="footer-section">
          <h2 className="footer-logo">
            🌾 FarmConnect
          </h2>
          <p>Bridging the gap between farmers, markets, and knowledge.</p>
        </div>

        

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><FaEnvelope /> support@farmconnect.com</p>
          <p><FaPhone /> ‪+91 98765 43210‬</p>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <p className="footer-bottom">
        © {new Date().getFullYear()} FarmConnect | Empowering Farmers for a Greener Tomorrow 🌿
      </p>
    </footer>
  );
}

export default Footer;
