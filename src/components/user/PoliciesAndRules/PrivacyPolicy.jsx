import Footer from '../Footer/Footer';
import ModernNavbar from '../NavBar/NavBar';

export default function ShippingPolicy() {
  return (
    <>
      <ModernNavbar />
      <div className="flex flex-col p-4 lg:p-6 gap-6 max-w-6xl mx-auto bg-white pt-24 pb-12" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-6 tracking-tight">
            Privacy Policy
          </h1>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Order Processing
            </h2>
            <p className="text-base text-black leading-relaxed">
              All confirmed orders are processed within 2–4 business days.
            </p>
            <p className="text-base text-black leading-relaxed">
              Orders are not shipped or delivered on Sundays or public holidays.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Shipping Coverage
            </h2>
            <p className="text-base text-black leading-relaxed">
              We currently ship to all major cities and towns across India.
            </p>
            <p className="text-base text-black leading-relaxed">
              For remote or out-of-service locations, our team will contact you to confirm availability before dispatch.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Delivery Timelines
            </h2>
            <p className="text-base text-black leading-relaxed">
              Once shipped, orders are usually delivered within 5–10 business days, depending on the shipping address and courier service availability.
            </p>
            <p className="text-base text-black leading-relaxed">
              Delivery delays may occasionally occur due to unforeseen circumstances (weather, strikes, courier delays, etc.).
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Shipping Charges
            </h2>
            <p className="text-base text-black leading-relaxed">
              Standard shipping charges may apply and will be calculated at checkout.
            </p>
            <p className="text-base text-black leading-relaxed">
              Free shipping may be offered for selected products or promotional offers (if applicable).
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Order Tracking
            </h2>
            <p className="text-base text-black leading-relaxed">
              After dispatch, customers will receive an email/SMS with tracking details to monitor their shipment status.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Damaged / Defective Products
            </h2>
            <p className="text-base text-black leading-relaxed">
              If you receive a product that is damaged or defective during transit, please notify us within 48 hours of delivery.
            </p>
            <p className="text-base text-black leading-relaxed">
              Our team will arrange for a replacement or suitable resolution after verifying the issue.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Contact Us
            </h2>
            <p className="text-base text-black leading-relaxed">
              If you have any questions about shipping or delivery, please contact our support team:
            </p>
            <p className="text-base text-black leading-relaxed">
              <strong className="text-black">Email:</strong> maxtreo99@gmail.com
            </p>
            <p className="text-base text-black leading-relaxed">
              <strong className="text-black">Phone:</strong> +91 94460 67663
            </p>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            Thank you for shopping with us. We deliver PCs, workstations, and accessories across India.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}