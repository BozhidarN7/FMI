import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}

  changeForm() {
    this.isOrganizationFormOpen = !this.isOrganizationFormOpen;
  }

  register(data: any) {
    console.log(this.username);
    console.log(data);
    if (this.isOrganizationFormOpen) {
      console.log('here');
    } else {
      console.log(this.username);
    }
  }
}
