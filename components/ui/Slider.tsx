import { FunctionComponent, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper';
import SliderProps from '../../types/SliderProps';
import EventCard from './EventCard';
import Link from 'next/link';

const Slider: FunctionComponent<SliderProps> = ({ cards }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className="c-slider">
      <div className="c-slider__navigation">
        <button ref={navigationPrevRef} className="c-slider__navigation__button">
          <i className="ri-arrow-left-s-line" />
        </button>
        <button ref={navigationNextRef} className="c-slider__navigation__button">
          <i className="ri-arrow-right-s-line" />
        </button>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        modules={[Navigation]}
        grabCursor={true}
        resistanceRatio={0.65}
        onInit={(swiper: any) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="slider"
      >
        {cards && cards.map((card, index) => (
          <SwiperSlide key={index}>
            <Link href={`/detail/${card.id}`} key={index}>
              <a>
                <EventCard
                  key={index}
                  isLiked={card.isLiked}
                  name={card.name}
                  description={card.description ? card.description : ''}
                  image={card.image}
                  logo={card.image}
                  price={card.price}
                  id={card.id}
                />
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
