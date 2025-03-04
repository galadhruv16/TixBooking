import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState('');
  
  // Sample movie and theatre data
  const movies = [
    { id: 1, title: 'Interstellar' },
    { id: 2, title: 'The Dark Knight' },
    { id: 3, title: 'Inception' }
  ];
  
  const theatres = [
    { id: 1, name: 'IMAX Theatre' },
    { id: 2, name: 'Dolby Cinema' },
    { id: 3, name: 'PVR Cinemas' }
  ];

  const handleMovieChange = (e) => {
    setSelectedMovie(e.target.value);
  };

  const handleTheatreChange = (e) => {
    setSelectedTheatre(e.target.value);
  };

  const handleContinue = () => {
    if (selectedMovie && selectedTheatre) {
      // Create booking data object
      const bookingData = {
        movie: movies.find(movie => movie.id === parseInt(selectedMovie)),
        theatre: theatres.find(theatre => theatre.id === parseInt(selectedTheatre)),
        timestamp: new Date().toISOString()
      };
      
      // In a real app, you might store this in context, redux, or localStorage
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
      
      // Navigate to seat selection page
      navigate('/seat-selection');
    }
  };

  return (
    <div className="min-h-screen w-full relative text-white flex flex-col">
      {/* Background with theater image and overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        {/* Netflix-style gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-center items-center px-4 py-6 md:px-12">
        <h1 className="text-red-600 text-3xl md:text-4xl font-bold">SCREENFLIX</h1>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center px-4">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Book Your Movie</h2>
          
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="movie">
              Select Movie
            </label>
            <select 
              id="movie"
              className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              value={selectedMovie}
              onChange={handleMovieChange}
            >
              <option value="">-- Select a movie --</option>
              {movies.map(movie => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-400 mb-2" htmlFor="theatre">
              Select Theatre
            </label>
            <select 
              id="theatre"
              className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              value={selectedTheatre}
              onChange={handleTheatreChange}
            >
              <option value="">-- Select a theatre --</option>
              {theatres.map(theatre => (
                <option key={theatre.id} value={theatre.id}>
                  {theatre.name}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className={`w-full py-3 rounded font-bold text-lg ${
              selectedMovie && selectedTheatre 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-gray-700 cursor-not-allowed'
            } transition-colors`}
            onClick={handleContinue}
            disabled={!selectedMovie || !selectedTheatre}
          >
            Continue to Seat Selection
          </button>
        </div>
      </main>

    </div>
  );
};

export default BookingPage;