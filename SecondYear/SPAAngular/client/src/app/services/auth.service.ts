import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isUserGuard() {
    const userInfo = localStorage.getItem('user');

    if (!userInfo) {
      return false;
    }

    return JSON.parse(userInfo).role === 'user' ? true : false;
  }

  isOrganizationGuard() {
    const userInfo = localStorage.getItem('user');

    if (!userInfo) {
      return false;
    }

    return JSON.parse(userInfo).role === 'organization' ? true : false;
  }
}
