import React from 'react';
import { properties } from './data/properties';
import { ReservationProvider } from './contexts/ReservationContext';
import Header from './components/Header';
import PropertyCard from './components/PropertyCard';
import ReservationForm from './components/ReservationForm';
import ConfirmationMessage from './components/ConfirmationMessage';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <ReservationProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Places to stay</h1>
            <p className="text-gray-600">
              Discover unique places to stay around the world
            </p>
          </section>
          
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                index={index} 
              />
            ))}
          </section>
        </main>
        
        <ReservationForm />
        <ConfirmationMessage />
        <ChatInterface />
        
        <footer className="bg-gray-100 mt-12 py-8 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                  Support
                </h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Safety Information</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Cancellation Options</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                  Community
                </h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Forum</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                  Hosting
                </h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Try Hosting</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Resources</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                  About
                </h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Newsroom</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Investors</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
              <div className="flex space-x-6 md:order-2">
                <p className="text-gray-500">© 2025 airBug, Inc.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ReservationProvider>
  );
}

export default App;