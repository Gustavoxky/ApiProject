import { Request } from 'express';
import { Users } from '../../types';

export interface CreateUserRequest extends Request {
  body: Users
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}