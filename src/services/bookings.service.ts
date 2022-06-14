import { CreateBooking, Spent } from '../types/booking.types';
const URI = process.env.REACT_APP_API_URI;

export const getBookings = async (token: string) => {
  const response = await fetch(`${URI}/bookings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const reservas = await response.json();

  return reservas;
};

export const updateBookingRoom = async (
  bookingId: number,
  roomId: number,
  token: string
) => {
  const response = await fetch(`${URI}/bookings/${bookingId}`, {
    method: 'PATCH',
    body: JSON.stringify({ roomId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const createBooking = async (booking: CreateBooking, token: string) => {
  const response = await fetch(`${URI}/bookings`, {
    method: 'POST',
    body: JSON.stringify(booking),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const checkout = async (bookingId: number, token: string) => {
  const response = await fetch(`${URI}/bookings/checkout`, {
    method: 'POST',
    body: JSON.stringify({ bookingId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const deleteBooking = async (bookingId: number, token: string) => {
  const response = await fetch(`${URI}/bookings/${bookingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const createBookingSpent = async (spent: Spent, token: string) => {
  const response = await fetch(`${URI}/spents`, {
    method: 'POST',
    body: JSON.stringify(spent),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const getBookingSpents = async (bookingId: number, token: string) => {
  const response = await fetch(`${URI}/spents/${bookingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const gastos = await response.json();

  return gastos;
};
