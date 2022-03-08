import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/commonInterfaces';

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
  constructor() {}

  ngOnInit(): void {}
}
