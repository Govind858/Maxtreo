// ContactCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, Phone, MessageCircle } from "lucide-react";

const StackedCard = ({ children, index = 0, total = 1 }) => {
  const delay = index * 0.1;
  const offsetY = index * 10;
  const scale = 1 - (index * 0.02);
  const zIndex = total - index;

  return (
    <motion.div
      className="w-full rounded-2xl overflow-hidden"
      style={{ 
        zIndex,
        position: index === 0 ? "relative" : "absolute",
        top: `${offsetY}px`,
        left: 0,
        right: 0,
        opacity: 1 - (index * 0.2),
        transformOrigin: "center top"
      }}
      initial={{ opacity: 0, y: 100, scale: scale - 0.1 }}
      whileInView={{ opacity: 1 - (index * 0.2), y: offsetY, scale }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
};

const ContactCard = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mb-8 pb-6 md:mb-12 md:pb-8 lg:mb-16 lg:pb-12">
      {/* Stack effect - creating shadow cards underneath */}
      <StackedCard index={2} total={3}>
        <div className="h-full w-full bg-gray-800"></div>
      </StackedCard>
      
      <StackedCard index={1} total={3}>
        <div className="h-full w-full bg-gray-900"></div>
      </StackedCard>
      
      {/* Main content card */}
      <StackedCard index={0} total={3}>
        <div className="bg-black text-white p-4 sm:p-6 md:p-10 rounded-2xl">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              Get in <span className="text-blue-600">Touch</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300">
              "Ready to upgrade your tech? Our store has everything you need to power your lifestyle
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Support Hours */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-blue-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Support Hours</h3>
              </div>
              
              <div className="space-y-2 sm:space-y-4 ml-4 sm:ml-8 md:ml-12 lg:ml-16">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 sm:py-2 border-b border-gray-700">
                  <span className="text-sm sm:text-base text-gray-300 mb-1 sm:mb-0">Monday - Friday</span>
                  <span className="font-semibold text-blue-600 text-sm sm:text-base">9AM - 8PM</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 sm:py-2 border-b border-gray-700">
                  <span className="text-sm sm:text-base text-gray-300 mb-1 sm:mb-0">Saturday</span>
                  <span className="font-semibold text-blue-600 text-sm sm:text-base">10AM - 6PM</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 sm:py-2">
                  <span className="text-sm sm:text-base text-gray-300 mb-1 sm:mb-0">Sunday</span>
                  <span className="font-semibold text-gray-500 text-sm sm:text-base">Closed</span>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-blue-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Contact Methods</h3>
              </div>
              
              <div className="space-y-3 sm:space-y-6 ml-4 sm:ml-8 md:ml-12 lg:ml-16">
                <div className="flex items-center group hover:bg-gray-900 p-2 sm:p-3 rounded-lg transition-colors">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-300">Email</p>
                    <p className="font-semibold group-hover:text-blue-600 transition-colors text-sm sm:text-base">maxtreo99@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center group hover:bg-gray-900 p-2 sm:p-3 rounded-lg transition-colors">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-300">Phone</p>
                    <p className="font-semibold group-hover:text-blue-600 transition-colors text-sm sm:text-base">+91 94460 67663</p>
                  </div>
                </div>
                
                <div className="flex items-center group hover:bg-gray-900 p-2 sm:p-3 rounded-lg transition-colors">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-300">Live Chat</p>
                    <p className="font-semibold group-hover:text-blue-600 transition-colors text-sm sm:text-base">Available during business hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StackedCard>
    </div>
  );
};

export default ContactCard;