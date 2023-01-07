import React, { useState, useRef, useEffect } from "react";

const Carasol = ({ sliderImages }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };
  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };
  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);
  return (
    <div style={{margin:'auto',marginTop:'1vh'}} class="max-w-2xl relative w-full  lg:w-4/5 h-full   overflow-hidden">
    <div className="carousel my-auto lg:mb-5 mx-auto ml-5 mr-5 mb-5 mt-5 ">
      
      <div
        ref={carousel}
        className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
      >
        {sliderImages?.map((resource, index) => (
          <div
            key={index}
            className="carousel-item text-center relative w-full  snap-start"
          >
              <a
                  
                  className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                  style={{ backgroundImage: `url(${resource || ''})` }}
                >
              <img
                    src={resource}
                    alt="image"
                    className="w-full aspect-square "
                    
                  />
            </a>
          </div>
        ))}
      </div>
      </div>
    </div>
   
  );
};

export default Carasol;
