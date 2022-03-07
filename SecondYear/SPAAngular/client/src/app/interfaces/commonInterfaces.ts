export interface User {
  _id: string;
  username: string;
  email: string;
  password: string; // should be hashed
  role: string;
}

export interface Organization {
  _id: string;
  organization: string;
  email: string;
  password: string;
  role: string;
}
