import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppliedJobsComponent } from './pages/applied-jobs/applied-jobs.component';
import { CreateAdPageComponent } from './pages/create-ad-page/create-ad-page.component';
import { EditJobPageComponent } from './pages/edit-job-page/edit-job-page.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyJobsComponent } from './pages/my-jobs/my-jobs.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/jobs',
    pathMatch: 'full',
  },
  {
    path: 'jobs',
    component: JobsComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'create',
    component: CreateAdPageComponent,
  },
  {
    path: 'myJobs',
    component: MyJobsComponent,
  },
  {
    path: 'editJob/:id',
    component: EditJobPageComponent,
  },
  {
    path: 'details/:id',
    component: JobDetailsComponent,
  },
  {
    path: 'appliedJobs',
    component: AppliedJobsComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
