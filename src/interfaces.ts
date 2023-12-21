export interface Users {
    id?: number | string;
    name: string;
    email: string;
    login?: string;
    password?: string;
  };

  export interface File {
    id: string
    path: string
  }