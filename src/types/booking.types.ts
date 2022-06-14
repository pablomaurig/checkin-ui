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
export interface Booking {
  id: number;
  roomId: number | null;
  bookingNumber: number;
  surname: string;
  startDate: string;
  endDate: string;
  amountGuests: number;
  checkin: string | null;
  checkout: string | null;
  state: string;
  enable: boolean;
  createdAt: string;
  UpdatedAt: string;
}

export interface CreateBooking {
  bookingNumber: string;
  surname: string;
  startDate: string;
  endDate: string;
  amountGuests: number;
}

export interface Spent {
  id?: number;
  bookingId: number | string;
  description: string;
  amount: number | string;
}

export enum BookingState {
  DONE = 'CheckIn Done',
  PENDING = 'CheckIn Pending',
}
