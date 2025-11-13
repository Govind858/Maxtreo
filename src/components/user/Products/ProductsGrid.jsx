import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  FaSearch, 
  FaSpinner, 
  FaFilter, 
  FaSort,
  FaShoppingCart,
  FaBolt,
  FaStar
} from "react-icons/fa";
import { getAllProduct } from '../../../Services/Products';
import baseUrl from '../../../Static/Static';
import { useAuth } from '../../../Context/UserContext';
import { addTocart as addToCartService } from '../../../Services/userApi';
import Filter from '../Filter/Filter';
import Sorting from '../Sorting/Sorting';
import Alert from '../Alert/Alert';
import Loader from '../../../Loader/Loader';

function ProductsGrid() {
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [addingToCart, setAddingToCart] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [guestCart, setGuestCart] = useState([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let productData = await getAllProduct();
        console.log("product data:", productData);
        setProducts(productData || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
          const updatedCart = addToGuestCart(id, product);
          console.log(updatedCart)
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

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };

  // const viewGuestCart = () => {
  //   if (guestCart.length === 0) {
  //     showAlert({
  //       type: "info",
  //       message: "Your cart is empty"
  //     });
  //     return;
  //   }

  //   console.log('Guest cart:', guestCart);
  //   showAlert({
  //     type: "info",
  //     message: `You have ${getGuestCartCount()} items in your cart. Login to sync.`
  //   });
  // };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen px-4 py-8 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {alertData && (
        <Alert 
          type={alertData.type}
          message={alertData.message}
          productId={alertData.productId}
          error={alertData.error}
          onClose={() => setAlertData(null)}
        />
      )}

      <div className="w-full max-w-7xl mx-auto">
        {/* Modern Compact Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Bar – Compact on Mobile */}
          <div className="relative w-full sm:w-72 md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                w-full pl-4 pr-12
                py-2 sm:py-2.5
                text-sm sm:text-base
                rounded-full border-2 focus:border-[#07bff]
                ${darkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}
                outline-none transition-all duration-300
              `}
            />
            <FaSearch className={`
              absolute right-4 top-1/2 -translate-y-1/2
              text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}
            `} />
          </div>

          {/* Filter & Sort Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => { setFilter(!filter); if (sort) setSort(false); }}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${filter
                  ? 'bg-[#07bff] text-white shadow-md'
                  : darkMode
                    ? 'bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-700 hover:border-[#07bff]'
                    : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 hover:border-[#07bff]'
                }
              `}
            >
              <FaFilter className={filter ? 'text-white' : ''} />
              FILTER
            </button>

            <button
              onClick={() => { setSort(!sort); if (filter) setFilter(false); }}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${sort
                  ? 'bg-[#07bff] text-white shadow-md'
                  : darkMode
                    ? 'bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-700 hover:border-[#07bff]'
                    : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 hover:border-[#07bff]'
                }
              `}
            >
              <FaSort className={sort ? 'text-white' : ''} />
              SORT
            </button>
          </div>
        </div>

        {/* Filter Section */}
        {filter && (
          <div className={`mb-6 p-4 sm:p-6 rounded-xl border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <Filter products={products} setProducts={setProducts} />
          </div>
        )}

        {/* Sort Section */}
        {sort && (
          <div className={`mb-6 p-4 sm:p-6 rounded-xl border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <Sorting products={products} setProducts={setProducts} />
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className={`text-center py-16 px-6 rounded-xl border ${darkMode ? 'bg-gray-900 text-gray-400 border-gray-700' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            <p className="text-lg font-semibold">No products found. Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
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
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-[#07bff] text-white shadow-lg">
                    FEATURED
                  </span>
                </div>

                {/* Image Container */}
                <div className="relative h-36 sm:h-40 lg:h-52 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                  <img 
                    src={product.images?.[0]?.image 
                      ? baseUrl + product.images[0].image 
                      : "https://pnghq.com/wp-content/uploads/pnghq.com-gaming-computer-picture-p-4.png"
                    } 
                    alt={product.name}
                    className="h-28 sm:h-32 lg:h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className={`opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-1 lg:gap-2 text-white`}>
                      <button className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#07bff] flex items-center justify-center shadow-lg hover:bg-white hover:text-[#07bff] transition-all duration-300">
                        <FaBolt className="text-xs lg:text-sm" />
                      </button>
                      <span className="text-xs lg:text-xs font-semibold">Quick View</span>
                    </div>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-2.5 sm:p-3 lg:p-5 flex-1 flex flex-col justify-between min-h-0">
                  <div className="mb-2 sm:mb-3 lg:mb-4 flex-shrink-0">
                    <h2 className="font-[Rajdhani] text-sm sm:text-base lg:text-lg font-bold mb-1.5 sm:mb-2 lg:mb-2.5 line-clamp-2 leading-tight text-black dark:text-white">
                      {product.name}
                    </h2>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-2 lg:mb-2.5">
                      {[1,2,3,4,5].map((star) => (
                        <FaStar 
                          key={star}
                          className={`text-[10px] sm:text-xs lg:text-sm ${
                            star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-500'
                          }`}
                        />
                      ))}
                      <span className={`text-[10px] sm:text-xs lg:text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        (4.0)
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5 sm:gap-2 lg:gap-2.5 flex-wrap">
                      <span className="text-base sm:text-lg lg:text-xl font-bold font-[Rajdhani] text-black dark:text-white">
                        ₹ {product.price?.toLocaleString()}
                      </span>
                      <span className={`text-[10px] sm:text-xs lg:text-sm line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        ₹ {(product.price * 1.2)?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1.5 sm:gap-2 lg:gap-2.5 flex-shrink-0">
                    <button 
                      onClick={(e) => addTocart(product.id, e)}
                      disabled={addingToCart === product.id}
                      className={`flex-1 py-1.5 sm:py-2 lg:py-2.5 rounded-lg sm:rounded-xl flex items-center justify-center gap-1 lg:gap-1.5 text-[10px] sm:text-xs lg:text-sm font-[Rajdhani] font-semibold transition-all duration-300 ${
                        addingToCart === product.id
                          ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300 cursor-not-allowed'
                          : darkMode
                            ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                      }`}
                    >
                      {addingToCart === product.id ? (
                        <>
                          <FaSpinner className="animate-spin text-[10px] sm:text-xs lg:text-sm" /> 
                          <span className="hidden sm:inline">ADD</span>
                        </>
                      ) : (
                        <>
                          <FaShoppingCart className="text-[10px] sm:text-xs lg:text-sm" /> 
                          <span className="hidden sm:inline">CART</span>
                        </>
                      )}
                    </button>

                    <button 
                      onClick={(e) => handleBuyNow(product, e)}
                      className="flex-1 py-1.5 sm:py-2 lg:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs lg:text-sm font-[Rajdhani] font-bold text-white flex items-center justify-center gap-1 lg:gap-1.5 bg-blue-500 shadow-lg"
                    >
                      <FaBolt className="text-[10px] sm:text-xs lg:text-sm" />
                      <span className="hidden sm:inline">BUY</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}   

export default ProductsGrid;