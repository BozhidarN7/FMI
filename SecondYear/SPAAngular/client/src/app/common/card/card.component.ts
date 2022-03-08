import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/interfaces/commonInterfaces';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() job: Job = {
    _id: '',
    creatorId: '',
    description: '',
    image: '',
    likes: 0,
    category: '',
    workingType: '',
    title: '',
    usersLiked: [],
  };
  @Input() isMyJobsPage = false;
  userId = '';
  userRole = '';
  organization = '';
  liked = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.userRole = JSON.parse(localStorage.getItem('user')!).role;
    this.userId = JSON.parse(localStorage.getItem('user')!).userId;

    if (this.job) {
      this.organization = this.userService.findUserById(
        this.job.creatorId
      ).organization!;
      this.liked = this.job.usersLiked.includes(this.userId);
    }
  }

  editJob() {
    this.router.navigate([`../editJob`, this.job._id]);
  }

  openJobDetails() {
    this.router.navigate(['../details', this.job._id]);
  }

  like() {
    this.jobService.like(this.job._id, this.userId);
    this.liked = true;
  }
}
