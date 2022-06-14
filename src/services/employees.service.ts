import { Employee } from '../types/employees.types';
const URI = process.env.REACT_APP_API_URI;

export const getEmployees = async (token: string): Promise<Employee[]> => {
  const response = await fetch(`${URI}/employees`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const employees = await response.json();

  return employees;
};

export const createEmployee = async (employee: Employee, token: string) => {
  const response = await fetch(`${URI}/employees`, {
    method: 'POST',
    body: JSON.stringify(employee),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const deleteEmployee = async (employeeID: number, token: string) => {
  const response = await fetch(`${URI}/employees/${employeeID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const updateEmployee = async (
  employeeId: number,
  employee: Partial<Employee>,
  token: string
) => {
  const response = await fetch(`${URI}/employees/${employeeId}`, {
    method: 'PATCH',
    body: JSON.stringify(employee),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
