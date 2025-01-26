import { create } from 'zustand';
import { Room, BookingState } from '../types/room';
import { generateInitialRooms, calculateTravelTime, findAvailableRooms } from '../utils/roomUtils';

export const useBookingStore = create<BookingState>((set, get) => ({
  rooms: generateInitialRooms(),
  selectedRooms: [],
  
  setRooms: (rooms) => set({ rooms }),
  
  selectRoom: (room) => {
    if (get().selectedRooms.length >= 5) return;
    
    const updatedRooms = get().rooms.map((r) =>
      r.id === room.id ? { ...r, isSelected: true } : r
    );
    
    set({
      rooms: updatedRooms,
      selectedRooms: [...get().selectedRooms, room],
    });
  },
  
  autoSelectRooms: (count: number) => {
    if (count < 1 || count > 5) return;
    
    const { rooms } = get();
    const availableRooms = findAvailableRooms(rooms, count);
    
    if (availableRooms.length < count) {
      alert(`Only ${availableRooms.length} rooms are available`);
      return;
    }
    
    const updatedRooms = rooms.map((room) => ({
      ...room,
      isSelected: availableRooms.some((r) => r.id === room.id),
    }));
    
    set({
      rooms: updatedRooms,
      selectedRooms: availableRooms,
    });
  },
  
  deselectRoom: (room) => {
    const updatedRooms = get().rooms.map((r) =>
      r.id === room.id ? { ...r, isSelected: false } : r
    );
    
    set({
      rooms: updatedRooms,
      selectedRooms: get().selectedRooms.filter((r) => r.id !== room.id),
    });
  },
  
  cancelBooking: (room) => {
    const updatedRooms = get().rooms.map((r) =>
      r.id === room.id ? { ...r, isOccupied: false } : r
    );
    
    set({ rooms: updatedRooms });
  },
  
  confirmBooking: () => {
    const { rooms, selectedRooms } = get();
    const updatedRooms = rooms.map((room) => ({
      ...room,
      isOccupied: room.isSelected ? true : room.isOccupied,
      isSelected: false,
    }));
    
    set({
      rooms: updatedRooms,
      selectedRooms: [],
    });
  },
  
  resetSelection: () => {
    const updatedRooms = get().rooms.map((r) => ({ ...r, isSelected: false }));
    set({
      rooms: updatedRooms,
      selectedRooms: [],
    });
  },
  
  generateRandomOccupancy: () => {
    const updatedRooms = get().rooms.map((room) => ({
      ...room,
      isOccupied: Math.random() > 0.5,
      isSelected: false,
    }));
    set({
      rooms: updatedRooms,
      selectedRooms: [],
    });
  },
  
  resetAllBookings: () => {
    set({
      rooms: generateInitialRooms(),
      selectedRooms: [],
    });
  },
  
  calculateTravelTime,
}));