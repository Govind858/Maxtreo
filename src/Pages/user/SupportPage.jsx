import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../../Images/maxtreobgremoved.png';
import NavBar from '../../components/user/NavBar/NavBar';
import Footer from '../../components/user/Footer/Footer';
import { Mail, Phone, MessageCircle,Ticket, FileText, HelpCircle, MapPin,ArrowRight } from "lucide-react";
import { useAuth } from '../../Context/UserContext';

const HeaderSection = () => (
  <motion.section 
    className="relative bg-gradient-to-r from-white to-blue-100 py-16 px-4 overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <div className="max-w-7xl mx-auto text-center">
      <motion.h1 
        className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-6"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
      >
        Embark on your <br /> Troubleshooting Journey
      </motion.h1>
      <motion.div 
        className="h-1 bg-gradient-to-r from-blue-500 to-black w-24 mx-auto mb-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.p 
        className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        We're here to help you every step of the way. Whether you need quick answers or detailed support, our team is ready to assist.
      </motion.p>
    </div>
  </motion.section>
);

const SupportContentSection = () => {
  const { user } = useAuth();

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
            How can we help you?
          </h1>
          <p className="text-gray-600">Choose an option below to get started</p>
        </div>

        {/* Quick Actions */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">

  <a href="/tickets" className="group bg-blue-500 hover:bg-blue-600 transition-colors rounded-xl p-6 text-white">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-1">Raise a Ticket</h3>
        <p className="text-blue-100 text-sm">Submit a support request</p>
      </div>

      <div className="flex items-center gap-2">
        <Ticket className="w-8 h-8" />
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </a>

  <a href="/ticketsresolved" className="group bg-black hover:bg-gray-900 transition-colors rounded-xl p-6 text-white">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-1">View Live Tickets</h3>
        <p className="text-gray-400 text-sm">Check ticket status</p>
      </div>

      <div className="flex items-center gap-2">
        <FileText className="w-8 h-8" />
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </a>

</div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <HelpCircle className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-2xl font-bold text-black">FAQ's</h2>
              </div>
              
              <div className="space-y-3">
                <div className="border-l-2 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-black mb-2">How do I place an order?</h4>
                  <p className="text-sm text-gray-700">
                    Browse our products, add items to cart, and proceed to checkout with your shipping and payment details.
                  </p>
                </div>
                
                <div className="border-l-2 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-black mb-2">What payment methods do you accept?</h4>
                  <p className="text-sm text-gray-700">
                    We accept credit/debit cards, UPI, wallets, net banking, and cash on delivery.
                  </p>
                </div>

                <div className="border-l-2 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-black mb-2">How long does shipping take?</h4>
                  <p className="text-sm text-gray-700">
                    Standard shipping takes 3-5 business days. Express options available.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-black mb-2">Browse Help Topics</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Explore detailed guides on orders, payments, returns, and more.
                </p>
                <button className="text-blue-500 font-semibold text-sm hover:text-blue-600">
                  View All Topics →
                </button>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-blue-500 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              
              <div className="space-y-3 mb-6">
                <a href="mailto:maxtreo99@gmail.com" className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
                  <Mail className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">Email</span>
                </a>
                
                <a href="tel:+919495526026" className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
                  <Phone className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">Call</span>
                </a>
                
                <a href="#" className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">Live Chat</span>
                </a>
              </div>

              <div className="pt-4 border-t border-white border-opacity-20">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p>Sreevalsam Building,</p>
                    <p>Temple bypass road,</p>
                    <p>Thodupuzha Near SBI,</p>
                    <p>Idukki, Kerala</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Email */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-black mb-2">Email Support</h4>
              <p className="text-sm text-gray-600 mb-3">
                Send us your queries anytime
              </p>
              <a href="mailto:maxtreo99@gmail.com" className="text-blue-500 text-sm font-semibold hover:text-blue-600">
                maxtreo99@gmail.com →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const FAQsSection = () => {
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and navigating to the 'Orders' section. Alternatively, you can use the tracking number provided in your confirmation email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in their original condition with all packaging and accessories. Some exclusions may apply for customized items."
    },
    {
      question: "How can I request a refund?",
      answer: "Refunds can be requested through your account dashboard or by contacting our support team. Once approved, refunds typically process within 3-5 business days to your original payment method."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see specific shipping information during checkout."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-black text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-black mb-3">{faq.question}</h3>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactButtonSection = () => (
  <section className="py-16 px-4 bg-white text-center">
    <div className="max-w-2xl mx-auto">
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold text-black mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Need More Help?
      </motion.h2>
      <motion.p 
        className="text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        If your question wasn't answered above, our support team is ready to assist you personally.
      </motion.p>
      <motion.a 
        href="/contact"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg transition-all duration-300"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        Contact Us
      </motion.a>
    </div>
  </section>
);

// Main component
function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <NavBar />
      
      <HeaderSection />
      <SupportContentSection />
      <FAQsSection />
      <ContactButtonSection />
      
      <Footer />
    </div>
  );
}

export default SupportPage;