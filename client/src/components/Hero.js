import React from 'react'
import { SiCodefresh, SiEasyeda } from "react-icons/si";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GiThreeLeaves } from "react-icons/gi";

const Hero = () => {
    return (
    <div className="homepage">
    
      <img
        src="https://cdn.pixabay.com/photo/2017/05/19/15/16/countryside-2326787_640.jpg"
        alt="Farm Background"
        className="main-image"
      />

      
      <img
        src="https://cdn.pixabay.com/photo/2021/10/14/21/51/wheat-6710447_640.jpg"
        alt="Wheat Field"
        className="floating-img img1"
      />
      <img
        src="https://cdn.pixabay.com/photo/2022/08/11/07/19/field-7378803_640.jpg"
        alt="Field"
        className="floating-img img2"
      />

     
      <h1 className="hero-text">
        Assisting Your Farm <br /> In Fast Growth
      </h1>
      <p className="sub-text">[Smart Tracking for Smarter Farming]</p>

     
      
    </div>
  );
};


export default Hero