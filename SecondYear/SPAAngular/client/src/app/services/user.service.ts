import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from '../interfaces/commonInterfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    {
      _id: 'uniqueId123',
      username: 'Bozhidar',
      email: 'test@abv.bg',
      password: 'asdf',
      role: 'user',
    },
  ];
  loggedUser = new Subject();

  constructor() {}

  addUser(user: User) {
    this.users.push(user);
    this.loggedUser.next(user);
  }

  findUserById(_id: string): User {
    return this.users.find((user) => user._id === _id)!;
  }

  findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  login(user: User) {
    this.loggedUser.next(user);
  }

  getLoggedUser() {
    return this.loggedUser;
  }
}
