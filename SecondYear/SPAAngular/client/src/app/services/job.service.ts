import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
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
  }
}
