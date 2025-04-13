export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  role?: string;
}

export interface SignedUser {
  id?: string;
  username: string;
  password: string;
}

export interface Users {
  name: string;
  email: string;
  username: string;
  id?: string;
  status: string;
  phoneNumber: string;
}
