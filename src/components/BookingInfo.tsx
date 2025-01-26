import React from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { Clock, Check } from 'lucide-react';

export const BookingInfo: React.FC = () => {
  const { selectedRooms, calculateTravelTime, confirmBooking } = useBookingStore();
  const travelTime = calculateTravelTime(selectedRooms);

  const handleBooking = () => {
    if (selectedRooms.length > 0) {
      confirmBooking();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Booking Information</h2>
      <div className="space-y-4">
        <p>Selected Rooms: {selectedRooms.length}/5</p>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <p>Total Travel Time: {travelTime} minutes</p>
        </div>
        {selectedRooms.length > 0 && (
          <div>
            <p className="font-medium">Selected Room Numbers:</p>
            <p className="mb-4">{selectedRooms.map(room => room.roomNumber).join(', ')}</p>
            <button
              onClick={handleBooking}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              <Check className="w-5 h-5" />
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};