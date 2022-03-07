import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/commonInterfaces';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  constructor(private advertisementService: JobService) {}

  ngOnInit(): void {
    this.jobs = this.advertisementService.getJobs();
  }
}
