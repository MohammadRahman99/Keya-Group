export type UserRole = 'Admin' | 'ProductManager' | 'Operator';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  department?: string;
  phoneNumber?: string;
  isActive?: boolean;
  token?: string;
  createdAt?: string;
}

export interface Employee {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  department: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  token: string;
}
