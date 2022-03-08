import * as uuid from 'uuid';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-create-ad-page',
  templateUrl: './create-ad-page.component.html',
  styleUrls: ['./create-ad-page.component.css'],
})
export class CreateAdPageComponent implements OnInit {
  title: string = '';
  image: string = '';

  constructor(private router: Router, private jobService: JobService) {}

  onTitleChange(userInput: string) {
    this.title = userInput;
  }

  onImageChange(userInput: string) {
    this.image = userInput;
  }

  ngOnInit(): void {}

  create(data: any) {
    const description = data.description;
    const workingType = data.workingType;
    const category = data.category;
    if (
      !this.title ||
      !description ||
      !this.image ||
      !workingType ||
      !category
    ) {
      window.alert('Please fill the form!');
      return;
    }

    this.jobService.addJob({
      _id: uuid.v4(),
      creatorId: JSON.parse(localStorage.getItem('user')!).userId,
      description,
      workingType,
      category: category.split(' ')[0].toLowerCase(),
      image: this.image,
      title: this.title,
      likes: 0,
      usersLiked: [],
      usersApplied: [],
      applications: [],
    });

    this.router.navigate(['../myJobs']);
  }
}
