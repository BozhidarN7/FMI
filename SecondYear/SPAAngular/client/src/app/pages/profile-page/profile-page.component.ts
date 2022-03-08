import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  newUsername = '';
  userId = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!).userId;
  }

  onOldPasswordChange(userInput: string) {
    this.oldPassword = userInput;
  }

  onNewPasswordChange(userInput: string) {
    this.newPassword = userInput;
  }

  onConfirmPasswordChange(userInput: string) {
    this.confirmPassword = userInput;
  }

  onNewUsernameChange(userInput: string) {
    this.newUsername = userInput;
  }

  changePassword() {
    const user = this.userService.findUserById(this.userId);
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      window.alert('Please fill the form!');
      return;
    }
    if (
      this.oldPassword !== user.password ||
      this.newPassword !== this.confirmPassword
    ) {
      window.alert('Password mismatch!');
      return;
    }

    user.password = this.newPassword;
    window.alert('Password changed successfully!');
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.router.navigate(['/profile']);
  }

  changeUsername() {
    if (!this.newUsername) {
      window.alert('Please fill the form!');
      return;
    }
    const user = this.userService.findUserById(this.userId);

    user.username = this.newUsername;
    window.alert('Username updated successfully!');
  }

  deleteAccount() {
    this.userService.deleteAccount(this.userId);
  }
}
