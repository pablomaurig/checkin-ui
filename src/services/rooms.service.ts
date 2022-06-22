import { Room } from '../types/rooms.types';
const URI = process.env.REACT_APP_API_URI;

export const getRooms = async (token: string) => {
  const response = await fetch(`${URI}/rooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const habitaciones = await response.json();

  return habitaciones;
};

export const getRoomByBookingId = async (bookingId: number, token: string) => {
  const response = await fetch(`${URI}/rooms/assignables/${bookingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const createRoom = async (room: Room, token: string) => {
  const response = await fetch(`${URI}/rooms`, {
    method: 'POST',
    body: JSON.stringify(room),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const deleteRoom = async (roomId: number, token: string) => {
  const response = await fetch(`${URI}/rooms/${roomId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const updateRoom = async (
  roomId: number,
  room: Partial<Room>,
  token: string
) => {
  const response = await fetch(`${URI}/rooms/${roomId}`, {
    method: 'PATCH',
    body: JSON.stringify(room),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
