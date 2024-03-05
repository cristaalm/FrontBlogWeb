import React from 'react';
import './home.css';
import image1Url from './img/img1.png';
import image2Url from './img/img2.png';
import image3Url from './img/img3.png';
import image4Url from './img/img4.png';
import Carousel from 'react-bootstrap/Carousel';


function Home() {
  return (
    <div>
      {/* Header */}
      <header className="headerhome">
        <h1>Aquavison GOD</h1>
      </header>

      {/* Body */}
      <div className="bodyhome">
        <MyCarousel />
        <p>Aqui va ir el contenido para la web UwU.</p>
      </div>

      {/* Footer */}
      <footer className="footerhome">
        <p>Umizoomies © 2024</p>
      </footer>
    </div>
  );
}


function MyCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <ExampleCarouselImage src={image1Url} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={image2Url} alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={image3Url} alt="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <ExampleCarouselImage src={image4Url} alt="Four slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
function ExampleCarouselImage({ src, alt }) {
  return <img src={src} alt={alt} className="d-block w-100" />;
}

export default Home;
export { MyCarousel };
