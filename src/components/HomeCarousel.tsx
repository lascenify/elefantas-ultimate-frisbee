import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Image} from 'cloudinary-react';
export default function HomeCarousel() {
  return (
    <div className="carousel-wrapper">
      <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
        <div>
          <Image secure="true" publicId="/home/1.jpg" />
        </div>
        <div>
          <Image secure="true" publicId="/home/2.jpg" />
        </div>
        <div>
          <Image secure="true" publicId="/home/3.jpg" />
        </div>
        <div>
          <Image secure="true" publicId="/home/4.jpg" />
        </div>
      </Carousel>

    <style jsx>{`
      .carousel-wrapper {
        max-width: 45rem;
      }
    `}</style>
    </div>
        );

};
