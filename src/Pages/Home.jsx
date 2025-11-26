// pages/Home.jsx (Updated: Reduced height of last flex container to half (200px), ensured unique data distribution across all carousels without repetition, images assumed to fit via ReusableCarousel styling)
import React, { useState, useEffect } from 'react';
import Axios from "../Axios/Axios";
import NavBar from "../components/user/NavBar/NavBar";
import Footer from "../components/user/Footer/Footer";
import ReusableCarousel from '../components/user/Carousel/ReusableCarousel';
import ProductHighlights from '../components/user/Products/ProductHighlights';
import PopularCategory from '../components/user/Category/PopularCategory';
import HeroCarousel from '../components/user/HeroCarousel/HeroCarousel'

function Home() {
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Using Axios GET for the hero carousels endpoint
        const response = await Axios.get('/advertisement/product/hero-carousels/');
        setCarouselData(response.data);
        console.log("caroueselData",carouselData)
      } catch (err) {
        console.error('Error fetching carousel data:', err);
        setError(err.message);
        // No fallback: Rely solely on API
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-lg">Loading carousels...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        <div className="text-lg">Error loading data: {error}</div>
      </div>
    );
  }

  if (carouselData.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        <div className="text-lg">No carousel data available.</div>
      </div>
    );
  }

  // Sort data by order
  const sortedData = [...carouselData].sort((a, b) => a.order - b.order);

  // Distribute data uniquely among all five carousels (no repetition)
  const totalCarousels = 5;
  const chunkSize = Math.ceil(sortedData.length / totalCarousels);
  
  // Assign unique chunks:
  // 1. Left large (top left, larger chunk if uneven)
  const leftLargeData = sortedData.slice(0, chunkSize);
  
  // 2. Right top small
  const rightTopData = sortedData.slice(chunkSize, chunkSize * 2);
  
  // 3. Right bottom small
  const rightBottomData = sortedData.slice(chunkSize * 2, chunkSize * 3);
  
  // 4. Bottom left
  const bottomLeftData = sortedData.slice(chunkSize * 3, chunkSize * 4);
  
  // 5. Bottom right (remaining)
  const bottomRightData = sortedData.slice(chunkSize * 4);

  return (
    <div>
      <NavBar />
      
      {/* Top row: Flex with large left (2/3), right column (1/3) with two stacked carousels */}
<div className="flex flex-col lg:flex-row gap-4 p-4 md:p-8">
  {/* Top carousel - full width on mobile/medium, becomes left on lg */}
  <div className="w-full lg:w-2/3 aspect-video lg:aspect-auto lg:h-[500px]">
    <ReusableCarousel
      data={leftLargeData}
      slidesPerView={1}
      speed={500}
      autoplayDelay={leftLargeData.length > 1 ? 4000 : 0}
      width="100%"
      height="100%"
    />
  </div>
  
  {/* Bottom row - two carousels side by side on mobile/medium, stacked vertically on lg */}
  <div className="w-full flex flex-row lg:flex-col gap-4 lg:w-1/3">
    <div className="w-1/2 lg:w-full aspect-video lg:aspect-auto lg:h-[240px]">
      <ReusableCarousel
        data={rightTopData}
        slidesPerView={1}
        speed={500}
        autoplayDelay={rightTopData.length > 1 ? 4000 : 0}
        width="100%"
        height="100%"
      />
    </div>
    
    <div className="w-1/2 lg:w-full aspect-video lg:aspect-auto lg:h-[240px]">
      <ReusableCarousel
        data={rightBottomData}
        slidesPerView={1}
        speed={300}
        autoplayDelay={rightBottomData.length > 1 ? 4000 : 0}
        width="100%"
        height="100%"
      />
    </div>
  </div>
</div>
      <ProductHighlights/>
      <PopularCategory/>
      
      {/* New flex container below PopularCategory: Two horizontally equal containers with ReusableCarousels (reduced height to 200px) */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-8">
        {/* Left bottom carousel (equal width) */}
        <div className="flex-1 lg:w-1/2">
          <ReusableCarousel
            data={bottomLeftData}
            slidesPerView={1}
            speed={300}
            autoplayDelay={bottomLeftData.length > 1 ? 4000 : 0}
            width="100%"
            height="200px" // Half of previous 400px
          />
        </div>
        
        {/* Right bottom carousel (equal width) */}
        <div className="flex-1 lg:w-1/2">
          <ReusableCarousel
            data={bottomRightData}
            slidesPerView={1}
            speed={300}
            autoplayDelay={bottomRightData.length > 1 ? 4000 : 0}
            width="100%"
            height="200px" // Half of previous 400px
          />
        </div>
      </div>

      {/* <HeroCarousel/> */}
      
      <Footer />
    </div>
  );
}

export default Home;