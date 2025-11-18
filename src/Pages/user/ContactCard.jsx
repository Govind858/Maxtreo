import React from 'react';
import { Mail, Phone, MessageSquare, Clock } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-3">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg">
            We're here to help and answer any questions you might have
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Support Hours */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black">Support Hours</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Monday - Friday</span>
                <span className="text-black font-semibold">9AM - 8PM</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Saturday</span>
                <span className="text-black font-semibold">10AM - 6PM</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium">Sunday</span>
                <span className="text-red-500 font-semibold">Closed</span>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-black mb-6">Contact Methods</h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-blue-500 rounded-xl flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Email
                  </h3>
                  <a 
                    href="mailto:maxtreo99@gmail.com" 
                    className="text-black font-medium hover:text-blue-500 transition-colors break-all"
                  >
                    maxtreo99@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-blue-500 rounded-xl flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Phone
                  </h3>
                  <a 
                    href="tel:+919446067663" 
                    className="text-black font-medium hover:text-blue-500 transition-colors"
                  >
                    +91 94460 67663
                  </a>
                </div>
              </div>

              {/* Live Chat */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-blue-500 rounded-xl flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Live Chat
                  </h3>
                  <p className="text-black font-medium">
                    Available during business hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all hover:shadow-lg transform hover:-translate-y-0.5">
            Start a Conversation
          </button>
        </div>
      </div>
    </div>
  );
}