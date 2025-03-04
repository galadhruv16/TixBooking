import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Predefined seat arrangement (8 rows x 10 columns)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;
  const pricePerSeat = 200;
  
  // Random seats that are already booked (for demo purposes)
  // eslint-disable-next-line no-unused-vars
  const [bookedSeats, setBookedSeats] = useState([
    'A3', 'A4', 'B5', 'C7', 'D2', 'D3', 'E8', 'F1', 'G6', 'H10'
  ]);
  
  useEffect(() => {
    // Fetch booking data from localStorage
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      // Redirect back to booking page if no data is available
      navigate('/');
    }
  }, [navigate]);
  
  useEffect(() => {
    // Update total price whenever selected seats change
    setTotalPrice(selectedSeats.length * pricePerSeat);
  }, [selectedSeats]);
  
  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) {
      // Seat is already booked, do nothing
      return;
    }
    
    setSelectedSeats(prevSelected => {
      if (prevSelected.includes(seat)) {
        // Deselect the seat
        return prevSelected.filter(s => s !== seat);
      } else {
        // Select the seat
        return [...prevSelected, seat];
      }
    });
  };
  
  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    // Store selected seats in localStorage
    const checkoutData = {
      ...bookingData,
      selectedSeats,
      totalPrice
    };
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // In a real application, you would send this data to your backend
    // For now, we'll just show an alert
    alert(`Booking successful!\nMovie: ${bookingData?.movie.title}\nTheatre: ${bookingData?.theatre.name}\nSeats: ${selectedSeats.join(', ')}\nTotal: ₹${totalPrice}`);
    
    // Navigate to a confirmation page or back to homepage
    navigate('/');
  };
  
  const getSeatStatus = (seat) => {
    if (bookedSeats.includes(seat)) return 'booked';
    if (selectedSeats.includes(seat)) return 'selected';
    return 'available';
  };
  
  return (
    <div className="min-h-screen w-full relative text-white flex flex-col">
      {/* Background with gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 to-black"></div>
      
      {/* Header */}
      <header className="relative z-10 flex justify-center items-center px-4 py-6 md:px-12 border-b border-gray-800">
        <h1 className="text-red-600 text-3xl md:text-4xl font-bold">SCREENFLIX</h1>
      </header>
      
      {/* Movie & Theatre Info */}
      {bookingData && (
        <div className="relative z-10 bg-gray-900 p-4 text-center">
          <h2 className="text-xl font-bold">{bookingData.movie.title}</h2>
          <p className="text-gray-400">{bookingData.theatre.name}</p>
        </div>
      )}
      
      {/* Main content */}
      <main className="relative z-10 flex-grow flex flex-col items-center px-4 py-8 overflow-auto">
        <div className="max-w-4xl w-full">
          {/* Screen */}
          <div className="mb-10 text-center">
            <div className="h-2 bg-gray-400 rounded mx-auto w-4/5 mb-2"></div>
            <div className="h-8 bg-gray-700 w-full rounded-lg shadow-lg flex items-center justify-center text-gray-400">
              SCREEN
            </div>
          </div>
          
          {/* Seat Legend */}
          <div className="flex justify-center gap-8 mb-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-600 rounded mr-2"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-600 rounded mr-2"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-800 rounded mr-2"></div>
              <span>Booked</span>
            </div>
          </div>
          
          {/* Seat Grid */}
          <div className="mb-10">
            {rows.map(row => (
              <div key={row} className="flex justify-center mb-2">
                <div className="w-6 flex items-center justify-center mr-2">
                  {row}
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatNumber = i + 1;
                    const seat = `${row}${seatNumber}`;
                    const status = getSeatStatus(seat);
                    
                    return (
                      <button
                        key={seat}
                        className={`w-8 h-8 rounded flex items-center justify-center text-xs ${
                          status === 'booked' 
                            ? 'bg-gray-800 cursor-not-allowed' 
                            : status === 'selected' 
                              ? 'bg-red-600 hover:bg-red-700' 
                              : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        onClick={() => handleSeatClick(seat)}
                        disabled={status === 'booked'}
                      >
                        {seatNumber}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary and Checkout */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-gray-400">Selected Seats</div>
                <div className="font-bold">
                  {selectedSeats.length > 0 
                    ? selectedSeats.join(', ') 
                    : 'No seats selected'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-400">Total Price</div>
                <div className="text-xl font-bold">₹{totalPrice}</div>
              </div>
            </div>
            
            <button
              className={`w-full py-3 rounded font-bold text-lg ${
                selectedSeats.length > 0
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-700 cursor-not-allowed'
              }`}
              onClick={handleCheckout}
              disabled={selectedSeats.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeatSelectionPage;