export interface Users {
    id?: string
    name: string;
    email: string;
    login?: string;
    password?: string;
  };

  export interface File {
    id: string
    path: string
  }

  export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }