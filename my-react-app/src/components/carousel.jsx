import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../assets/cover.jpg';



function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src={ExampleCarouselImage} alt="First slide" />
        <img src={ExampleCarouselImage} alt="First slide" />
        <img src={ExampleCarouselImage} alt="First slide" />
        <img src={ExampleCarouselImage} alt="First slide" />
        
        
        
        <Carousel.Caption>
          <a>DOWNLOAD</a>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={ExampleCarouselImage} alt="Second slide" />
        <img src={ExampleCarouselImage} alt="Second slide" />
        <img src={ExampleCarouselImage} alt="Second slide" />
        <img src={ExampleCarouselImage} alt="Second slide" />
        <Carousel.Caption>
        <a>DOWNLOAD</a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={ExampleCarouselImage} alt="Third slide" />
        <img src={ExampleCarouselImage} alt="Third slide" />
        <img src={ExampleCarouselImage} alt="Third slide" />
        <img src={ExampleCarouselImage} alt="Third slide" />
        <Carousel.Caption>
        <a>DOWNLOAD</a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  );
}

export default ControlledCarousel;