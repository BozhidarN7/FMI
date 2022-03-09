import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Organization, User } from '../interfaces/commonInterfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    {
      _id: 'uniqueId1',
      username: 'Bozhidar',
      organization: undefined,
      email: 'test@abv.bg',
      password: 'asdf',
      role: 'user',
    },
    {
      _id: 'uniqueId2',
      username: undefined,
      organization: 'Google',
      email: 'test1@abv.bg',
      password: 'asdf',
      role: 'organization',
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

  logout() {
    this.loggedUser.next(undefined);
    localStorage.removeItem('user');
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  deleteAccount(userId: string) {
    this.logout();
    this.users.splice(this.users.indexOf(this.findUserById(userId)), 1);
  }
}
