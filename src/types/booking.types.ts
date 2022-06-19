/* eslint-disable no-unused-vars */
export enum BookingStateMock {
  Initial,
  Pending,
  Created,
  Approved,
  Checked,
  Active,
  Finalized,
}

export interface Spent {
  id?: number;
  bookingId: number | string;
  description: string;
  amount: number | string;
}
export interface Booking {
  id: number;
  roomId: number | null;
  bookingNumber: number;
  surname: string;
  startDate: string;
  endDate: string;
  amountGuests: number;
  checkIn: string | null;
  checkOut: string | null;
  state: string;
  enable: boolean;
  createdAt: string;
  UpdatedAt: string;
}

export interface GetBooking {
  lastName: string;
  bookingNumber: string;
}

export interface CreateBooking {
  bookingNumber: string;
  surname: string;
  startDate: string;
  endDate: string;
  amountGuests: number;
}

export enum BookingState {
  DONE = 'CheckIn Done',
  PENDING = 'CheckIn Pending',
}

export interface Guest {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  telephoneNumber: string;
  country: string;
  idCardFront: string;
  idCardBack: string;
}

export interface CheckinBody {
  bookingId: number;
  userId: number;
  guests: Guest[];
}
