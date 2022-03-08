import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/commonInterfaces';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  job: Job = {
    _id: '',
    creatorId: '',
    title: '',
    likes: 0,
    description: '',
    category: '',
    workingType: '',
    image: '',
    usersLiked: [],
    usersApplied: [],
    applications: [],
  };
  userId = '';
  jobId = '';
  role = '';
  liked = false;
  applied = false;
  applicationApproved = false;

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('user')!).role;
    this.userId = JSON.parse(localStorage.getItem('user')!).userId;
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.job = this.jobService.getJobById(this.jobId)!;

    if (this.job) {
      this.liked = this.job.usersLiked.includes(this.userId);
      this.applied = this.job.usersApplied.includes(this.userId);
      this.job.applications.find((app) => app.userId === this.userId);
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
