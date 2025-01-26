export interface Room {
  id: number;
  floor: number;
  roomNumber: string;
  isOccupied: boolean;
  isSelected: boolean;
}

export interface BookingState {
  rooms: Room[];
  selectedRooms: Room[];
  setRooms: (rooms: Room[]) => void;
  selectRoom: (room: Room) => void;
  deselectRoom: (room: Room) => void;
  autoSelectRooms: (count: number) => void;
  confirmBooking: () => void;
  cancelBooking: (room: Room) => void;
  resetSelection: () => void;
  generateRandomOccupancy: () => void;
  resetAllBookings: () => void;
  calculateTravelTime: (rooms: Room[]) => number;
}