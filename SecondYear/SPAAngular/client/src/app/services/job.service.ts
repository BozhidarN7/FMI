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
      category: 'Java',
      workingType: 'full-time',
      image: 'https://rdp.epam.com/Content/images/BigLogo/NET_Icon.png',
    },
    {
      _id: 'uniqueAd123',
      creatorId: 'uniqueId124',
      title: 'someTitle',
      likes: 5,
      description: 'asdf',
      category: 'Java',
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
}
