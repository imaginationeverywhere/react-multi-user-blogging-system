import * as React from 'react';
import { CarouselContainer, CarouselChild } from './Carousel';

export const MultipleCarousel = () => (
    <>
        <CarouselContainer interval={10000} slidesPresented={3}>
            <CarouselChild>
            <div
                className="slide"
                style={{ backgroundImage: `url(https://via.placeholder.com/200x100/0000FF/808080)` }}
            />
            </CarouselChild>
            <CarouselChild>
            <div
                className="slide"
                style={{ backgroundImage: `url(https://via.placeholder.com/200x100/)` }}
            />
            </CarouselChild>
            <CarouselChild>
            <div
                className="slide"
                style={{ backgroundImage: `url(https://via.placeholder.com/200x100/0000FF/808080)` }}
            />
            </CarouselChild>
            <CarouselChild>
            <div
                className="slide"
                style={{ backgroundImage: `url(https://via.placeholder.com/200x100/)` }}
            />
            </CarouselChild>
        </CarouselContainer>
        <style>{`
            .slide {
                height: 500px;
                max-height: 70vh;
                background-color: black;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0;
            }
        `}</style>
    </>
);