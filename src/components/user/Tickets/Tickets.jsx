import React, { useState, useRef, useEffect } from "react";
import ModernNavbar from "../NavBar/NavBar";
import ProductFooter from "../Footer/ProductFooter";
import { useNavigate } from "react-router-dom";
import { AddTicket } from '../../../Services/userApi';
import Alert from '../../../components/user/Alert/Alert';
import Footer from '../../../components/user/Footer/Footer'

const Tickets = () => {
  const [formData, setFormData] = useState({
    product: null,
    product_name: "",
    product_serial_number: "",
    grievance: "",
    link: "",
    image: null,
    is_concluded: false
  });
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);
  const [preview, setPreview] = useState(null);
  const textareaRef = useRef(null);
  const lineHeight = 24;
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Update the dashed lines when grievance text changes
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const numberOfLines = Math.max(
        textarea.scrollHeight / lineHeight,
        7
      );
      setRows(Array(Math.ceil(numberOfLines)).fill(0));
    }
  }, [formData.grievance]);

  // Create a preview for the image
  useEffect(() => {
    if (!formData.image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(formData.image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.image]);

  const handleTicketResolution = () => {
    navigate("/ticketsresolved");
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert product to integer if it's the product field
    const processedValue = name === "product" ? 
      (value === "" ? null : parseInt(value)) : 
      value;
    
    setFormData({
      ...formData,
      [name]: processedValue
    });
  };

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFormData({ ...formData, image: null });
      return;
    }
    
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.grievance || formData.grievance.trim() === "") {
      newErrors.grievance = "Grievance is required";
    }
    
    // Validate product_name length if provided
    if (formData.product_name && formData.product_name.length > 255) {
      newErrors.product_name = "Product name must be less than 255 characters";
    }
    
    // Validate link length if provided
    if (formData.link && formData.link.length > 200) {
      newErrors.link = "Link must be less than 200 characters";
    }
    
    // Validate product_serial_number length if provided
    if (formData.product_serial_number && formData.product_serial_number.length > 100) {
      newErrors.product_serial_number = "Serial number must be less than 100 characters";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      // Prepare form data for API submission
      const submissionData = new FormData();
      if (formData.product !== null) {
        submissionData.append('product', formData.product);
      }
      if (formData.product_name) {
        submissionData.append('product_name', formData.product_name);
      }
      if (formData.product_serial_number) {
        submissionData.append('product_serial_number', formData.product_serial_number);
      }
      submissionData.append('grievance', formData.grievance);
      if (formData.link) {
        submissionData.append('link', formData.link);
      }
      submissionData.append('is_concluded', 'false');
      
      if (formData.image) {
        submissionData.append('image', formData.image);
      }

      const response = await AddTicket(submissionData);

      if (response.status === 201) {
        setAlert(true);
        setAlertMessage("Your Ticket has been uploaded");
      }

      const result = await response.json();
      console.log('Ticket submitted successfully:', result);
      
      navigate("/ticketsresolved");
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };
  
  return (
    <>
      <ModernNavbar />
      {alert && (
        <Alert
          type="success"
          message={alertMessage}
        />
      )}
      <div className="w-full bg-white p-4 lg:p-6 rounded-2xl border-2 border-blue-500/20 shadow-lg" style={{marginTop:"70px"}}>
        <div className="flex flex-col lg:flex-row justify-between gap-6" ref={containerRef}>
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-baseline text-black mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold">
                Maxtreo
              </h1>
            </div>
            
            <div className="text-black">
              <h6 className="text-lg font-semibold mb-4">
                Recent Tickets
              </h6>

              <div className="bg-gray-50 p-4 lg:p-6 w-full lg:w-4/5 rounded-2xl border border-blue-200 transition-all duration-300 hover:shadow-lg">
                <p className="font-mono mb-4 text-black">Grievance:</p>
                <p className="text-gray-500 overflow-hidden whitespace-normal break-words mb-4 border-b border-dashed border-gray-300 pb-4">
                  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                </p>

                <button
                  onClick={handleTicketResolution}
                  className="w-full p-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  View Resolved Tickets
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            <div className="w-full">
              <div className="bg-white w-full lg:w-4/5 mx-auto rounded-2xl overflow-hidden shadow-md border border-blue-500/20 transition-all duration-300 hover:shadow-xl">
                <div className="bg-blue-500 p-4 text-center">
                  <h4 className="font-bold tracking-widest text-white">LIVE TICKET</h4>
                </div>

                <form onSubmit={handleSubmit} className="p-4 lg:p-6" encType="multipart/form-data">
                  <span className="text-xs font-semibold text-black block mb-4">2025/04/01 - 11:24 AM</span>
                  
                  <div className="p-4 lg:p-6 border-b border-dashed border-gray-300">
                    <span className="text-xl lg:text-2xl font-bold block mb-2 text-black">What Can We Help You With</span>
                    <p className="mb-4 text-sm lg:text-base text-black">Please describe your grievance in the space below</p>
                    
                    {/* Product (number) - integer, nullable */}
                    <div className="relative mt-4 group">
                      <input 
                        type="number" 
                        name="product" 
                        id="product"
                        value={formData.product || ""}
                        onChange={handleChange}
                        placeholder=" " 
                        className="w-full p-3 text-base border border-gray-300 rounded-xl outline-none bg-white focus:border-blue-500 transition-all duration-200"
                      />
                      <label 
                        htmlFor="product" 
                        className="absolute top-3 left-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none group-focus-within:top-[-6px] group-focus-within:left-3 group-focus-within:text-sm group-focus-within:bg-white group-focus-within:px-1 group-focus-within:text-blue-500"
                      >
                        Product ID (number, optional)
                      </label>
                    </div>
                    
                    {/* Product Name - string, maxLength: 255, nullable */}
                    <div className="relative mt-4 group">
                      <input 
                        type="text" 
                        name="product_name" 
                        id="product_name" 
                        value={formData.product_name}
                        onChange={handleChange}
                        maxLength="255"
                        placeholder=" " 
                        className="w-full p-3 text-base border border-gray-300 rounded-xl outline-none bg-white focus:border-blue-500 transition-all duration-200"
                      />
                      <label 
                        htmlFor="product_name" 
                        className="absolute top-3 left-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none group-focus-within:top-[-6px] group-focus-within:left-3 group-focus-within:text-sm group-focus-within:bg-white group-focus-within:px-1 group-focus-within:text-blue-500"
                      >
                        Product Name (optional, max 255 chars)
                      </label>
                      {errors.product_name && (
                        <p className="text-red-500 text-xs mt-1">{errors.product_name}</p>
                      )}
                    </div>
                    
                    {/* Product Serial Number - string, maxLength: 100, nullable */}
                    <div className="relative mt-4 group">
                      <input 
                        type="text" 
                        name="product_serial_number" 
                        id="product_serial_number" 
                        value={formData.product_serial_number}
                        onChange={handleChange}
                        maxLength="100"
                        placeholder=" " 
                        className="w-full p-3 text-base border border-gray-300 rounded-xl outline-none bg-white focus:border-blue-500 transition-all duration-200"
                      />
                      <label 
                        htmlFor="product_serial_number" 
                        className="absolute top-3 left-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none group-focus-within:top-[-6px] group-focus-within:left-3 group-focus-within:text-sm group-focus-within:bg-white group-focus-within:px-1 group-focus-within:text-blue-500"
                      >
                        Product Serial Number (optional, max 100 chars)
                      </label>
                      {errors.product_serial_number && (
                        <p className="text-red-500 text-xs mt-1">{errors.product_serial_number}</p>
                      )}
                    </div>

                    {/* Link - URI, maxLength: 200, nullable */}
                    <div className="relative mt-4 group">
                      <input 
                        type="url" 
                        name="link" 
                        id="link" 
                        value={formData.link}
                        onChange={handleChange}
                        maxLength="200"
                        placeholder=" " 
                        className="w-full p-3 text-base border border-gray-300 rounded-xl outline-none bg-white focus:border-blue-500 transition-all duration-200"
                      />
                      <label 
                        htmlFor="link" 
                        className="absolute top-3 left-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none group-focus-within:top-[-6px] group-focus-within:left-3 group-focus-within:text-sm group-focus-within:bg-white group-focus-within:px-1 group-focus-within:text-blue-500"
                      >
                        Related Link (optional, max 200 chars)
                      </label>
                      {errors.link && (
                        <p className="text-red-500 text-xs mt-1">{errors.link}</p>
                      )}
                    </div>

                    {/* Image upload section */}
                    <div className="mt-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="w-full p-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300"
                      >
                        {formData.image ? 'Change Image' : 'Upload Image (optional)'}
                      </button>
                      
                      {preview && (
                        <div className="mt-3">
                          <img 
                            src={preview} 
                            alt="Preview" 
                            className="max-h-32 max-w-full object-contain border border-gray-300 rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, image: null})}
                            className="mt-2 text-red-500 text-sm hover:text-red-700 font-semibold"
                          >
                            Remove Image
                          </button>
                        </div>
                      )}
                    </div>

                    <span className="text-right font-mono text-xs text-gray-500 tracking-tighter block mt-2">Ticket Id: {Math.floor(Math.random() * 10000000)}</span>
                  </div>

                  <div className="p-4 lg:p-6">
                    <p className="font-semibold mb-4 text-black">Grievance*:</p>
                    {errors.grievance && (
                      <p className="text-red-500 text-sm mb-2">{errors.grievance}</p>
                    )}

                    <div className="relative">
                      {/* Dashed lines container */}
                      <div className="absolute inset-0 pointer-events-none">
                        {rows.map((_, index) => (
                          <div
                            key={index}
                            className="border-b border-dashed border-gray-300"
                            style={{
                              height: `${lineHeight}px`,
                              marginTop: index === 0 ? "8px" : "0",
                            }}
                          />
                        ))}
                      </div>

                      {/* Actual textarea */}
                      <textarea
                        ref={textareaRef}
                        name="grievance"
                        value={formData.grievance}
                        onChange={handleChange}
                        className="w-full p-3 bg-white text-base resize-none outline-none border border-gray-300 rounded-xl"
                        style={{
                          lineHeight: `${lineHeight}px`,
                        }}
                        rows={7}
                        placeholder="Start typing here (required)..."
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full p-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Tickets;