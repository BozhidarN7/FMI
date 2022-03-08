import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Job } from '../interfaces/commonInterfaces';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobs: Job[] = [
    {
      _id: 'uniqueAd123',
      creatorId: 'uniqueId123',
      title: 'someTitle',
      likes: 5,
      description: 'asdf',
      category: 'java',
      workingType: 'full-time',
      image: 'https://rdp.epam.com/Content/images/BigLogo/NET_Icon.png',
    },
    {
      _id: 'uniqueAd124',
      creatorId: 'uniqueId124',
      title: 'someTitle',
      likes: 5,
      description: 'asdf',
      category: 'java',
      workingType: 'full-time',
      image: 'https://rdp.epam.com/Content/images/BigLogo/NET_Icon.png',
    },
  ];

  constructor() {}

  addJob(ad: Job) {
    this.jobs.push(ad);
  }

  getJobs() {
    return this.jobs;
  }
  getUserJobs() {
    const userId = JSON.parse(localStorage.getItem('user')!).userId;
    return this.jobs.filter((job) => job.creatorId === userId);
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
}
