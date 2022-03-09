import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
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
    private router: Router,
    private userService: UserService,
    private jobService: JobService
  ) {}

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

  deleteAccount() {
    const confirm = window.confirm('Are you sure you want to delte this job!');

    if (confirm) {
      this.jobService.deleteAllUserJobs(this.user._id);
      this.userService.deleteAccount(this.user._id);
      this.router.navigate(['../register']);
    }
  }
}
