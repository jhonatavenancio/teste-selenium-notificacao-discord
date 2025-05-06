import React, { useState, useEffect } from 'react';
import { useReservation } from '../contexts/ReservationContext';

const ReservationForm: React.FC = () => {
  const { state, dispatch } = useReservation();
  const [guestName, setGuestName] = useState('');
  
  useEffect(() => {
    if (state.errorMessage) {
      // Allow the user to dismiss the error after 5 seconds
      const timer = setTimeout(() => {
        dispatch({ type: 'CANCEL_RESERVATION' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.errorMessage, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      dispatch({ type: 'SET_GUEST_NAME', name: guestName });
      dispatch({ type: 'CONFIRM_RESERVATION' });
      
      // Show chat after 1 second
      setTimeout(() => {
        dispatch({ type: 'SHOW_CHAT' });
      }, 1000);
    }
  };

  const handleCancel = () => {
    dispatch({ type: 'CANCEL_RESERVATION' });
  };

  if (state.errorMessage) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div 
            id="reservation-error" 
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-4"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg 
                  className="h-5 w-5 text-red-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {state.errorMessage}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Back to listings
          </button>
        </div>
      </div>
    );
  }

  if (!state.isReserving || !state.selectedProperty) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Reserve {state.selectedProperty.title}
          </h2>
          <button 
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="guest-name" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Guest Name(s)
            </label>
            <input
              id="guest-name"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
              placeholder="Enter guest name(s)"
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">${state.selectedProperty.price} x 3 nights</span>
              <span className="text-gray-800 font-medium">${state.selectedProperty.price * 3}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Cleaning fee</span>
              <span className="text-gray-800 font-medium">$50</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Service fee</span>
              <span className="text-gray-800 font-medium">$30</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${state.selectedProperty.price * 3 + 50 + 30}</span>
              </div>
            </div>
          </div>
          <button
            id="pay-button"
            type="submit"
            className="w-full bg-[#FF5A5F] text-white py-2 rounded-lg hover:bg-[#FF4349] transition-colors duration-300"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;