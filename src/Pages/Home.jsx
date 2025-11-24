// pages/Home.jsx (No changes needed; the issue was in the ReusableCarousel component structure)
import React, { useState, useEffect } from 'react';
import Axios from "../Axios/Axios";
import NavBar from "../components/user/NavBar/NavBar";
import Footer from "../components/user/Footer/Footer";
import ReusableCarousel from '../components/user/Carousel/ReusableCarousel';
import ProductHighlights from '../components/user/Products/ProductHighlights';
import PopularCategory from '../components/user/Category/PopularCategory';

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

  // Distribute data equally among the three carousels
  const chunkSize = Math.ceil(sortedData.length / 3);
  const leftLargeData = sortedData.slice(0, chunkSize);
  const rightTopData = sortedData.slice(chunkSize, chunkSize * 2);
  const rightBottomData = sortedData.slice(chunkSize * 2);

  return (
    <div>
      <NavBar />
      
      {/* Top row: Flex with large left (2/3), right column (1/3) with two stacked carousels */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-8">
        {/* Left large carousel (full height, 1 slide) */}
        <div className="flex-1 lg:w-2/3">
          <ReusableCarousel
            data={leftLargeData}
            slidesPerView={1}
            speed={500}
            autoplayDelay={leftLargeData.length > 1 ? 4000 : 0} // Standard speed for large
            width="100%"
            height="500px"
          />
        </div>
        
        {/* Right column: Two stacked small carousels (1/3 width) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          {/* Right top small carousel */}
          <ReusableCarousel
            data={rightTopData}
            slidesPerView={1}
            speed={500} // Unified speed
            autoplayDelay={rightTopData.length > 1 ? 4000 : 0} // Unified delay
            width="100%"
            height="240px"
          />
          
          {/* Right bottom small carousel */}
          <ReusableCarousel
            data={rightBottomData}
            slidesPerView={1}
            speed={500} // Unified speed
            autoplayDelay={rightBottomData.length > 1 ? 4000 : 0} // Unified delay
            width="100%"
            height="240px"
          />
        </div>
      </div>
      <ProductHighlights/>
      <PopularCategory/>
      <Footer />
    </div>
  );
}

export default Home;