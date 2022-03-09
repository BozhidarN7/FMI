import * as uuid from 'uuid';
import { Injectable } from '@angular/core';
import { Job } from '../interfaces/commonInterfaces';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobs: Job[] = [
    {
      _id: 'uniqueJobId1',
      creatorId: 'uniqueId2',
      title: 'Junior React Developer',
      likes: 0,
      description:
        'Do not hesitate and come to work for the best company in Bulgaria',
      category: 'angular',
      workingType: 'full-time',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png',
      usersLiked: [],
      usersApplied: [],
      applications: [
        // {
        //   _id: 'uniquerAppId',
        //   userId: 'uniqueId1',
        //   status: 'pending',
        // },
      ],
    },
    {
      _id: 'uniqueJobId2',
      creatorId: 'uniqueId2',
      title: 'Seniour React Developer',
      likes: 0,
      description: 'We give the highest salary',
      category: 'react',
      workingType: 'full-time',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
      usersLiked: [],
      usersApplied: [],
      applications: [],
    },
  ];

  constructor() {}

  addJob(ad: Job) {
    this.jobs.push(ad);
  }

  getJobs() {
    return this.jobs;
  }

  getJobById(id: string) {
    return this.jobs.find((job) => job._id === id);
  }

  getAppliedJobs(userId: string) {
    return this.jobs.filter((job) => job.usersApplied.includes(userId));
  }

  editJob(id: string, data: any) {
    let job = this.getJobById(id)!;
    const jobIndex = this.jobs.indexOf(job);

    job = { ...job, ...data };
    this.jobs[jobIndex] = job;
  }

  like(jobId: string, userId: string) {
    const job = this.jobs.find((job) => job._id === jobId)!;
    job.usersLiked.push(userId);
    job.likes++;
  }

  apply(jobId: string, userId: string) {
    const job = this.jobs.find((job) => job._id === jobId)!;
    job.usersApplied.push(userId);
    job.applications.push({ _id: uuid.v4(), userId, status: 'pending' });
  }

  getApplications(jobId: string) {
    return this.getJobById(jobId)!.applications;
  }

  approveApplication(jobId: string, applicationId: string) {
    this.getJobById(jobId)!.applications.find(
      (app) => app._id == applicationId
    )!.status = 'approved';
  }

  checkApplication(userId: string, jobId: string) {
    const status = this.getJobById(jobId)!.applications.find(
      (app) => app.userId === userId
    )?.status;
    console.log(status);
    if (!status) {
      return '';
    }
    return status;
  }

  rejectApplication(jobId: string, applicationId: string) {
    this.getJobById(jobId)!.applications.find(
      (app) => app._id == applicationId
    )!.status = 'rejected';
  }

  deleteJob(jobId: string) {
    this.jobs.splice(this.jobs.indexOf(this.getJobById(jobId)!), 1);
  }

  deleteAllUserJobs(userId: string) {
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].creatorId === userId) {
        this.jobs.splice(i, 1);
        i--;
      }
    }
  }
}
