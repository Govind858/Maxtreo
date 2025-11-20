import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function TermsConditions() {
  return (
    <>
      <Navbar />
      <div
        className="flex flex-col p-4 lg:p-6 gap-4 max-w-6xl mx-auto bg-white pt-24 pb-12"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-6 tracking-tight">
            Terms and Conditions
          </h1>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Acceptance of Terms
            </h2>
            <h3 className="text-xl font-medium text-black mb-2">
              Agreement to Our Terms
            </h3>
            <p className="text-base text-black leading-relaxed">
              By accessing and using maxtreo's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These terms apply to all visitors, users, and others who access or use our service.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Products & Services
            </h2>
            <p className="text-base text-black leading-relaxed">
              maxtreo specializes in custom PC builds and solutions, as well as selling other brand products. All product descriptions, specifications, and images are provided for informational purposes. We reserve the right to modify product specifications, pricing, and availability without prior notice. Custom PC builds are subject to component availability and may require additional lead time.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Payment Terms
            </h2>
            <p className="text-base text-black leading-relaxed">
              We accept multiple payment methods including Razorpay online payments, cash on delivery, and direct bank transfers. Payment must be completed before order processing for online and bank transfer orders. For cash on delivery orders, payment is due upon receipt of goods. All prices are in Indian Rupees and include applicable taxes unless otherwise specified.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Order Processing & Delivery
            </h2>
            <p className="text-base text-black leading-relaxed">
              Orders are processed within 1-3 business days after payment confirmation. Custom PC builds may require additional time based on component availability and complexity. Delivery times vary by location and shipping method selected. We are not responsible for delays caused by factors beyond our control, including but not limited to natural disasters, shipping carrier delays, or customs processing.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              User Accounts
            </h2>
            <p className="text-base text-black leading-relaxed">
              When you create an account with us, including through Google login, you must provide accurate and complete information. You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Intellectual Property
            </h2>
            <p className="text-base text-black leading-relaxed">
              The content, features, and functionality of our website are owned by maxtreo and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of our content without our express written permission.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Limitation of Liability
            </h2>
            <p className="text-base text-black leading-relaxed">
              maxtreo shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our service. Our total liability shall not exceed the amount paid by you for the specific product or service.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Governing Law
            </h2>
            <p className="text-base text-black leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of our service shall be subject to the exclusive jurisdiction of the courts in Kerala, India.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-500">
              Contact Information
            </h2>
            <p className="text-base text-black leading-relaxed">
              For questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="text-base text-black leading-relaxed">
              <strong className="text-black">maxtreo</strong>
            </p>
            <p className="text-base text-black leading-relaxed">
              Sreevalsam Building Temple By Pass Thodupuzha Near SBI
            </p>
           
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}