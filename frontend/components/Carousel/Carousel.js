import * as React from 'react';
import { useCarousel, CarouselOptions } from './useCarousel';

function makeIndices(start, delta, num) {
  const indices= [];

  while (indices.length < num) {
    indices.push(start);
    start += delta;
  }
  return indices;
}

export const CarouselContainer = ({
  children,
  slidesPresented = 1,
  interval = 5000,
}) => {
  const slides = React.Children.toArray(children);
  const length = slides.length;
  const numActive = Math.min(length, slidesPresented);
  const [active, setActive, handlers, style] = useCarousel(length, interval, { slidesPresented: numActive });
  const beforeIndices = makeIndices(slides.length - 1, -1, numActive);
  const afterIndices = makeIndices(0, +1, numActive);

  return (
    length > 0 && (
      <div className="carousel">
        <ol className="carouselIndicators">
          {slides.map((_, index) => (
            <li
              onClick={() => setActive(index)}
              key={index}
              className={`${active === index ? 'active' : ''} carouselIndicator`}
            />
          ))}
        </ol>
        <div className="carouselContent" {...handlers} style={style}>
          {beforeIndices.map(i => (
            <CarouselChild key={i}>{slides[i]}</CarouselChild>
          ))}
          {slides.map((slide, index) => (
            <CarouselChild key={index}>{slide}</CarouselChild>
          ))}
          {afterIndices.map(i => (
            <CarouselChild key={i}>{slides[i]}</CarouselChild>
          ))}
        </div>
            <style jsx> {`
                .carousel {
                    position: relative;
                    overflow: hidden;
                }
                .carouselContent {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    overflow: hidden;
                    position: relative;
                }
                .carouselIndicator {
                    position: relative;
                    flex: 0 1 auto;
                    width: 1.5em;
                    height: 0.3em;
                    margin: 0 0.3em;
                    background: $shadowColor;
                    cursor: pointer;
                }
                .carouselIndicator :hover {
                    background: $secondary;
                }
                .carouselIndicator .active {
                    background: $primary;
                    cursor: default;
                }
                .carouselIndicators {
                    position: absolute;
                    right: 0;
                    bottom: 0.5em;
                    left: 0;
                    z-index: 15;
                    display: flex;
                    justify-content: center;
                    padding-left: 0;
                    list-style: none;
                    margin: 0 auto;
                }
        `}</style>
      </div>
    )
  );
};

export const CarouselChild = ({ children }) => (
    <div className="carouselItem">
      {children}
    <style jsx>{`
        .carouselItem {
            width: 100%;
        }
    `}</style>
    </div>
);

