import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Clock, Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { useAuth } from '../../../Context/UserContext';
import { updateTicketGrievance } from '../../../API/userApi';

const TicketsResolved = () => {
  const { user } = useAuth();
  const [grievanceText, setGrievanceText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ used now
  const textareaRef = useRef(null);
  const lineHeight = 24;

  // ✅ Removed unreachable code and unused rows useMemo
  const handleSubmit = async () => {
    if (!grievanceText.trim()) return alert('Please enter your grievance');

    try {
      setIsSubmitting(true);
      const response = await updateTicketGrievance({
        userId: user?._id,
        grievanceText,
      });

      if (response.success) {
        alert('Ticket updated successfully');
        setGrievanceText('');
      } else {
        alert('Failed to update ticket');
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10">
          <h1 className="text-3xl font-bold mb-4 text-center text-[#63a375]">
            Resolved Tickets
          </h1>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="text-[#63a375]" />
              <h2 className="text-lg font-semibold">Submit Grievance Update</h2>
            </div>

            <textarea
              ref={textareaRef}
              value={grievanceText}
              onChange={(e) => setGrievanceText(e.target.value)}
              rows={7}
              placeholder="Write your grievance update here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#63a375] outline-none"
            />

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-lg font-bold text-white ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#63a375]'
              }`}
            >
              {isSubmitting ? 'Updating...' : 'Update Ticket'}
            </button>
          </motion.div>

          <div className="mt-10 text-gray-600 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="text-[#63a375]" size={18} />
              <p>Support Hours: Mon - Sat, 9 AM - 6 PM</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-[#63a375]" size={18} />
              <p>support@neo-tokyo.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-[#63a375]" size={18} />
              <p>+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-[#63a375]" size={18} />
              <p>Neo Tokyo HQ, India</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TicketsResolved;
