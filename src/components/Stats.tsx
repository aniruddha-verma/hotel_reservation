import React from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { Hotel, Users, DoorClosed } from 'lucide-react';

export const Stats: React.FC = () => {
  const { rooms } = useBookingStore();
  
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(room => room.isOccupied).length;
  const vacantRooms = totalRooms - occupiedRooms;

  const stats = [
    { label: 'Total Rooms', value: totalRooms, icon: Hotel },
    { label: 'Occupied Rooms', value: occupiedRooms, icon: Users },
    { label: 'Vacant Rooms', value: vacantRooms, icon: DoorClosed },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">{label}</h3>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};