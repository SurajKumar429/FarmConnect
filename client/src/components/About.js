import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <div id="about" className="min-h-screen bg-green-50 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-green-600 text-white shadow-md">
        {/* About Preview */}
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="overlay">
          <h1>About <span className="highlight">FarmConnect</span></h1>
          <p>Connecting farmers, traders, and technology for a smarter agricultural future.</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="about-intro">
        <h2>Who We Are</h2>
        <p>
          <strong>FarmConnect</strong> is a modern digital agriculture platform designed to empower 
          farmers and agri-entrepreneurs. We provide tools and insights that simplify farm management, 
          connect farmers to markets, and promote sustainable agricultural practices.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission-vision">
        <div className="mission">
          <h3>🌱 Our Mission</h3>
          <p>
            To revolutionize the agricultural sector through technology by enabling farmers to make 
            informed, data-driven decisions and achieve better productivity and profitability.
          </p>
        </div>
        <div className="vision">
          <h3>🚜 Our Vision</h3>
          <p>
            To build a connected and sustainable farming ecosystem where every farmer has access to 
            digital tools, expert knowledge, and a transparent marketplace.
          </p>
        </div>
      </section>
        
      </nav>

      
    </div>
  );
};

export default Home;