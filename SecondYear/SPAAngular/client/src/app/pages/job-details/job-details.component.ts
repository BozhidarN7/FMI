import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  applicationApproved = false;
  appliedCandidates: any = [];
  approvedCandidates: any = [];

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private userServie: UserService
  ) {}

  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('user')!).role;
    this.userId = JSON.parse(localStorage.getItem('user')!).userId;
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.job = this.jobService.getJobById(this.jobId)!;
    this.getApplications();

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

  getApplications() {
    const applications = this.jobService.getApplications(this.jobId);
    applications.forEach((application) => {
      if (application.status === 'pending') {
        const user = this.userServie.findUserById(application.userId);
        this.appliedCandidates.push({
          ...user,
          applicationId: application._id,
        });
      } else {
        const user = this.userServie.findUserById(application.userId);
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
}
