import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/booking');
  };

  return (
    <div className="min-h-screen w-full relative text-white flex flex-col">
      {/* Hero background with theater image */}
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

     {/* Navbar */}
     <header className="relative z-10 flex justify-center items-center px-4 py-6 md:px-12">
        <h1 className="text-red-600 text-3xl md:text-4xl font-bold">SCREENFLIX</h1>
      </header>


      {/* Hero content */}
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Movies, Shows, and More.</h2>
          <h3 className="text-2xl md:text-3xl mb-6">Watch anywhere. Book anytime.</h3>
          <p className="text-lg mb-8">Ready to experience cinema at its finest? Book your tickets now.</p>
          
          <button 
            onClick={handleGetStarted}
            className="bg-red-600 px-8 py-3 text-xl font-bold rounded hover:bg-red-700 transition-colors"
          >
            GET STARTED
          </button>
        </div>
      </main>

    </div>
  );
};

export default LandingPage;