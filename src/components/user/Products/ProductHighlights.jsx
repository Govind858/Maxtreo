import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  FaSpinner, 
  FaShoppingCart,
  FaBolt,
  FaStar
} from "react-icons/fa";
import { getAllProduct } from '../../../Services/Products';
import baseUrl from '../../../Static/Static';
import { useAuth } from '../../../Context/UserContext';
import { addTocart as addToCartService } from '../../../Services/userApi';
import Alert from '../Alert/Alert';
import Loader from '../../../Loader/Loader';

function ProductHighlights() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [guestCart, setGuestCart] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const alertTimeoutRef = useRef(null);
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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let productData = await getAllProduct();
        console.log("product data:",productData)
        setProducts(productData || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle window resize for desktop/mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const seeAllProducts = () => {
    navigate('/products');
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="py-8 bg-white text-black">
      {alertData && (
        <Alert 
          type={alertData.type}
          message={alertData.message}
          productId={alertData.productId}
          error={alertData.error}
          onClose={() => setAlertData(null)}
        />
      )}

      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8 p-4 sm:p-6 rounded-xl border bg-gray-50 border-gray-200">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[Rajdhani] tracking-tight text-primary-blue relative inline-block">
              Featured Products
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
              Discover our exclusive collection
            </p>
          </div>
        </div>

        {/* Products Container - Responsive Layout */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-xl border bg-gray-50 text-gray-600 border-gray-200">
            <p className="text-lg font-semibold">No featured products available.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Desktop: Horizontal Layout */}
            {isDesktop ? (
              <div className="grid grid-cols-4 gap-6">
                {featuredProducts.map((product) => {
                  const rating = product.rating_summary ? parseFloat(product.rating_summary.average_rating) || 0 : 0;
                  const fullStars = Math.floor(rating);
                  const hasHalfStar = rating % 1 >= 0.5;
                  const totalReviews = product.rating_summary ? product.rating_summary.total_reviews || 0 : 0;
                  return (
                    <div 
                      key={product.id}
                      onClick={() => navigateToDetails(product.id)}
                      className="group rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border bg-white border-gray-200 hover:bg-gray-50 hover:shadow-xl hover:border-[#07bff]"
                    >
                      {/* Product Badge */}
                   

                      {/* Image Container */}
                      <div className="relative h-56 flex items-center justify-center overflow-hidden bg-gray-100">
                        <img 
                          src={product.images?.[0]?.image 
                            ? baseUrl + product.images[0].image 
                            : "https://pnghq.com/wp-content/uploads/pnghq.com-gaming-computer-picture-p-4.png"
                          } 
                          alt={product.name}
                          className="h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        
                        {/* Quick Action Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-2 text-white">
                            <button className="w-12 h-12 rounded-full bg-[#07bff] flex items-center justify-center shadow-lg hover:bg-white hover:text-[#07bff] transition-all duration-300">
                              <FaBolt className="text-sm" />
                            </button>
                            <span className="text-xs font-semibold">Quick View</span>
                          </div>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h2 className="font-[Rajdhani] text-xl font-bold mb-3 line-clamp-2 leading-tight text-black">
                            {product.name}
                          </h2>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-3">
                            {[1,2,3,4,5].map((star) => {
                              if (star <= fullStars) {
                                return (
                                  <FaStar 
                                    key={star}
                                    className="text-sm text-yellow-400 fill-current"
                                  />
                                );
                              } else if (star === fullStars + 1 && hasHalfStar) {
                                return (
                                  <FaStar 
                                    key={star}
                                    className="text-sm text-yellow-400 fill-current"
                                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                                  />
                                );
                              } else {
                                return (
                                  <FaStar 
                                    key={star}
                                    className="text-sm text-gray-300"
                                  />
                                );
                              }
                            })}
                            <span className="text-sm ml-2 text-gray-600">
                              ({rating.toFixed(1)}){totalReviews > 0 && ` (${totalReviews})`}
                            </span>
                          </div>

                          <div className="flex items-baseline gap-3">
                            <span className="text-2xl font-bold font-[Rajdhani] text-black">
                              ₹ {product.price?.toLocaleString()}
                            </span>
                            <span className="text-sm line-through text-gray-400">
                              ₹ {(product.price * 1.2)?.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button 
                            onClick={(e) => addTocart(product.id, e)}
                            disabled={addingToCart === product.id}
                            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-[Rajdhani] font-semibold transition-all duration-300 ${
                              addingToCart === product.id
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                            }`}
                          >
                            {addingToCart === product.id ? (
                              <>
                                <FaSpinner className="animate-spin text-sm" /> 
                                <span>ADDING...</span>
                              </>
                            ) : (
                              <>
                                <FaShoppingCart className="text-sm" /> 
                                <span>ADD TO CART</span>
                              </>
                            )}
                          </button>

                          <button 
                            onClick={(e) => handleBuyNow(product, e)}
                            className="flex-1 py-3 rounded-xl text-sm font-[Rajdhani] font-bold text-white flex items-center justify-center gap-2 bg-blue-500 shadow-lg hover:bg-blue-600"
                          >
                            <FaBolt className="text-sm" />
                            <span
                              key={product.id}
                                onClick={() => navigateToDetails(product.id)}
                            >BUY NOW</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Mobile: Vertical Grid Layout */
              <div className="grid grid-cols-2 gap-3">
                {featuredProducts.map((product) => {
                  const rating = product.rating_summary ? parseFloat(product.rating_summary.average_rating) || 0 : 0;
                  const fullStars = Math.floor(rating);
                  const hasHalfStar = rating % 1 >= 0.5;
                  const totalReviews = product.rating_summary ? product.rating_summary.total_reviews || 0 : 0;
                  return (
                    <div 
                      key={product.id}
                      onClick={() => navigateToDetails(product.id)}
                      className="group rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border flex flex-col bg-white border-gray-200 hover:bg-gray-50 hover:shadow-xl hover:border-[#07bff]"
                    >
                      {/* Product Badge */}
                      

                      {/* Image Container */}
                      <div className="relative h-36 flex items-center justify-center overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={product.images?.[0]?.image 
                            ? baseUrl + product.images[0].image 
                            : "https://pnghq.com/wp-content/uploads/pnghq.com-gaming-computer-picture-p-4.png"
                          } 
                          alt={product.name}
                          className="h-28 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        
                        {/* Quick Action Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-1 text-white">
                            <button className="w-10 h-10 rounded-full bg-[#07bff] flex items-center justify-center shadow-lg hover:bg-white hover:text-[#07bff] transition-all duration-300">
                              <FaBolt className="text-xs" />
                            </button>
                            <span className="text-xs font-semibold">Quick View</span>
                          </div>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-2.5 flex-1 flex flex-col justify-between min-h-0">
                        <div className="mb-2 flex-shrink-0">
                          <h2 className="font-[Rajdhani] text-sm font-bold mb-1.5 line-clamp-2 leading-tight text-black">
                            {product.name}
                          </h2>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-0.5 mb-1.5">
                            {[1,2,3,4,5].map((star) => {
                              if (star <= fullStars) {
                                return (
                                  <FaStar 
                                    key={star}
                                    className="text-[10px] text-yellow-400 fill-current"
                                  />
                                );
                              } else if (star === fullStars + 1 && hasHalfStar) {
                                return (
                                  <FaStar 
                                    key={star}
                                    className="text-[10px] text-yellow-400 fill-current"
                                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                                  />
                                );
                              } else {
                                return (
                                  <FaStar 
                                    key={star}
                                    className="text-[10px] text-gray-300"
                                  />
                                );
                              }
                            })}
                            <span className="text-[10px] ml-1 text-gray-600">
                              ({rating.toFixed(1)}){totalReviews > 0 && ` (${totalReviews})`}
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-base font-bold font-[Rajdhani] text-black">
                              ₹ {product.price?.toLocaleString()}
                            </span>
                            <span className="text-[10px] line-through text-gray-400">
                              ₹ {(product.price * 1.2)?.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-1.5 flex-shrink-0">
                          <button 
                            onClick={(e) => addTocart(product.id, e)}
                            disabled={addingToCart === product.id}
                            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 text-[10px] font-[Rajdhani] font-semibold transition-all duration-300 ${
                              addingToCart === product.id
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
                            className="flex-1 py-1.5 rounded-lg text-[10px] font-[Rajdhani] font-bold text-white flex items-center justify-center gap-1 bg-blue-500 shadow-lg"
                          >
                            <FaBolt className="text-[10px]" />
                            <span>BUY</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* See All Products Link */}
            <div className="flex justify-center mt-8">
              <button 
                onClick={seeAllProducts}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer underline"
              >
                See All Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductHighlights;