import React, { useState, useEffect } from 'react';
import { useReservation } from '../contexts/ReservationContext';

const ConfirmationMessage: React.FC = () => {
  const { state } = useReservation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (state.isConfirmed) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.isConfirmed]);

  if (!state.isConfirmed || !visible) return null;
  
  return (
    <div 
      id="reservation-confirmation" 
      className="fixed top-4 right-4 bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-md z-50 animate-fadeIn"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg 
            className="h-5 w-5 text-green-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-green-700">
            Reservation confirmed!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;