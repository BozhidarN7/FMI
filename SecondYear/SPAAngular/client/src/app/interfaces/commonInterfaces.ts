export interface User {
  _id: string;
  username: string | undefined;
  organization: string | undefined;
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

export interface Job {
  _id: string;
  title: string;
  description: string;
  likes: number;
  workingType: string;
  category: string;
  image: string;
  creatorId: string;
  usersLiked: Array<string>;
  usersApplied: Array<string>;
}
