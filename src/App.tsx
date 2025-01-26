import React from 'react';
import { useBookingStore } from './store/useBookingStore';
import { Floor } from './components/Floor';
import { BookingInfo } from './components/BookingInfo';
import { Controls } from './components/Controls';
import { Stats } from './components/Stats';
import { Building } from 'lucide-react';

function App() {
  const { rooms } = useBookingStore();

  const floorRooms = Array.from({ length: 10 }, (_, i) => i + 1).map(floor =>
    rooms.filter(room => room.floor === floor)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Building className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Hotel Room Reservation System</h1>
        </div>

        <Stats />
        <BookingInfo />
        <Controls />

        <div className="bg-white p-6 rounded-lg shadow-md">
          {floorRooms.map((rooms, index) => (
            <Floor key={index + 1} floor={index + 1} rooms={rooms} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;