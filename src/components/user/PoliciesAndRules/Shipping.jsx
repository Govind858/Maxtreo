import Footer from '../Footer/Footer';
import ModernNavbar from '../NavBar/NavBar';

export default function ShippingPolicy() {
  return (
    <>
      <ModernNavbar />
      <div className="flex flex-col p-4 lg:p-6 gap-6 max-w-6xl mx-auto bg-white pt-24 pb-12" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 tracking-tight">
            Shipping Policy
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Thank you for shopping with us. We deliver PCs, workstations, and accessories across India with reliable and secure shipping.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black">
                Order Processing
              </h2>
            </div>
            <p className="text-base text-black leading-relaxed pl-10">
              All confirmed orders are processed within 1–3 business days from the date of payment confirmation.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              Custom-built PCs and workstations may require additional 2-5 business days for assembly and quality testing.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              Orders are not processed or shipped on Sundays or national holidays.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black">
                Shipping Coverage
              </h2>
            </div>
            <p className="text-base text-black leading-relaxed pl-10">
              We provide nationwide shipping coverage across India, including metro cities, tier-2 cities, and most tier-3 locations.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              Serviceable pincodes: All major cities including Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad, and 25,000+ other locations.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              For remote areas or locations with limited courier access, our team will contact you within 24 hours to confirm delivery feasibility and arrange alternative solutions if needed.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black">
                Delivery Timelines
              </h2>
            </div>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Metro Cities:</strong> 3-5 business days after dispatch
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Tier-2 Cities:</strong> 5-7 business days after dispatch
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Tier-3 Cities & Remote Areas:</strong> 7-10 business days after dispatch
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              Express delivery options available for metro cities (1-2 business days) at additional cost.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              Delivery times may be extended during peak seasons (festivals, sales events) or due to unforeseen circumstances such as weather conditions, courier delays, or regional strikes.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black">
                Shipping Charges
              </h2>
            </div>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Standard Shipping:</strong> ₹150-500 (varies by location and product weight)
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Express Shipping:</strong> ₹300-800 (metro cities only)
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Heavy Items (PCs/Workstations):</strong> ₹500-1,200 based on destination
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Free Shipping:</strong> Available on orders above ₹50,000 or during promotional campaigns.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              All shipping charges are calculated automatically at checkout and displayed before payment confirmation.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black">
                Order Tracking
              </h2>
            </div>
            <p className="text-base text-black leading-relaxed pl-10">
              Real-time tracking available for all orders through SMS, email, and WhatsApp notifications.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              After dispatch, you'll receive a tracking ID and direct link to monitor your shipment's progress in real-time.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              Track your order anytime on our website using your order number or through our partner courier's tracking portal.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black">
                Packaging & Handling
              </h2>
            </div>
            <p className="text-base text-black leading-relaxed pl-10">
              All products are carefully packaged using protective materials including bubble wrap, foam inserts, and sturdy boxes.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              High-value electronics undergo additional quality checks and specialized packaging to prevent transit damage.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              Each package is sealed and labeled with fragile handling instructions for courier partners.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black">
                Damaged / Defective Products
              </h2>
            </div>
            <p className="text-base text-black leading-relaxed pl-10">
              If you receive a damaged, defective, or incorrect product, please notify us immediately within 48 hours of delivery.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Reporting Process:</strong>
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              • Take photos/videos of the damaged item and packaging
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              • Contact our support team with your order number
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              • Our team will arrange for inspection and immediate replacement or refund
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              We provide hassle-free replacements for manufacturing defects covered under warranty terms.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black">
                Delivery Security
              </h2>
            </div>
            <p className="text-base text-black leading-relaxed pl-10">
              All high-value shipments require signature confirmation and valid ID verification at the time of delivery.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              For orders above ₹1,00,000, we provide insured shipping with additional security protocols.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              Delivery attempts will be made during business hours (9 AM - 8 PM). If no one is available, we'll reschedule delivery at your convenience.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black">
                Special Handling
              </h2>
            </div>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Fragile Electronics:</strong> Graphics cards, motherboards, and sensitive components receive extra protective packaging.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Large Items:</strong> Complete PC systems and workstations are shipped via specialized logistics partners with white-glove delivery service.
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              <strong className="text-black">Installation Support:</strong> Optional on-site setup assistance available for complete systems in select cities.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black">
                Contact Support
              </h2>
            </div>
            <p className="text-base text-black leading-relaxed pl-10">
              Our shipping support team is available Monday to Saturday, 10 AM to 7 PM IST.
            </p>
            <p className="text-base text-black leading-relaxed pl-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <strong className="text-black">Email:</strong> maxtreo99@gmail.com
            </p>
            <p className="text-base text-black leading-relaxed pl-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <strong className="text-black">Phone:</strong> +91 94955 26026
            </p>
            <p className="text-base text-black leading-relaxed pl-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <strong className="text-black">WhatsApp:</strong> +91 94955 26026
            </p>
            <p className="text-base text-black leading-relaxed pl-10">
              For urgent shipping queries, WhatsApp support provides faster response times.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}