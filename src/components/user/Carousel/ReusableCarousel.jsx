// components/user/ReusableCarousel/ReusableCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Define the shape of each slide data item
interface SlideData {
  id: number;
  image: string;
  alt_text: string;
  head_one: string;
  head_two: string;
  description: string;
  button_text: string;
  button_link: string;
  order: number;
}

interface ReusableCarouselProps {
  data: SlideData[];
  slidesPerView?: number;
  speed?: number; // Transition speed in ms
  autoplayDelay?: number; // Delay between slides in ms (0 to disable autoplay)
  width?: string;
  height?: string;
}

const ReusableCarousel: React.FC<ReusableCarouselProps> = ({
  data,
  slidesPerView = 1,
  speed = 300,
  autoplayDelay = 3000,
  width = '100%',
  height = '400px',
}) => {
  // Sort data by order if needed
  const sortedData = [...data].sort((a, b) => a.order - b.order);

  return (
    <div className="w-full" style={{ width, height }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        speed={speed}
        autoplay={autoplayDelay > 0 ? { delay: autoplayDelay, disableOnInteraction: false } : false}
        pagination={{ clickable: true }}
        navigation={slidesPerView > 1} // Enable navigation only if multiple slides visible
        className="h-full"
      >
        {sortedData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              
              <div className="relative z-10 text-center max-w-2xl p-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {slide.head_one}
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  {slide.head_two}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {slide.description}
                </p>
                <a
                  href={slide.button_link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  {slide.button_text}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReusableCarousel;