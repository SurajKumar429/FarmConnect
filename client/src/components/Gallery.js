import React from 'react'
import { Link } from "react-router-dom";

const Gallery = () => {
  return (
    <div id='Gallery'>
      {/* Gallery Section */}
      <section className="about-gallery">
        <h2>🌾 Our Gallery</h2>
        <p>Explore moments from our farming community, projects, and sustainable agriculture practices.</p>

        <div className="gallery-grid">
          <img src="https://cdn.pixabay.com/photo/2016/05/30/17/34/agriculture-1425339_1280.jpg" alt="Farm field" />
          <img src="https://cdn.pixabay.com/photo/2014/07/08/12/40/soil-386749_1280.jpg" alt="Farmer working" />
          <img src="https://cdn.pixabay.com/photo/2020/04/17/08/00/hand-5053714_1280.jpg" alt="Crop view" />
          <img src="https://cdn.pixabay.com/photo/2024/07/25/09/52/farmer-8920644_1280.jpg" alt="Green field" />
          <img src="https://cdn.pixabay.com/photo/2017/08/18/06/27/fruit-stall-2653921_1280.jpg" alt="Marketplace" />
          <img src="https://media.istockphoto.com/id/2212898997/photo/gold-wheat-field-and-blue-sky.jpg?s=2048x2048&w=is&k=20&c=igM697ubaUGQEKex0mRtSy5rBx4ZIhOOUPrhmCKgB4w=" alt="Learning session" />
          <img src="https://cdn.pixabay.com/photo/2021/09/27/11/01/man-6660393_1280.jpg" alt=""></img>
         <img src="https://cdn.pixabay.com/photo/2016/05/28/05/37/sunflower-1421011_1280.jpg" alt=""></img>
        </div>
      </section>
    </div>
  )
}

export default Gallery