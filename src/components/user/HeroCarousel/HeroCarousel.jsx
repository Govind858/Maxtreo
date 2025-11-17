import { useState, useEffect, useRef } from 'react';
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
  // FaChevronLeft as FaLeft,
  // FaChevronRight as FaRight
} from "react-icons/fa";
import { getAllProduct } from '../../../Services/Products';
import baseUrl from '../../../Static/Static';
import { useAuth } from '../../../Context/UserContext';
import { addTocart as addToCartService } from '../../../Services/userApi';
import Alert from '../Alert/Alert';
import Loader from '../../../Loader/Loader';

// Mock API function - replace with your actual import
const getPageData = async (slug) => {
  // Simulating API call with mock data
  return {
    id: 3,
    name: "Featured Printers",
    slug: "featured-printers",
    description: "Experience high-speed, high-quality printing designed for efficiency and performance",
    hero_carousels: [
      {
        id: 4,
        image: "https://metrix.pythonanywhere.com/media/carousel_images/espson-eco-tank-2.jpg",
        alt_text: "ltra-high-yield ink bottles that minimize refills. Ideal for professionals and families",
        head_one: "Print Smart. Save Big",
        head_two: "Efficient ink-tank printing for work and home prod",
        description: "Experience cost-effective printing with the Epson EcoTank L6460, built to deliver speed, precision, and performance. Enjoy automatic duplex printing, wireless connectivity",
        button_text: "Shop Now",
        button_link: "http://localhost:3000/Details/11",
        order: 1
      },
      {
        id: 3,
        image: "https://metrix.pythonanywhere.com/media/carousel_images/epson-eco-tank-3.jpg",
        alt_text: "The EcoTank L3216 delivers crisp prints at up to 5760 × 1440 dpi resolution, and yields thousands",
        head_one: "Print More. Worry Less.",
        head_two: "High-yield ink-tank convenience for home and small",
        description: "Discover a smart all-in-one printing solution with ultra-low cost per page and spill-free refill bottles. With print, scan and copy functions in a compact design, the EcoTank L3216 delivers crisp",
        button_text: "Shop Now",
        button_link: "http://localhost:3000/Details/11",
        order: 7
      }
    ]
  };
};

