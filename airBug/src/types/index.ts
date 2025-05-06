export interface Property {
  id: number;
  title: string;
  host: string;
  rating: number;
  price: number;
  image: string;
  location: string;
  comments: string[];
  hasBug: boolean;
}

export interface ReservationState {
  isReserving: boolean;
  selectedProperty: Property | null;
  isConfirmed: boolean;
  showChat: boolean;
  guestName: string;
  errorMessage: string | null;
}

export type ReservationAction =
  | { type: 'START_RESERVATION'; property: Property }
  | { type: 'CANCEL_RESERVATION' }
  | { type: 'SET_GUEST_NAME'; name: string }
  | { type: 'CONFIRM_RESERVATION' }
  | { type: 'SHOW_ERROR'; message: string }
  | { type: 'SHOW_CHAT' }
  | { type: 'RESET' };