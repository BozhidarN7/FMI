import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: any = undefined;
  subscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService
      .getLoggedUser()
      .subscribe((user) => (this.user = user));
  }
  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['../login']);
  }
}
