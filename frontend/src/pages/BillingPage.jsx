import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // You'll need to install this package

const BillingPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Retrieve data from localStorage
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

  // Redirect to home if any required data is missing
  if (!bookingData || !userDetails || !checkoutData) {
    console.error("Missing data in localStorage. Redirecting to home.");
    navigate("/");
    return null;
  }

  useEffect(() => {
    let isRequestSent = false; // Prevent duplicate requests

    const saveBillingData = async () => {
      if (isRequestSent) return; // Skip if the request has already been sent
      isRequestSent = true;

      const billingData = {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        movie: bookingData.movie.title,
        theatre: bookingData.theatre.name,
        seats: checkoutData.selectedSeats,
        total_price: checkoutData.totalPrice,
      };

      console.log("Sending billing data to backend:", billingData);

      try {
        const response = await fetch("http://127.0.0.1:5000/api/save-billing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(billingData),
        });

        if (!response.ok) {
          throw new Error("Failed to save billing data");
        }

        const result = await response.json();
        console.log("Response from backend:", result.message);
        setIsLoaded(true); // Enable animations after data is saved
      } catch (error) {
        console.error("Error saving billing data:", error.message);
        setIsLoaded(true); // Enable animations even if there's an error
      }
    };

    saveBillingData();

    // Simulate loading for smoother animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="min-h-screen w-full relative flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <header className="relative z-10 flex justify-center items-center px-4 py-8">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-red-600 text-4xl md:text-5xl font-bold tracking-wider"
        >
          SCREENFLIX
        </motion.h1>
      </header>

      <main className="relative z-10 flex-grow flex flex-col justify-center items-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="ticket-container max-w-md w-full"
        >
          {/* Ticket stub */}
          <div className="ticket-stub bg-gray-800 p-4 rounded-t-lg border-b-4 border-dashed border-red-500">
            <h2 className="text-2xl text-center text-white font-bold mb-2">
              Booking Confirmed!
            </h2>
            <div className="flex justify-center">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Ticket body */}
          <div className="ticket-body bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-b-lg shadow-2xl">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: isLoaded ? 0 : -50, opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6 relative"
            >
              <h3 className="text-2xl font-bold text-center text-white mb-6 uppercase bg-red-600 py-2 rounded">
                Booking Summary
              </h3>

              <div className="space-y-4">
                <div className="info-row">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white font-bold">
                    {userDetails.name}
                  </span>
                </div>

                <div className="info-row">
                  <span className="text-gray-400">Movie:</span>
                  <span className="text-white font-bold">
                    {bookingData.movie.title}
                  </span>
                </div>

                <div className="info-row">
                  <span className="text-gray-400">Theatre:</span>
                  <span className="text-white font-bold">
                    {bookingData.theatre.name}
                  </span>
                </div>

                <div className="info-row">
                  <span className="text-gray-400">Seats:</span>
                  <div className="flex flex-wrap gap-2">
                    {checkoutData.selectedSeats.map((seat, index) => (
                      <motion.span
                        key={seat}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold"
                      >
                        {seat}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="info-row">
                  <span className="text-gray-400">Total Price:</span>
                  <motion.span
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="text-white font-bold text-xl"
                  >
                    ₹{checkoutData.totalPrice}
                  </motion.span>
                </div>
              </div>

              <div className="barcode flex justify-center my-6">
                <svg className="w-64 h-16" viewBox="0 0 100 30">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <rect
                      key={i}
                      x={i * 2.5}
                      y={0}
                      width={Math.random() > 0.3 ? 1 : 2}
                      height={30}
                      fill="#fff"
                    />
                  ))}
                </svg>
              </div>

              <div className="text-center text-gray-400 text-sm">
                <p>Booking ID: SCRN{Math.floor(Math.random() * 1000000)}</p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="w-full py-3 rounded-md font-bold text-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white transition-colors transform hover:scale-105 duration-200"
              onClick={() => navigate("/")}
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ticket-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .ticket-body {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: float linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BillingPage;
