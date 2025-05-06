import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Property, ReservationState, ReservationAction } from '../types';

const initialState: ReservationState = {
  isReserving: false,
  selectedProperty: null,
  isConfirmed: false,
  showChat: false,
  guestName: '',
  errorMessage: null
};

function reservationReducer(state: ReservationState, action: ReservationAction): ReservationState {
  switch (action.type) {
    case 'START_RESERVATION':
      return {
        ...state,
        isReserving: true,
        selectedProperty: action.property,
        isConfirmed: false,
        showChat: false,
        errorMessage: null
      };
    case 'CANCEL_RESERVATION':
      return {
        ...state,
        isReserving: false,
        selectedProperty: null,
        errorMessage: null
      };
    case 'SET_GUEST_NAME':
      return {
        ...state,
        guestName: action.name
      };
    case 'CONFIRM_RESERVATION':
      return {
        ...state,
        isConfirmed: true,
        isReserving: false
      };
    case 'SHOW_ERROR':
      return {
        ...state,
        errorMessage: action.message
      };
    case 'SHOW_CHAT':
      return {
        ...state,
        showChat: true
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface ReservationContextType {
  state: ReservationState;
  dispatch: React.Dispatch<ReservationAction>;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reservationReducer, initialState);

  return (
    <ReservationContext.Provider value={{ state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
}