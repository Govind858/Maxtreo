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
  head_one: string; // Not used but kept in interface for data consistency
  head_two: string; // Not used but kept in interface for data consistency
  description: string; // Not used but kept in interface for data consistency
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
  // height prop removed to enforce 16:9 aspect ratio
  fitMode?: 'cover' | 'contain' | 'fill'; // 'contain' = scale to fit fully (default for perfect 16:9 fit)
}

const ReusableCarousel: React.FC<ReusableCarouselProps> = ({
  data,
  slidesPerView = 1,
  speed = 300,
  autoplayDelay = 3000,
  width = '100%',
  fitMode = 'contain', // Default: Scale to fit fully without cropping for 16:9 images
}) => {
  // Sort data by order if needed
  const sortedData = [...data].sort((a, b) => a.order - b.order);

  // Image styles: Position absolute to ensure full coverage within the relative slide
  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: fitMode, // Universally fits: contain (scale without crop for perfect fit)
    objectPosition: 'center', // Centers the fitted image
  };

  // Slide styles: Ensure full height and overflow hidden for scaling/rounding
  const slideStyle: React.CSSProperties = {
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '8px', // Optional: Rounded corners
  };

  return (
    <div
      className="relative w-full"
      style={{
        width,
        paddingBottom: '56.25%', // 9/16 * 100% = 56.25% for exact 16:9 aspect ratio
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        speed={speed}
        autoplay={autoplayDelay > 0 ? { delay: autoplayDelay, disableOnInteraction: false } : false}
        pagination={{ clickable: true }}
        navigation={slidesPerView > 1} // Enable navigation only if multiple slides visible
        className="absolute inset-0" // Absolute positioning to fill the 16:9 container exactly
        style={{ height: '100%', width: '100%' }} // Explicit full dimensions within aspect-ratio wrapper
      >
        {sortedData.map((slide) => (
          <SwiperSlide key={slide.id} style={slideStyle}>
            {/* Full-fit Image */}
            <img
              src={slide.image}
              alt={slide.alt_text}
              style={imageStyle}
              loading="lazy" // Lazy load for performance
              onError={(e) => {
                // Fallback for broken images
                e.currentTarget.src = '/path/to/fallback-image.jpg'; // Replace with your fallback
              }}
            />
            
            {/* Overlay for better button visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
            
            {/* Button Overlay */}
            <div className="absolute bottom-0 right-0 z-20 p-6"> {/* z-20 to stay above overlay */}
              <a
                href={slide.button_link}
                className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {slide.button_text}
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReusableCarousel;