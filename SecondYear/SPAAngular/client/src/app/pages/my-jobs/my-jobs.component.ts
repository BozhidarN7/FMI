import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/commonInterfaces';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css'],
})
export class MyJobsComponent implements OnInit {
  jobs: Job[] = [];
  constructor(private advertisementService: JobService) {}

  ngOnInit(): void {
    this.jobs = this.advertisementService.getUserJobs();
  }
}
