import { Injectable } from '@angular/core';
import { User } from '../interfaces/commonInterfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  constructor() {}

  addUser(user: User) {
    this.users.push(user);
  }

  findUser(_id: string): User {
    return this.users.find((user) => user._id === _id)!;
  }
}
