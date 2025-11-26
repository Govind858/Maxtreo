// pages/Home.jsx
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

        const response = await Axios.get('/advertisement/product/hero-carousels/');
        console.log("API Response:", response.data);
        setCarouselData(response.data || []);
      } catch (err) {
        console.error('Error fetching carousel data:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  // confirm state update
  useEffect(() => {
    console.log("Updated carouselData:", carouselData);
  }, [carouselData]);

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

  if (!carouselData || carouselData.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        <div className="text-lg">No carousel data available.</div>
      </div>
    );
  }

  // Sort by order (if present)
  const sortedData = [...carouselData].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Split into 3 groups (left large + right top + right bottom)
  const totalCarousels = 3;
  const chunkSize = Math.ceil(sortedData.length / totalCarousels);
  const groups = [];

  for (let i = 0; i < totalCarousels; i++) {
    const start = i * chunkSize;
    const end = start + chunkSize;
    const group = sortedData.slice(start, end);
    if (group.length > 0) groups.push(group);
  }

  console.log("Carousel groups (3):", groups);

  const leftLargeData = groups[0] || [];
  const rightTopData = groups[1] || [];
  const rightBottomData = groups[2] || [];

  return (
    <div>
      <NavBar />

      {/* Top area: left large (2/3) and right column with two stacked carousels (1/3) */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-8">
        {/* Left large */}
        {leftLargeData.length > 0 && (
          <div className="w-full lg:w-2/3 aspect-video lg:h-[500px]">
            <ReusableCarousel
              data={leftLargeData}
              slidesPerView={1}
              speed={500}
              autoplayDelay={leftLargeData.length > 1 ? 4000 : 0}
              width="100%"
              height="100%"
            />
          </div>
        )}

        {/* Right column: two stacked carousels */}
        <div className="w-full flex flex-row lg:flex-col gap-4 lg:w-1/3">
          {rightTopData.length > 0 && (
            <div className="w-1/2 lg:w-full aspect-video lg:h-[240px]">
              <ReusableCarousel
                data={rightTopData}
                slidesPerView={1}
                speed={500}
                autoplayDelay={rightTopData.length > 1 ? 4000 : 0}
                width="100%"
                height="100%"
              />
            </div>
          )}

          {rightBottomData.length > 0 && (
            <div className="w-1/2 lg:w-full aspect-video lg:h-[240px]">
              <ReusableCarousel
                data={rightBottomData}
                slidesPerView={1}
                speed={300}
                autoplayDelay={rightBottomData.length > 1 ? 4000 : 0}
                width="100%"
                height="100%"
              />
            </div>
          )}
        </div>
      </div>

      <ProductHighlights />
      <PopularCategory />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
