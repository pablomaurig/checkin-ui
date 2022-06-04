/* eslint-disable no-unused-vars */
export type UserRole = 'customer' | 'employee' | 'admin';

export interface User {
  email: string;
  role: UserRole;
  bookingId: string | null;
  createdAt: string;
  firstName: string | null;
  id: number;
  lastName: string | null;
  updatedAt: string;
}

export enum Permissions {
  admin = 'admin',
  employee = 'employee',
  customer = 'customer',
}
