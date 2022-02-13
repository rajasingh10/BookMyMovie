import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const data = [
  {
    image:
      "https://cdn.siasat.com/wp-content/uploads/2021/05/Allu-Arjun-Pushpa.webp",
    caption: "Caption",
    description: "Description Here",
  },
  {
    image:
      "https://cdn.vox-cdn.com/thumbor/nUHZ7gpoF4VXhS99duZPfV9VpEQ=/0x0:600x750/1200x800/filters:focal(163x213:259x309)/cdn.vox-cdn.com/uploads/chorus_image/image/70152383/unnamed__1_.0.jpeg",
    caption: "Caption",
    description: "Description Here",
  },
  {
    image:
      "https://images.thedirect.com/media/article_full/venom-2-tom-hardy.jpg",
    caption: "Caption",
    description: "Description Here",
  },
];

function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={3000}
      pause={false}
    >
      {data.map((slide, i) => {
        return (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slide.image}
              alt="slider image"
              style={{ width: "100vw", height: "400px" }}
            />
            {/* <Carousel.Caption>
              <Link to="/theatre">
                <button className="book_btn">Book</button>
              </Link>
              <p>{slide.description}</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
export default HomeCarousel;
