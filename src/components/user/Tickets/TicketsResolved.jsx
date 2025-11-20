// src/components/user/Tickets/TicketsResolved.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import ModernNavbar from "../NavBar/NavBar";
import ProductFooter from "../Footer/ProductFooter";
import Footer from '../../../components/user/Footer/Footer'
import { getmyTickets } from "../../../Services/userApi";

/* API function - No unreachable code */
const updateTicketGrievance = (ticketId, payload) => {
  console.log("Sending update:", ticketId, payload);
  
  return fetch('/api/tickets/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ticketId, ...payload })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to update ticket');
    }
    return response.json();
  });
};

/* Main Component */
const TicketManagement = () => {
  const [grievanceText, setGrievanceText] = useState("");
  const [activeTab, setActiveTab] = useState("COMPLAINTS");
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const textareaRef = useRef(null);
  const lineHeight = 24;

  const showNotification = useCallback((msg, type) => {
    setNotification({ show: true, message: msg, type });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fetchTickets = useCallback(async () => {
    try {
      const { data = [] } = await getmyTickets();
      setTickets(data);
      if (data.length > 0) {
        setSelectedTicket(data[0]);
        setGrievanceText(data[0].grievance || "");
      }
    } catch (err) {
      showNotification("Failed to load tickets. Please try again.", "error");
    }
  }, [showNotification]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        7 * lineHeight
      )}px`;
    }
  }, [grievanceText]);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleTicketSelect = useCallback((ticket) => {
    setSelectedTicket(ticket);
    setGrievanceText(ticket.grievance || "");
    setActiveTab("COMPLAINTS");
  }, []);

  const submitGrievanceUpdate = useCallback(async () => {
    if (!selectedTicket || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await updateTicketGrievance(selectedTicket.ticket_id, {
        grievance: grievanceText,
      });
      showNotification("Grievance updated successfully!", "success");
      await fetchTickets();
    } catch (error) {
      console.error("Update error:", error);
      showNotification("Failed to update grievance. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }, [
    selectedTicket,
    grievanceText,
    isSubmitting,
    showNotification,
    fetchTickets,
  ]);

  const tabContent = {
    COMPLAINTS: (
      <div className="space-y-2">
        <h3 className="text-sm font-bold font-['Rajdhani',_sans-serif]">
          Your Complaint
        </h3>
        <p className="text-sm font-['Raleway',_sans-serif] leading-relaxed">
          {selectedTicket?.grievance || "No complaint content available."}
        </p>
      </div>
    ),
    DEVICE: (
      <div className="space-y-2">
        <h3 className="text-sm font-bold font-['Rajdhani',_sans-serif]">
          Device Information
        </h3>
        <div className="bg-gray-50 p-3 rounded-xl border border-blue-200">
          <p className="text-sm font-['Raleway',_sans-serif] leading-relaxed">
            <span className="font-semibold text-black">Product:</span>{" "}
            {selectedTicket?.product_name || "N/A"} <br />
            <span className="font-semibold text-black">Serial:</span>{" "}
            {selectedTicket?.product_serial_number || "N/A"}
          </p>
        </div>
      </div>
    ),
    CONCLUSION: (
      <div className="space-y-2">
        <h3 className="text-sm font-bold font-['Rajdhani',_sans-serif]">
          Admin Response
        </h3>
        <p className="text-sm font-['Raleway',_sans-serif] leading-relaxed">
          {selectedTicket?.conclusion ||
            "We understand your concerns and our team is currently reviewing your complaint."}
        </p>
      </div>
    ),
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ModernNavbar />

      {notification.show && (
        <div
          className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-xl text-white transition-all duration-300 ${
            notification.type === "success" ? "bg-blue-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <main
        className="flex-grow w-full p-4 lg:p-6"
        style={{ marginTop: "100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="text-black text-4xl font-bold mr-4 font-['Rajdhani',_sans-serif] leading-none">
              <h1>Maxtreo</h1>
            </div>
            <div className="flex flex-col">
              <span className="text-black text-sm font-['Raleway',_sans-serif]">
                PREMIUM MEMBERSHIP
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT: Ticket List */}
            <div className="w-full lg:w-2/5 space-y-4 max-h-[80vh] overflow-y-auto pr-2">
              <h2 className="text-black text-xl font-bold font-['Rajdhani',_sans-serif] mb-4">
                Your Tickets
              </h2>

              {tickets.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-6 text-center text-black border border-blue-200">
                  <p className="font-['Raleway',_sans-serif]">No tickets found</p>
                </div>
              ) : (
                tickets.map((ticket) => (
                  <div
                    key={ticket.ticket_id}
                    className={`bg-white rounded-2xl p-3 lg:p-4 overflow-hidden hover:shadow-lg cursor-pointer transition-all duration-200 border border-blue-200 ${
                      selectedTicket?.ticket_id === ticket.ticket_id
                        ? "ring-2 ring-blue-500 scale-[1.02] shadow-xl"
                        : "hover:opacity-90"
                    }`}
                    onClick={() => handleTicketSelect(ticket)}
                  >
                    <div className="flex flex-col sm:flex-row rounded-xl overflow-hidden h-full">
                      <div className="w-full sm:w-2/5 bg-blue-50 border-r border-dashed border-blue-300 rounded-l-xl flex flex-col relative p-2">
                        <div className="h-28 flex items-center justify-center">
                          <div className="w-16 h-full -rotate-90 flex items-center">
                            <div
                              className="w-full h-full bg-contain bg-no-repeat bg-center rounded"
                              style={{ backgroundImage: `url('/api/placeholder/64/200')` }}
                            />
                          </div>
                        </div>
                        <div className="absolute top-1/2 right-0 -mr-10 -rotate-90 origin-center font-bold text-sm tracking-widest text-blue-500 font-['Rajdhani',_sans-serif]">
                          {ticket.is_concluded ? "RESOLVED TICKET" : "PENDING TICKET"}
                        </div>
                        <div className="absolute bottom-4 left-4 text-black text-2xl font-bold leading-none font-['Rajdhani',_sans-serif]">
                          <div>NT</div>
                          <div>KO</div>
                        </div>
                      </div>

                      <div className="w-full sm:w-3/5 bg-white rounded-r-xl p-3">
                        <div className="bg-blue-50 text-black py-2 text-center font-bold border-l border-dashed border-blue-300 font-['Rajdhani',_sans-serif]">
                          {ticket.is_concluded ? "RESOLVED" : "PENDING"}
                        </div>
                        <div className="mt-3">
                          <h3 className="text-sm font-bold text-black font-['Rajdhani',_sans-serif]">
                            {ticket.product_name || "N/A"}
                          </h3>
                          <p className="text-sm text-black font-['Raleway',_sans-serif]">
                            Serial: {ticket.product_serial_number || "N/A"}
                          </p>
                          <p className="text-sm text-black font-['Raleway',_sans-serif] mt-2">
                            {formatDate(ticket.date_updated)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT: Ticket Details */}
            <div className="w-full lg:w-3/5">
              {selectedTicket ? (
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200">
                  <div className="bg-blue-500 py-3 text-center rounded-t-2xl">
                    <h4 className="font-['Rajdhani',_sans-serif] text-base lg:text-lg tracking-widest font-bold text-white">
                      MANAGE TICKETS
                    </h4>
                  </div>

                  <div className="p-5 lg:p-6">
                    <span className="text-xs font-semibold text-gray-600 font-['Raleway',_sans-serif] block mb-4">
                      Last Updated: {formatDate(selectedTicket.date_updated)}
                    </span>

                    <div className="border-b border-dashed border-gray-300 py-4">
                      <h1 className="text-xl lg:text-2xl font-bold mb-2 font-['Rajdhani',_sans-serif] text-black">
                        Times we helped you out
                      </h1>
                      <p className="text-sm lg:text-base mb-6 font-['Raleway',_sans-serif] text-black">
                        Hope we were helpful and could resolve your issue entirely
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <input
                          type="text"
                          value={`PRODUCT ${selectedTicket.product_name || "N/A"}`}
                          readOnly
                          className="flex-grow p-3 border border-gray-300 rounded-xl text-sm bg-white font-['Raleway',_sans-serif] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          value={`SERIAL CODE ${selectedTicket.product_serial_number || "N/A"}`}
                          readOnly
                          className="flex-grow p-3 border border-gray-300 rounded-xl text-sm bg-gray-50 font-['Raleway',_sans-serif] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <span className="block text-right text-xs text-gray-500 font-mono">
                        Ticket Id: {selectedTicket.ticket_id || "N/A"}
                      </span>
                    </div>

                    <div className="py-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {["COMPLAINTS", "DEVICE", "CONCLUSION"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-4 text-sm font-medium font-['Rajdhani',_sans-serif] rounded-xl transition-all duration-300 ${
                              activeTab === tab
                                ? "bg-blue-500 text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      <div className="bg-gray-50 p-4 lg:p-6 rounded-xl mb-6 min-h-[120px] border border-blue-200">
                        {tabContent[activeTab]}
                      </div>

                      <div className="text-center">
                        <button
                          onClick={submitGrievanceUpdate}
                          disabled={isSubmitting}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          {isSubmitting ? "Updating..." : "Update Ticket"}
                        </button>
                      </div>

                      <div className="text-center mt-6">
                        <div
                          className="bg-contain bg-no-repeat bg-center h-6 w-full mx-auto"
                          style={{ backgroundImage: `url('/api/placeholder/320/24')` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center border border-blue-200">
                  <h3 className="text-xl font-bold mb-4 font-['Rajdhani',_sans-serif] text-black">
                    No Ticket Selected
                  </h3>
                  <p className="text-gray-600 font-['Raleway',_sans-serif]">
                    Please select a ticket from the list to view and manage details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default TicketManagement;