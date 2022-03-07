import * as uuid from 'uuid';
import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  isOrganizationFormOpen: boolean = false;
  username = '';
  organization = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {}

  changeForm() {
    this.isOrganizationFormOpen = !this.isOrganizationFormOpen;
  }

  onOrganizationChange(userInput: string) {
    this.organization = userInput;
  }

  onUsernameChange(userInput: string) {
    this.username = userInput;
  }
  onEmailChange(userInput: string) {
    this.email = userInput;
  }
  onPasswordChange(userInput: string) {
    this.password = userInput;
  }
  onRepeatPasswordChange(userInput: string) {
    this.confirmPassword = userInput;
  }

  register() {
    if (this.password !== this.confirmPassword) {
      return;
    }

    if (this.isOrganizationFormOpen) {
      const _id = uuid.v4();
      this.organizationService.addOrganization({
        _id,
        organization: this.organization,
        email: this.email,
        password: this.password,
        role: 'organization',
      });
      localStorage.setItem(
        'user',
        JSON.stringify({ organizationId: _id, role: 'organization' })
      );
    } else {
      const _id = uuid.v4();
      this.userService.addUser({
        _id,
        username: this.username,
        email: this.email,
        password: this.password,
        role: 'user',
      });
      localStorage.setItem(
        'user',
        JSON.stringify({ userId: _id, role: 'user' })
      );
    }

    this.router.navigate(['../']);
  }
}
