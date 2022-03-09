import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/interfaces/commonInterfaces';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

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
  jobOwner = false;
  applicationApproved = '';
  appliedCandidates: any = [];
  approvedCandidates: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('user')!).role;
    this.userId = JSON.parse(localStorage.getItem('user')!).userId;
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.job = this.jobService.getJobById(this.jobId)!;

    if (this.job) {
      this.liked = this.job.usersLiked.includes(this.userId);
      this.applied = this.job.usersApplied.includes(this.userId);
      this.job.applications.find((app) => app.userId === this.userId);
      this.getApplications();
      this.applicationApproved = this.jobService.checkApplication(
        this.userId,
        this.jobId
      );
      this.jobOwner = this.job.creatorId === this.userId ? true : false;
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

  getApplications() {
    const applications = this.jobService.getApplications(this.jobId);
    applications.forEach((application) => {
      if (application.status === 'pending') {
        const user = this.userService.findUserById(application.userId);
        this.appliedCandidates.push({
          ...user,
          applicationId: application._id,
        });
      } else {
        const user = this.userService.findUserById(application.userId);
        this.approvedCandidates.push(user);
      }
    });
  }

  approveCandidate(candidate: any) {
    this.jobService.approveApplication(this.jobId, candidate.applicationId);
    this.approvedCandidates.push(candidate);
    this.appliedCandidates.splice(
      this.appliedCandidates.indexOf(
        this.appliedCandidates.find((x: any) => x.userId === candidate.userId)
      ),
      1
    );
  }

  rejectCandidate(candidate: any) {
    this.jobService.rejectApplication(this.jobId, candidate.applicationId);
    this.appliedCandidates.splice(
      this.appliedCandidates.indexOf(
        this.appliedCandidates.find((x: any) => x.userId === candidate.userId)
      ),
      1
    );
  }

  edit() {
    this.router.navigate(['../editJob', this.jobId]);
  }

  delete() {
    const confirm = window.confirm('Are you sure you want to delte this job!');

    if (confirm) {
      this.jobService.deleteJob(this.jobId);
      this.router.navigate(['../myJobs']);
    }
  }
}
