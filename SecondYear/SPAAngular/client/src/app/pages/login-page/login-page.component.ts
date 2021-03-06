import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {}

  onEmailChange(userInput: string) {
    this.email = userInput;
  }
  onPasswordChange(userInput: string) {
    this.password = userInput;
  }

  login() {
    if (!this.email || !this.password) {
      window.alert('Please fill the form!');
    }
    const user = this.userService.findUserByEmail(this.email.trim());

    if (!user) {
      window.alert('Login failed!');
      return;
    }

    if (user.password !== this.password.trim()) {
      window.alert('Login failed!');
      return;
    }

    this.userService.login(user);
    localStorage.setItem(
      'user',
      JSON.stringify({ userId: user._id, role: user.role })
    );

    this.router.navigate(['../']);
  }
}
