import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Hero from './Hero'
import About from './About'
import Gallery from './Gallery'

const Home = () => {
  return (
    <div id='home'>
        <Navbar/>
        <Hero/>
        <Gallery/>
        <About/>
        <Footer/>
    </div>
  )
}

export default Home