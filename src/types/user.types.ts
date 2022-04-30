/* eslint-disable no-unused-vars */
export type UserRole = 'customer' | 'employee' | 'admin';

export interface User {
  email: string;
  role: UserRole;
}

export enum Permissions {
  admin = 'admin',
  employee = 'employee',
  customer = 'customer',
}
