import React from 'react';
import { Property } from '../types';
import { useReservation } from '../contexts/ReservationContext';

interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
  const { dispatch } = useReservation();

  const handleReserve = () => {
    dispatch({ type: 'START_RESERVATION', property });
    
    // Simulate the bug for the specific property
    if (property.hasBug) {
      setTimeout(() => {
        dispatch({ 
          type: 'SHOW_ERROR', 
          message: 'Sorry, this property is currently unavailable due to maintenance issues.'
        });
      }, 500);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <img 
        src={property.image} 
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 
          id={`property-title-${index + 1}`} 
          className="text-xl font-semibold text-gray-800 mb-1"
        >
          {property.title}
        </h2>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <p 
          id={`host-name-${index + 1}`} 
          className="text-sm text-gray-500 mb-2"
        >
          Hosted by {property.host}
        </p>
        <div className="flex justify-between items-center mb-3">
          <span 
            id={`property-rating-${index + 1}`} 
            className="flex items-center text-sm"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 h-4 text-yellow-400 mr-1"
            >
              <path 
                fillRule="evenodd" 
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                clipRule="evenodd" 
              />
            </svg>
            {property.rating}/5
          </span>
          <span className="text-gray-800 font-semibold">${property.price}/night</span>
        </div>
        <div 
          id={`property-comments-${index + 1}`} 
          className="text-sm text-gray-600 mb-4 border-t border-b border-gray-100 py-2"
        >
          <p className="italic mb-1">"{property.comments[0]}"</p>
          {property.comments[1] && (
            <p className="italic">"{property.comments[1]}"</p>
          )}
        </div>
        <button
          id={`reserve-btn-${index + 1}`}
          onClick={handleReserve}
          className="w-full bg-[#FF5A5F] text-white py-2 rounded-lg hover:bg-[#FF4349] transition-colors duration-300"
        >
          Reserve
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;