const HeroCarousel = () => {
  // Hero Carousel States
  const [carouselData, setCarouselData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSlug = 'featured-printer';

  // Product Carousel States
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [darkMode] = useState(false);
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

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }

    return () => {
      document.body.classList.remove('dark');
      document.body.classList.remove('light');
    };
  }, [darkMode]);

  // Hero Carousel Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPageData(pageSlug);
        
        if (data && data.hero_carousels) {
          const sortedCarousels = [...data.hero_carousels].sort((a, b) => a.order - b.order);
          setCarouselData(sortedCarousels);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Product Fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        let productData = await getAllProduct();
        console.log("product data:",productData)
        // Show all products
        setProducts(productData || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

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
      
      // Check scroll buttons only on desktop
      if (scrollContainerRef.current && window.innerWidth >= 1024) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowScrollButtons(scrollWidth > clientWidth);
      } else {
        setShowScrollButtons(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [products]); // Re-run when products change

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

  // const scrollLeft = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  //   }
  // };

  // const scrollRight = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  //   }
  // };

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

  const filteredProducts = products;

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
        <div className="w-full lg:w-1/2 h-64 lg:h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="animate-pulse text-slate-600 text-lg">Loading Hero...</div>
        </div>
        <div className="w-full lg:w-1/2 h-64 lg:h-[400px] bg-white flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-64 lg:h-[400px] bg-red-50 flex items-center justify-center">
          <div className="text-red-600 text-center">
            <p className="text-lg font-semibold">Error loading carousel</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-64 lg:h-[400px] bg-white flex items-center justify-center">
          <p className="text-gray-600">Products loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={`flex flex-col lg:flex-row ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        {/* Left Side: Hero Carousel */}
        <div className="w-full lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 h-64 lg:h-[400px]">
          {carouselData.length === 0 ? (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
              <p className="text-slate-600">No carousel items available</p>
            </div>
          ) : (
            <>
              {carouselData.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
                    
                    <img
                      src={slide.image}
                      alt={slide.alt_text}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 z-20 flex items-center">
                      <div className="w-full px-2 md:px-4 lg:px-8">
                        <div className="max-w-md space-y-2 md:space-y-3">
                          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                            {slide.head_one}
                          </h1>
                          
                          <h2 className="text-sm md:text-base lg:text-lg text-slate-200 font-medium">
                            {slide.head_two}
                          </h2>
                          
                          <p className="text-xs md:text-sm lg:text-base text-slate-300 leading-relaxed max-w-sm line-clamp-3">
                            {slide.description}
                          </p>
                          
                          <div className="pt-2">
                            <a
                              href={slide.button_link}
                              className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
                            >
                              {slide.button_text}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300 group"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300 group"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                {carouselData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-8 h-1.5 bg-white'
                        : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Side: Product Carousel */}
        <div className="w-full lg:w-1/2 relative h-64 lg:h-[400px] overflow-hidden bg-white dark:bg-black">
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
            <div className={`h-full flex items-center justify-center px-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p className="text-lg font-semibold">No products found.</p>
            </div>
          ) : (
            <div className="relative h-full p-3">
              {/* Desktop: Horizontal Scroll Container */}
              {isDesktop ? (
                <>
                  {/* Scroll Buttons - Desktop Only */}
                  {showScrollButtons && (
                    <>
                      {/* <button 
                        onClick={scrollLeft}
                        className={`absolute left-1 top-1/2 transform -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-900 text-white border-2 border-gray-700 hover:bg-[#07bff]' 
                            : 'bg-white text-black border-2 border-gray-300 hover:bg-[#07bff]'
                        } shadow-lg`}
                      >
                        <FaLeft className="text-xs" />
                      </button> */}
                      {/* <button 
                        onClick={scrollRight}
                        className={`absolute right-1 top-1/2 transform -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-900 text-white border-2 border-gray-700 hover:bg-[#07bff]' 
                            : 'bg-white text-black border-2 border-gray-300 hover:bg-[#07bff]'
                        } shadow-lg`}
                      >
                        <FaRight className="text-xs" />
                      </button> */}
                    </>
                  )}

                  {/* Desktop Products Scroll Container - Adjusted for half width */}
                  <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-3 pb-6 h-full px-1 -mx-1 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id}
                        onClick={() => navigateToDetails(product.id)}
                        className={`flex-shrink-0 w-56 group rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border h-full flex flex-col ${darkMode 
                          ? 'bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-[#07bff]' 
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-xl hover:border-[#07bff]'
                        }`}
                      >
                       

                        {/* Image Container */}
                        <div className="relative h-32 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                          <img 
                            src={product.images?.[0]?.image 
                              ? baseUrl + product.images[0].image 
                              : "https://pnghq.com/wp-content/uploads/pnghq.com-gaming-computer-picture-p-4.png"
                            } 
                            alt={product.name}
                            className="h-24 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                          
                          {/* Quick Action Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <div className={`opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-1 text-white`}>
                              <button className="w-8 h-8 rounded-full bg-[#07bff] flex items-center justify-center shadow-lg hover:bg-white hover:text-[#07bff] transition-all duration-300">
                                <FaBolt className="text-xs" />
                              </button>
                              <span className="text-xs font-semibold">Quick View</span>
                            </div>
                          </div>
                        </div>

                        {/* Product Content */}
                        <div className="p-3 flex-1 flex flex-col justify-between">
                          <div className="mb-2">
                            <h2 className="font-[Rajdhani] text-sm font-bold mb-1.5 line-clamp-2 leading-tight text-black dark:text-white">
                              {product.name}
                            </h2>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-0.5 mb-1.5">
                              {[1,2,3,4,5].map((star) => (
                                <FaStar 
                                  key={star}
                                  className={`text-xs ${
                                    star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-500'
                                  }`}
                                />
                              ))}
                              <span className={`text-xs ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                (4.0)
                              </span>
                            </div>

                            <div className="flex items-baseline gap-1.5">
                              <span className="text-lg font-bold font-[Rajdhani] text-black dark:text-white">
                                ₹ {product.price?.toLocaleString()}
                              </span>
                              <span className={`text-xs line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                ₹ {(product.price * 1.2)?.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-1.5">
                            <button 
                              onClick={(e) => addTocart(product.id, e)}
                              disabled={addingToCart === product.id}
                              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 text-xs font-[Rajdhani] font-semibold transition-all duration-300 ${
                                addingToCart === product.id
                                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300 cursor-not-allowed'
                                  : darkMode
                                    ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                              }`}
                            >
                              {addingToCart === product.id ? (
                                <>
                                  <FaSpinner className="animate-spin text-xs" /> 
                                  <span>ADD</span>
                                </>
                              ) : (
                                <>
                                  <FaShoppingCart className="text-xs" /> 
                                  <span>CART</span>
                                </>
                              )}
                            </button>

                            <button 
                              onClick={(e) => handleBuyNow(product, e)}
                              className="flex-1 py-1.5 rounded-lg text-xs font-[Rajdhani] font-bold text-white flex items-center justify-center gap-1 bg-blue-500 shadow-lg hover:bg-blue-600"
                            >
                              <FaBolt className="text-xs" />
                              <span>BUY</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Scroll Indicator - Desktop Only */}
                  <div className="flex justify-center mt-3 absolute bottom-3 left-1/2 -translate-x-1/2">
                    <div className={`flex gap-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-full p-1`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#07bff]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                    </div>
                  </div>
                </>
              ) : (
                /* Mobile: Vertical Grid Layout */
                <div className="h-full overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2 h-full">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id}
                        onClick={() => navigateToDetails(product.id)}
                        className={`group rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border flex flex-col ${darkMode 
                          ? 'bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-[#07bff]' 
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-xl hover:border-[#07bff]'
                        }`}
                      >
                        {/* Product Badge */}
                        <div className="absolute top-2 left-2 z-10">
                          <span className="px-2 py-1 rounded-full text-xs font-bold bg-[#07bff] text-white shadow-lg">
                            FEATURED
                          </span>
                        </div>

                        {/* Image Container */}
                        <div className="relative h-28 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                          <img 
                            src={product.images?.[0]?.image 
                              ? baseUrl + product.images[0].image 
                              : "https://pnghq.com/wp-content/uploads/pnghq.com-gaming-computer-picture-p-4.png"
                            } 
                            alt={product.name}
                            className="h-20 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                          
                          {/* Quick Action Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <div className={`opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-1 text-white`}>
                              <button className="w-7 h-7 rounded-full bg-[#07bff] flex items-center justify-center shadow-lg hover:bg-white hover:text-[#07bff] transition-all duration-300">
                                <FaBolt className="text-xs" />
                              </button>
                              <span className="text-xs font-semibold">View</span>
                            </div>
                          </div>
                        </div>

                        {/* Product Content */}
                        <div className="p-2.5 flex-1 flex flex-col justify-between min-h-0">
                          <div className="mb-2 flex-shrink-0">
                            <h2 className="font-[Rajdhani] text-xs font-bold mb-1 line-clamp-2 leading-tight text-black dark:text-white">
                              {product.name}
                            </h2>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-0.5 mb-1">
                              {[1,2,3,4,5].map((star) => (
                                <FaStar 
                                  key={star}
                                  className={`text-[10px] ${
                                    star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-500'
                                  }`}
                                />
                              ))}
                              <span className={`text-[10px] ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                (4.0)
                              </span>
                            </div>

                            <div className="flex items-baseline gap-1 flex-wrap">
                              <span className="text-sm font-bold font-[Rajdhani] text-black dark:text-white">
                                ₹ {product.price?.toLocaleString()}
                              </span>
                              <span className={`text-[10px] line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                ₹ {(product.price * 1.2)?.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-1.5 flex-shrink-0">
                            <button 
                              onClick={(e) => addTocart(product.id, e)}
                              disabled={addingToCart === product.id}
                              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-0.5 text-[10px] font-[Rajdhani] font-semibold transition-all duration-300 ${
                                addingToCart === product.id
                                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300 cursor-not-allowed'
                                  : darkMode
                                    ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                              }`}
                            >
                              {addingToCart === product.id ? (
                                <>
                                  <FaSpinner className="animate-spin text-[10px]" /> 
                                  <span>ADD</span>
                                </>
                              ) : (
                                <>
                                  <FaShoppingCart className="text-[10px]" /> 
                                  <span>CART</span>
                                </>
                              )}
                            </button>

                            <button 
                              onClick={(e) => handleBuyNow(product, e)}
                              className="flex-1 py-1.5 rounded-lg text-[10px] font-[Rajdhani] font-bold text-white flex items-center justify-center gap-0.5 bg-blue-500 shadow-lg hover:bg-blue-600"
                            >
                              <FaBolt className="text-[10px]" />
                              <span>BUY</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile: Load More Indicator */}
                  <div className="flex justify-center mt-3">
                    <div className={`flex gap-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-full p-1`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#07bff]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                    </div>
                  </div>
                </div>
              )}

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