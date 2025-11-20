import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { 
  FaSpinner, 
  FaShoppingCart,
  FaBolt,
  FaStar,
  FaChevronLeft as FaLeft,
  FaChevronRight as FaRight
} from "react-icons/fa";
import { getProductCategories, getPageData } from '../../../Services/Settings';
import { getAllProduct } from '../../../Services/Products';
import baseUrl from '../../../Static/Static';
import { useAuth } from '../../../Context/UserContext';
import { addTocart as addToCartService } from '../../../Services/userApi';
import Alert from '../Alert/Alert';
import Loader from '../../../Loader/Loader';

const HeroCarousel = () => {
  // Hero Carousel States
  const [carouselData, setCarouselData] = useState([]);
  const [currentSlug, setCurrentSlug] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Product Carousel States
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [guestCart, setGuestCart] = useState([]);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const alertTimeoutRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Guest cart management functions
  const getGuestCart = () => {
    try {
      const cart = sessionStorage.getItem('guestCart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error reading guest cart:', error);
      return [];
    }
  };

  const saveGuestCart = (cartItems) => {
    try {
      sessionStorage.setItem('guestCart', JSON.stringify(cartItems));
      setGuestCart(cartItems);
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  };

  const addToGuestCart = (productId, product) => {
    const currentCart = getGuestCart();
    const existingItemIndex = currentCart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({
        productId: productId,
        productName: product.name,
        productPrice: product.price,
        productImage: product.images?.[0]?.image || null,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }
    
    saveGuestCart(currentCart);
    return currentCart;
  };

  const getGuestCartCount = () => {
    return guestCart.reduce((total, item) => total + item.quantity, 0);
  };

  // Initialize guest cart on component mount
  useEffect(() => {
    const initialCart = getGuestCart();
    setGuestCart(initialCart);
  }, []);

  // Fetch Categories and Set Initial Slug
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getProductCategories();
        if (response && response.data && Array.isArray(response.data)) {
          const cats = response.data;
          // Prioritize 'featured-printers' slug if available, otherwise first active
          const featuredSlug = cats.find(c => c.slug === 'featured-printers' && c.is_active)?.slug ||
                              cats.find(c => c.is_active)?.slug ||
                              cats[0]?.slug;
          if (featuredSlug) {
            setCurrentSlug(featuredSlug);
          }
        } else {
          console.error('Invalid categories response:', response);
          setError('Failed to parse categories data');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  // Fetch Page Data with Slug and Hourly Refresh
  useEffect(() => {
    if (!currentSlug) return;

    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPageData(currentSlug);
        
        if (data) {
          setCategoryName(data.name);
          if (data.hero_carousels) {
            const sortedCarousels = [...data.hero_carousels].sort((a, b) => a.order - b.order);
            setCarouselData(sortedCarousels);
          } else {
            setCarouselData([]);
            setError('No carousel data available');
          }
        } else {
          setCarouselData([]);
          setError('No page data available');
        }
      } catch (err) {
        console.error('Error fetching page data:', err);
        setError(err.message || 'Failed to load page data');
        setCarouselData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();

    // Set interval to refetch every 1 hour (3600000 ms)
    const interval = setInterval(fetchPageData, 3600000);

    return () => clearInterval(interval);
  }, [currentSlug]);

  // Product Fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        let productData = await getAllProduct();
        console.log("product data:",productData)
        // Show all products initially
        setProducts(productData || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtered Products
  // Filter products based on category name
  const filteredProducts = useMemo(() => {
    if (!categoryName || !products.length) {
      console.log('No category name or products:', { categoryName, productsCount: products.length });
      return [];
    }
    
    console.log(`Filtering products for category name: "${categoryName}"`);
    console.log('Available products:', products.map(p => ({ id: p.id, name: p.name, category: p.category })));
    
    const categoryNameLower = categoryName.toLowerCase();
    
    const filtered = products.filter(product => {
      if (!product.category) {
        console.log(`Product ${product.id} has no category`);
        return false;
      }
      
      const productCategoryLower = product.category.toLowerCase();
      const matches = categoryNameLower.includes(productCategoryLower) || 
                     productCategoryLower.includes(categoryNameLower);
      
      console.log(`Product: ${product.name}, Category: ${product.category}, Matches: ${matches}`);
      return matches;
    });
    
    console.log(`Filtered ${filtered.length} products out of ${products.length}`);
    return filtered;
  }, [products, categoryName]);

  // Hero Auto-slide
  useEffect(() => {
    if (carouselData.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselData.length]);

  // Resize handler for desktop/mobile and scroll buttons
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      
      // Check scroll buttons for tablet and desktop (>=768px)
      if (scrollContainerRef.current && window.innerWidth >= 768) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowScrollButtons(scrollWidth > clientWidth);
      } else {
        setShowScrollButtons(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [filteredProducts]); // Re-run when filtered products change

  const showAlert = (data) => {
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }

    setAlertData(data);

    alertTimeoutRef.current = setTimeout(() => {
      setAlertData(null);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth >= 1024 ? 300 : 200;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth >= 1024 ? 300 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const addTocart = async (id, event) => {
    event.stopPropagation();
    
    try {
      setAddingToCart(id);
      
      if (!user) {
        const product = products.find(p => p.id === id);
        if (product) {
          addToGuestCart(id, product);
          const cartCount = getGuestCartCount();
          
          showAlert({
            type: "success",
            message: `Item added to cart! You have ${cartCount} item(s) in cart. Login to sync your cart.`,
            productId: id
          });
        }
      } else {
        let addToCart = await addToCartService(id);
        if (addToCart) {
          showAlert({
            type: "success",
            message: "Item successfully added to cart",
            productId: id
          });
        }
      }
    } catch (error) {
      console.log(error);
      showAlert({
        type: "error",
        message: `Failed to add to cart: ${error.message || "Unknown error"}`,
      });
    } finally {
      setAddingToCart(null);
    }
  };

  const handleBuyNow = (product, event) => {
    event.stopPropagation();
    
    if (!user) {
      addToGuestCart(product.id, product);
      showAlert({
        type: "info",
        message: "Please login to proceed with purchase"
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      console.log(product, "buy now product");
    }
  };

  const navigateToDetails = (id) => {
    navigate(`/Details/${id}`);
  };

  // Hero Navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  // Combined Loading State (show skeleton for both sides if either is loading)
  const isOverallLoading = loading || loadingProducts;

  if (isOverallLoading) {
    return (
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-[30vh] lg:h-[50vh] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="animate-pulse text-slate-600 text-lg">Loading Hero...</div>
        </div>
        <div className="w-full lg:w-1/2 h-[30vh] lg:h-[50vh] bg-white flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-[30vh] lg:h-[50vh] bg-red-50 flex items-center justify-center">
          <div className="text-red-600 text-center">
            <p className="text-lg font-semibold">Error loading carousel</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-[30vh] lg:h-[50vh] bg-white flex items-center justify-center">
          <p className="text-gray-600">Products loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-4">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Hero Carousel */}
        <div className="w-full lg:w-1/2 relative overflow-hidden bg-slate-900 h-[30vh] lg:h-[50vh] group rounded-2xl shadow-2xl">
  {carouselData.length === 0 ? (
    /* Empty State - Fixed with standard SVG */
    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-800">
      <svg 
        className="w-12 h-12 mb-2 opacity-50" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-sm font-medium">No carousel items available</p>
    </div>
  ) : (
    <>
      {carouselData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Zoom Effect */}
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-black/30 z-10" /> 
            <img
              src={slide.image.startsWith('http') ? slide.image : baseUrl + slide.image}
              alt={slide.alt_text}
              className={`w-full h-full object-cover transition-transform duration-[3000ms] ease-out ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>

          {/* Glass Content Card */}
          <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 z-20 flex justify-start">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 lg:p-6 rounded-xl shadow-lg w-full max-w-lg transform transition-all duration-500">
              
              {/* Tag / Head Two */}
              <span className="inline-block py-0.5 px-2 rounded bg-blue-500/20 text-blue-200 text-[10px] lg:text-xs font-bold tracking-wider uppercase mb-2 border border-blue-500/30">
                {slide.head_two}
              </span>

              {/* Head One */}
              <h1 className="text-xl lg:text-3xl font-bold text-white leading-tight mb-1.5 lg:mb-2 drop-shadow-sm line-clamp-1">
                {slide.head_one}
              </h1>

              {/* Description */}
              <p className="text-slate-200 text-xs lg:text-sm line-clamp-2 mb-3 lg:mb-4 leading-relaxed">
                {slide.description}
              </p>

              {/* Button */}
              <a
                href={slide.button_link}
                className="inline-flex items-center justify-center px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {slide.button_text}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows (Using standard SVGs) */}
      <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 z-30 flex items-center gap-2">
        <button
          onClick={goToPrevious}
          className="p-1.5 lg:p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all border border-white/10 hover:border-white/30"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="p-1.5 lg:p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all border border-white/10 hover:border-white/30"
           aria-label="Next slide"
        >
          <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress Bar Indicators at Top */}
      <div className="absolute top-0 left-0 right-0 z-30 flex px-1 pt-1">
        {carouselData.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/20 overflow-hidden mx-0.5 rounded-full">
            <div
              className={`h-full bg-blue-500 transition-all duration-500 ease-out ${
                index === currentSlide ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>
    </>
  )}
</div>

        {/* Right Side: Product Carousel */}
        <div className="w-full lg:w-1/2 relative h-[30vh] lg:h-[50vh] overflow-hidden bg-white">
          {alertData && (
            <Alert 
              type={alertData.type}
              message={alertData.message}
              productId={alertData.productId}
              error={alertData.error}
              onClose={() => setAlertData(null)}
            />
          )}

          {loadingProducts ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="h-full flex items-center justify-center px-6 text-gray-600">
              <p className="text-lg font-semibold">No products found for this category.</p>
            </div>
          ) : (
            <div className="relative h-full p-1 lg:p-3">
              {/* Scroll Buttons */}
              {showScrollButtons && (
                <>
                  <button 
                    onClick={scrollLeft}
                    className="absolute left-1 top-1/2 transform -translate-y-1/2 z-20 w-6 h-6 lg:w-9 lg:h-9 rounded-full flex items-center justify-center transition-all duration-300 bg-white text-black border-2 border-gray-300 hover:bg-[#07bff] shadow-lg"
                  >
                    <FaLeft className="text-xs" />
                  </button>
                  <button 
                    onClick={scrollRight}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 z-20 w-6 h-6 lg:w-9 lg:h-9 rounded-full flex items-center justify-center transition-all duration-300 bg-white text-black border-2 border-gray-300 hover:bg-[#07bff] shadow-lg"
                  >
                    <FaRight className="text-xs" />
                  </button>
                </>
              )}

              {/* Products Scroll Container */}
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-1.5 lg:gap-3 pb-2 lg:pb-6 h-full px-1 -mx-1 scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredProducts.map((product) => {
                  const rating = product.rating_summary ? parseFloat(product.rating_summary.average_rating) || 0 : 0;
                  const fullStars = Math.floor(rating);
                  const hasHalfStar = rating % 1 >= 0.5;
                  const totalReviews = product.rating_summary ? product.rating_summary.total_reviews || 0 : 0;
                  return (
                    <div 
                      key={product.id}
                      onClick={() => navigateToDetails(product.id)}
                      className="flex-shrink-0 w-40 lg:w-56 h-full group rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border flex flex-col bg-white border-gray-200 hover:bg-gray-50 hover:shadow-xl hover:border-[#07bff]"
                    >
                      
                      {/* Image Container */}
                      <div className="relative h-20 lg:h-28 flex items-center justify-center overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={product.images?.[0]?.image 
                            ? baseUrl + product.images[0].image 
                            : "https://pnghq.com/wp-content/uploads/pnghq.com-gaming-computer-picture-p-4.png"
                          } 
                          alt={product.name}
                          className="h-16 lg:h-20 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        
                        {/* Quick Action Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-1 lg:gap-2 text-white">
                            <button className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#07bff] flex items-center justify-center shadow-lg hover:bg-white hover:text-[#07bff] transition-all duration-300">
                              <FaBolt className="text-xs lg:text-sm" />
                            </button>
                            <span className="text-xs lg:text-xs font-semibold hidden lg:block">Quick View</span>
                          </div>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-1.5 lg:p-2.5 flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
                        <div className="mb-1 space-y-1 flex-shrink-0">
                          <h2 className="font-[Rajdhani] text-xs lg:text-sm font-bold mb-1 line-clamp-2 leading-tight text-black">
                            {product.name}
                          </h2>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-0.5 mb-1">
                            {[1,2,3,4,5].map((star) => {
                              if (star <= fullStars) {
                                return (
                                  <FaStar 
                                    key={star}
                                    className="text-xs lg:text-sm text-yellow-400 fill-current"
                                  />
                                );
                              } else if (star === fullStars + 1 && hasHalfStar) {
                                return (
                                  <FaStar 
                                    key={star}
                                    className="text-xs lg:text-sm text-yellow-400 fill-current"
                                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                                  />
                                );
                              } else {
                                return (
                                  <FaStar 
                                    key={star}
                                    className="text-xs lg:text-sm text-gray-300"
                                  />
                                );
                              }
                            })}
                            <span className="text-xs lg:text-sm ml-1 text-gray-600">
                              ({rating.toFixed(1)}){totalReviews > 0 && ` (${totalReviews})`}
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-sm lg:text-base font-bold font-[Rajdhani] text-black">
                              ₹ {product.price?.toLocaleString()}
                            </span>
                            <span className="text-xs lg:text-sm line-through text-gray-400">
                              ₹ {(product.price * 1.2)?.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-0.5 lg:gap-1 flex-shrink-0">
                          <button 
                            onClick={(e) => addTocart(product.id, e)}
                            disabled={addingToCart === product.id}
                            className={`flex-1 py-1 lg:py-1.5 rounded-lg lg:rounded-xl flex items-center justify-center gap-0.5 lg:gap-1 text-xs lg:text-sm font-[Rajdhani] font-semibold transition-all duration-300 ${
                              addingToCart === product.id
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                            }`}
                          >
                            {addingToCart === product.id ? (
                              <>
                                <FaSpinner className="animate-spin text-xs lg:text-sm" /> 
                                <span className="hidden lg:inline">ADD</span>
                              </>
                            ) : (
                              <>
                                <FaShoppingCart className="text-xs lg:text-sm" /> 
                                <span className="hidden lg:inline">CART</span>
                              </>
                            )}
                          </button>

                          <button 
                            onClick={(e) => handleBuyNow(product, e)}
                            className="flex-1 py-1 lg:py-1.5 rounded-lg lg:rounded-xl text-xs lg:text-sm font-[Rajdhani] font-bold text-white flex items-center justify-center gap-0.5 lg:gap-1 bg-blue-500 shadow-lg hover:bg-blue-600"
                          >
                            <FaBolt className="text-xs lg:text-sm" />
                            <span className="hidden lg:inline">BUY</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scroll Indicator */}
              <div className="flex justify-center mt-1 lg:mt-2 absolute bottom-1 lg:bottom-2 left-1/2 -translate-x-1/2">
                <div className="flex gap-0.5 lg:gap-1 bg-gray-100/80 rounded-full p-0.5 lg:p-1 backdrop-blur-sm">
                  <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-[#07bff]"></div>
                  <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-gray-400"></div>
                  <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-gray-400"></div>
                </div>
              </div>

              {/* Custom scrollbar hide */}
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;