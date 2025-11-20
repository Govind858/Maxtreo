import { ArrowRight } from "lucide-react";
import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

export default function ReturnRefund() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col p-4 lg:p-6 gap-6 max-w-6xl mx-auto bg-white pt-24 pb-12">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-6 tracking-tight">
            Return and Refund Policy
          </h1>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Return Eligibility
            </h2>
            <h3 className="text-xl font-medium text-black mb-2">
              30-Day Return Window
            </h3>
            <p className="text-base text-black leading-relaxed">
              We accept returns within 30 days of delivery for most products. Items must be in original condition, unused, and in original packaging with all accessories and documentation. Custom-built PCs and personalized products may have different return conditions due to their bespoke nature. Please contact us before initiating any return to ensure eligibility.
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Non-Returnable Items
            </h2>
            <p className="text-base text-black leading-relaxed">
              Certain items cannot be returned, including: opened software, personalized or custom-built products (unless defective), items damaged by misuse, and products that have been modified or altered. Digital products and gift cards are also non-returnable. Components that have been installed or used in a system may not be eligible for return unless defective upon arrival.
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Return Process
            </h2>
            <p className="text-base text-black leading-relaxed">
              To initiate a return, contact our customer service team with your order number and reason for return. We will provide you with a Return Merchandise Authorization (RMA) number and return instructions. Items must be securely packaged and shipped to our designated return address. Return shipping costs are the responsibility of the customer unless the item is defective or we made an error.
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Refund Processing
            </h2>
            <p className="text-base text-black leading-relaxed">
              Refunds are processed within 5-7 business days after we receive and inspect the returned item. Refunds will be issued to the original payment method used for purchase. For Razorpay payments, refunds typically appear within 3-5 business days. Cash on delivery refunds will be processed via bank transfer. Direct bank transfer refunds will be credited to the same account within 2-3 business days.
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Exchanges
            </h2>
            <p className="text-base text-black leading-relaxed">
              We offer exchanges for defective items or if we sent the wrong product. If you need to exchange an item for a different model or specification, this will be treated as a return and new purchase. Price differences, if any, will be charged or refunded accordingly. Custom PC exchanges are evaluated on a case-by-case basis.
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Warranty Claims
            </h2>
            <p className="text-base text-black leading-relaxed">
              Products covered under manufacturer warranty should be directed to the respective manufacturer for warranty service. For Maxtreo custom builds, we provide our own warranty terms as specified at the time of purchase. Warranty claims do not fall under our standard return policy and are handled separately through our technical support team.
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Damaged or Defective Items
            </h2>
            <p className="text-base text-black leading-relaxed">
              If you receive a damaged or defective item, please contact us immediately with photos of the damage and packaging. We will arrange for replacement or repair at no cost to you, including return shipping. For custom PCs, our technical team will diagnose the issue and provide appropriate resolution, which may include on-site service for local customers.
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Cancellation Policy
            </h2>
            <p className="text-base text-black leading-relaxed">
              Orders can be cancelled before shipping at no charge. Once an order has been shipped, cancellation is not possible, and the standard return policy applies. Custom PC orders may be cancelled before the build process begins. If components have been ordered or the build has started, cancellation fees may apply to cover non-returnable components.
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Contact for Returns
            </h2>
            <p className="text-base text-black leading-relaxed">
              For all return and refund inquiries, please contact us at:
            </p>
            <p className="text-base text-black leading-relaxed">
              <strong className="text-black">Maxtreo</strong>
            </p>
          
            <button 
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-6 mt-4 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              onClick={() => window.location.href = '/contact'}
            >
              <span className="mr-2">Contact Support</span>
              <ArrowRight size={18} />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            Last updated: November 2025. This policy may be updated periodically. Please review for any changes before making a return.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}