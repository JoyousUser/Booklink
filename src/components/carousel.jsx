import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../assets/cover.jpg';
import apiBaseUrl from '../config';
import api from '../services/api'


function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    
    <Carousel activeIndex={index} onSelect={handleSelect} className='bg-dark'>
      <Carousel.Item>
        <a href="/login"><img src={ExampleCarouselImage} alt="First slide" /></a>
        <img src={ExampleCarouselImage} alt="First slide" />
        <img src={ExampleCarouselImage} alt="First slide" />
        <img src={ExampleCarouselImage} alt="First slide" />
        <img src={ExampleCarouselImage} alt="First slide" />
        <img src={ExampleCarouselImage} alt="First slide" />
        <img src={ExampleCarouselImage} alt="First slide" />
        <img src={ExampleCarouselImage} alt="First slide" />
        
        
        
        
        
        <Carousel.Caption>
          <a></a>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={ExampleCarouselImage} alt="Second slide" />
        <img src={ExampleCarouselImage} alt="Second slide" />
        <img src={ExampleCarouselImage} alt="Second slide" />
        <img src={ExampleCarouselImage} alt="Second slide" />
        <Carousel.Caption>
        <a></a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={ExampleCarouselImage} alt="Third slide" />
        <img src={ExampleCarouselImage} alt="Third slide" />
        <img src={ExampleCarouselImage} alt="Third slide" />
        <img src={ExampleCarouselImage} alt="Third slide" />
        <Carousel.Caption>
        <a></a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  );
}

export default ControlledCarousel;