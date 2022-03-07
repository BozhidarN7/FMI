import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Organization, User } from 'src/app/interfaces/commonInterfaces';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: any = undefined;
  subscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private organizatoinService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.userService
      .getLoggedUser()
      .subscribe((user) => (this.user = user));
  }
  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
