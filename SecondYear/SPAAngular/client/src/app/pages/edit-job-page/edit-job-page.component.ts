import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Job } from 'src/app/interfaces/commonInterfaces';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-edit-job-page',
  templateUrl: './edit-job-page.component.html',
  styleUrls: ['./edit-job-page.component.css'],
})
export class EditJobPageComponent implements OnInit {
  job: Job = {
    _id: '',
    creatorId: '',
    description: '',
    image: '',
    likes: 0,
    category: '',
    workingType: '',
    title: '',
    usersLiked: [],
    usersApplied: [],
  };

  title: string = '';
  image: string = '';
  jobId = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  onTitleChange(userInput: string) {
    this.title = userInput;
  }

  onImageChange(userInput: string) {
    this.image = userInput;
  }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.job = this.jobService.getJobById(this.jobId)!;
    this.image = this.job.image;
    this.title = this.job.title;
  }

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
      return;
    }
    this.jobService.editJob(this.jobId, {
      description,
      workingType,
      category: category.split(' ')[0].toLowerCase(),
      title: this.title,
      image: this.image,
    });
    this.router.navigate(['../myJobs']);
  }
}
