import React, { useState } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { RefreshCw, RotateCcw, Wand2 } from 'lucide-react';

export const Controls: React.FC = () => {
  const [roomCount, setRoomCount] = useState<number>(1);
  const { generateRandomOccupancy, resetAllBookings, autoSelectRooms } = useBookingStore();

  const handleAutoSelect = () => {
    if (roomCount >= 1 && roomCount <= 5) {
      autoSelectRooms(roomCount);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label htmlFor="roomCount" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Rooms (1-5)
            </label>
            <input
              type="number"
              id="roomCount"
              min="1"
              max="5"
              value={roomCount}
              onChange={(e) => setRoomCount(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAutoSelect}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 h-10 mt-6"
          >
            <Wand2 className="w-5 h-5" />
            Auto Select Rooms
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={generateRandomOccupancy}
            className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            <RefreshCw className="w-5 h-5" />
            Generate Random Occupancy
          </button>
          <button
            onClick={resetAllBookings}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            <RotateCcw className="w-5 h-5" />
            Reset All Bookings
          </button>
        </div>
      </div>
    </div>
  )
}