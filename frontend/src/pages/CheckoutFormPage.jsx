import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || /[^a-zA-Z\s]/.test(formData.name)) {
      newErrors.name = 'Name must only contain letters and spaces.';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('userDetails', JSON.stringify(formData));
      navigate('/billing');
    }
  };

  return (
    <div className="min-h-screen w-full relative text-white flex flex-col">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <header className="relative z-10 flex justify-center items-center px-4 py-6 md:px-12">
        <h1 className="text-red-600 text-3xl md:text-4xl font-bold">SCREENFLIX</h1>
      </header>

      <main className="relative z-10 flex-grow flex flex-col justify-center items-center px-4 py-8">
        <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Enter Your Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded font-bold text-lg bg-red-600 hover:bg-red-700 transition-colors"
            >
              Generate Bill
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CheckoutFormPage;