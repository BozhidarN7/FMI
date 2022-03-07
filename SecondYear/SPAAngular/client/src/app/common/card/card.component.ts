import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/interfaces/commonInterfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() job: Job = {
    _id: '',
    creatorId: '',
    description: '',
    image: '',
    likes: 0,
    category: '',
    workingType: '',
    title: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  editJob() {
    this.router.navigate([`../editJob/${this.job._id}`]);
  }
}
