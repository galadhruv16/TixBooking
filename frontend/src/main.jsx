// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import './index.css'
import CheckoutFormPage from './pages/CheckoutFormPage.jsx'
import BillingPage from './pages/BillingPage.jsx'
import SeatSelectionPage from './pages/SeatSelectionPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/seat-selection" element={<SeatSelectionPage />} />
        <Route path="/checkout" element={<CheckoutFormPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
 
)