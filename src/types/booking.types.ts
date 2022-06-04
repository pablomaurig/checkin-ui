/* eslint-disable no-unused-vars */
export enum BookingState {
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
  roomId: number;
  bookingNumber: number;
  surname: string;
  startDate: string;
  endDate: string;
  amountGuests: number;
  checkin: string;
  checkout: string;
  state: string;
  enable: boolean;
  createdAt: string;
  UpdatedAt: string;
}
