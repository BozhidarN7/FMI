import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/commonInterfaces';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  job: Job = {
    _id: 'uniqueAd123',
    creatorId: 'uniqueId123',
    title: 'someTitle',
    likes: 5,
    description: 'asdf',
    category: 'java',
    workingType: 'full-time',
    image: 'https://rdp.epam.com/Content/images/BigLogo/NET_Icon.png',
    usersLiked: [],
    usersApplied: [],
  };
  userId = '';
  role = '';
  liked = false;
  applied = false;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('user')!).role;
    this.userId = JSON.parse(localStorage.getItem('user')!).userId;

    if (this.job) {
      this.liked = this.job.usersLiked.includes(this.userId);
      this.applied = this.job.usersApplied.includes(this.userId);
    }
  }

  like() {
    this.jobService.like(this.job._id, this.userId);
    this.liked = true;
  }
  apply() {
    this.jobService.apply(this.job._id, this.userId);
    this.applied = true;
  }
}
