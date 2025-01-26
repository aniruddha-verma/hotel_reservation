import { Room } from '../types/room';

export const generateInitialRooms = (): Room[] => {
  const rooms: Room[] = [];
  
  // Generate rooms for floors 1-9
  for (let floor = 1; floor <= 9; floor++) {
    for (let room = 0; room < 10; room++) {
      const roomNumber = `${floor}${String(room + 1).padStart(2, '0')}`;
      rooms.push({
        id: parseInt(roomNumber),
        floor,
        roomNumber,
        isOccupied: false,
        isSelected: false,
      });
    }
  }
  
  // Generate rooms for floor 10
  for (let room = 1; room <= 7; room++) {
    const roomNumber = `100${room}`;
    rooms.push({
      id: parseInt(roomNumber),
      floor: 10,
      roomNumber,
      isOccupied: false,
      isSelected: false,
    });
  }
  
  return rooms;
};

export const calculateTravelTime = (rooms: Room[]): number => {
  if (rooms.length <= 1) return 0;
  
  let totalTime = 0;
  for (let i = 0; i < rooms.length - 1; i++) {
    const currentRoom = rooms[i];
    const nextRoom = rooms[i + 1];
    
    // Vertical travel time (2 minutes per floor)
    const floorDiff = Math.abs(nextRoom.floor - currentRoom.floor);
    const verticalTime = floorDiff * 2;
    
    // Horizontal travel time (1 minute per room)
    const currentRoomPosition = parseInt(currentRoom.roomNumber.slice(-2));
    const nextRoomPosition = parseInt(nextRoom.roomNumber.slice(-2));
    const horizontalTime = Math.abs(nextRoomPosition - currentRoomPosition);
    
    totalTime += verticalTime + horizontalTime;
  }
  
  return totalTime;
};

export const findAvailableRooms = (
  rooms: Room[],
  numberOfRooms: number
): Room[] => {
  const availableRooms: Room[] = [];
  
  // Sort rooms by floor and room number
  const sortedRooms = [...rooms]
    .filter(room => !room.isOccupied && !room.isSelected)
    .sort((a, b) => {
      if (a.floor !== b.floor) return a.floor - b.floor;
      return parseInt(a.roomNumber) - parseInt(b.roomNumber);
    });

  // Take the first n available rooms
  return sortedRooms.slice(0, numberOfRooms);
};