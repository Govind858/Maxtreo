import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  FaSpinner, 
  FaShoppingCart,
  FaFire,
  FaPercentage,
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

  const navigateToDetails = (id) => {
    navigate(`/Details/${id}`);
  };

  const seeAllProducts = () => {
    navigate('/products');
  };

  const featuredProducts = products.slice(0, 4);

  // Calculate discount percentage
  const getDiscount = (price) => Math.round(((price * 0.2) / (price * 1.2)) * 100);

  // Vibrant color gradients for cards
  const cardGradients = [
    'from-pink-100 via-purple-100 to-blue-100',
    'from-cyan-100 via-teal-100 to-green-100',
    'from-orange-100 via-red-100 to-pink-100',
    'from-indigo-100 via-purple-100 to-fuchsia-100'
  ];

  return (
    <div className="py-10 bg-white">
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
        {/* Section Header - Clean & Bold */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 font-[Rajdhani]">
            Best Sellers
          </h2>
          <button 
            onClick={seeAllProducts}
            className="bg-black text-white px-6 py-2.5 font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            See All Products
          </button>
        </div>

        {/* Products Container - Responsive Layout */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-16 px-6 border bg-gray-50 text-gray-600 border-gray-200">
            <p className="text-lg font-semibold">No featured products available.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Desktop: Horizontal Layout */}
            {isDesktop ? (
              <div className="grid grid-cols-4 gap-6">
                {featuredProducts.map((product, index) => {
                  const discount = getDiscount(product.price);
                  
                  return (
                    <div 
                      key={product.id}
                      onClick={() => navigateToDetails(product.id)}
                      className="group bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative"
                    >
                      {/* Yellow accent details */}
                      <div className="absolute top-0 left-0 w-1 h-16 bg-yellow-400"></div>
                      <div className="absolute top-0 right-0 w-12 h-1 bg-yellow-400"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-400"></div>

                      {/* Image Container */}
                      <div className="relative h-56 flex items-center justify-center overflow-hidden bg-gray-50">
                        <img 
                          src={product.images?.[0]?.image 
                            ? baseUrl + product.images[0].image 
                            : "https://pnghq.com/wp-content/uploads/pnghq.com-gaming-computer-picture-p-4.png"
                          } 
                          alt={product.name}
                          className="h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Yellow accent in image area */}
                        <div className="absolute bottom-2 right-2 w-2 h-10 bg-yellow-400"></div>
                      </div>

                      {/* Product Content */}
                      <div className="p-5">
                        <h2 className="font-[Rajdhani] text-xl font-bold mb-4 line-clamp-2 leading-tight text-gray-900 text-center">
                          {product.name}
                        </h2>

                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="text-base font-bold font-[Rajdhani] text-gray-900">
                            ₹{product.price?.toLocaleString()}
                          </span>
                          <span className="text-sm line-through text-gray-400">
                            ₹{(product.price * 1.2)?.toLocaleString()}
                          </span>
                        </div>

                        {/* Add to Cart Button */}
                        <button 
                          onClick={(e) => addTocart(product.id, e)}
                          disabled={addingToCart === product.id}
                          className={`w-full py-2 flex items-center justify-center gap-2 text-base font-[Rajdhani] font-bold transition-all duration-300 ${
                            addingToCart === product.id
                              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                              : 'bg-black text-white hover:bg-gray-800'
                          }`}
                        >
                          {addingToCart === product.id ? (
                            <>
                              <FaSpinner className="animate-spin text-base" /> 
                              <span>Adding...</span>
                            </>
                          ) : (
                            <>
                              <FaShoppingCart className="text-base" /> 
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Mobile: Vertical Grid Layout */
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.map((product, index) => {
                  const discount = getDiscount(product.price);
                  
                  return (
                    <div 
                      key={product.id}
                      onClick={() => navigateToDetails(product.id)}
                      className="group bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative"
                    >
                      {/* Yellow accent details */}
                      <div className="absolute top-0 left-0 w-0.5 h-12 bg-yellow-400"></div>
                      <div className="absolute top-0 right-0 w-8 h-0.5 bg-yellow-400"></div>
                      <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-yellow-400"></div>

                      {/* Image Container */}
                      <div className="relative h-44 flex items-center justify-center overflow-hidden bg-gray-50">
                        <img 
                          src={product.images?.[0]?.image 
                            ? baseUrl + product.images[0].image 
                            : "https://pnghq.com/wp-content/uploads/pnghq.com-gaming-computer-picture-p-4.png"
                          } 
                          alt={product.name}
                          className="h-32 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Yellow accent in image area */}
                        <div className="absolute bottom-1 right-1 w-1.5 h-8 bg-yellow-400"></div>
                      </div>

                      {/* Product Content */}
                      <div className="p-3">
                        <h2 className="font-[Rajdhani] text-base font-bold mb-3 line-clamp-2 leading-tight text-gray-900 text-center">
                          {product.name}
                        </h2>

                        <div className="flex items-center justify-center gap-1.5 mb-3">
                          <span className="text-sm font-bold font-[Rajdhani] text-gray-900">
                            ₹{product.price?.toLocaleString()}
                          </span>
                          <span className="text-xs line-through text-gray-400">
                            ₹{(product.price * 1.2)?.toLocaleString()}
                          </span>
                        </div>

                        {/* Add to Cart Button */}
                        <button 
                          onClick={(e) => addTocart(product.id, e)}
                          disabled={addingToCart === product.id}
                          className={`w-full py-1.5 flex items-center justify-center gap-1 text-xs font-[Rajdhani] font-bold transition-all duration-300 ${
                            addingToCart === product.id
                              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                              : 'bg-black text-white hover:bg-gray-800'
                          }`}
                        >
                          {addingToCart === product.id ? (
                            <>
                              <FaSpinner className="animate-spin text-xs" /> 
                              <span>Adding</span>
                            </>
                          ) : (
                            <>
                              <FaShoppingCart className="text-xs" /> 
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* See All Products Link - Mobile */}
            {!isDesktop && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={seeAllProducts}
                  className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-all duration-300"
                >
                  See All Products
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductHighlights;