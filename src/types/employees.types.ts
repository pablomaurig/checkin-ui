export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  password?: string;
}

export interface CreateEmployee {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword?: string;
}
