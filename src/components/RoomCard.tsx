import React from 'react';
import { Room } from '../types/room';
import { DoorClosed, Users, Check, X } from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { selectRoom, deselectRoom, cancelBooking } = useBookingStore();
  const [showCancel, setShowCancel] = React.useState(false);

  const handleRoomClick = () => {
    if (room.isOccupied) return;
    if (room.isSelected) {
      deselectRoom(room);
    } else {
      selectRoom(room);
    }
  };

  const getRoomStatus = () => {
    if (room.isOccupied) return 'occupied';
    if (room.isSelected) return 'selected';
    return 'available';
  };

  const getRoomStyles = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'selected':
        return 'bg-green-500 text-white';
      default:
        return 'bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer';
    }
  };

  const getRoomIcon = (status: string) => {
    switch (status) {
      case 'occupied':
        return <Users className="w-4 h-4" />;
      case 'selected':
        return <Check className="w-4 h-4" />;
      default:
        return <DoorClosed className="w-4 h-4" />;
    }
  };

  const status = getRoomStatus();

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowCancel(true)}
      onMouseLeave={() => setShowCancel(false)}
    >
      <button
        onClick={handleRoomClick}
        disabled={room.isOccupied}
        className={`
          w-full p-2 rounded-lg flex flex-col items-center justify-center
          transition-colors duration-200 relative
          ${getRoomStyles(status)}
        `}
      >
        <span className="text-sm font-medium mb-1">{room.roomNumber}</span>
        {getRoomIcon(status)}
      </button>
      
      {room.isOccupied && showCancel && (
        <button
          onClick={() => cancelBooking(room)}
          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full 
                     shadow-lg hover:bg-red-600 transition-colors duration-200"
          title="Cancel Booking"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};