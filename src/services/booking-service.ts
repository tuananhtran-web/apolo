import { wait } from "../utils/async";

export type BookingType = 'single' | 'group' | 'event';

export interface TimeSlot {
  id: string;
  time: string; // "06:00", "07:00"
  isBooked: boolean;
  price: number;
}

export interface Booking {
  id: string;
  userId: string;
  courtId: string;
  date: string; // YYYY-MM-DD
  slots: string[]; // List of slot IDs
  type: BookingType;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  eventName?: string; // For event booking
  participants?: number; // For group booking
}

// Mock Data
const MOCK_SLOTS: TimeSlot[] = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 6; // 6:00 to 21:00
  const time = `${hour.toString().padStart(2, '0')}:00`;
  return {
    id: `slot-${hour}`,
    time,
    isBooked: Math.random() > 0.8, // 20% booked
    price: 50000
  };
});

export const getAvailableSlots = async (date: string, courtId: string): Promise<TimeSlot[]> => {
  await wait(500);
  // In a real app, filter by date and courtId
  // For mock, we just return the static list with randomized booked status to simulate changes
  return MOCK_SLOTS.map(s => ({
    ...s,
    isBooked: Math.random() > 0.7
  }));
};

export const createBooking = async (booking: Omit<Booking, 'id' | 'status'>): Promise<Booking> => {
  await wait(800);
  return {
    ...booking,
    id: `bk-${Date.now()}`,
    status: 'confirmed'
  };
};
