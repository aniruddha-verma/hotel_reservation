import React from 'react';
import { Room as RoomType } from '../types/room';
import { RoomCard } from './RoomCard';

interface FloorProps {
  floor: number;
  rooms: RoomType[];
}

export const Floor: React.FC<FloorProps> = ({ floor, rooms }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Floor {floor}</h3>
      <div className="grid grid-cols-10 gap-2">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};