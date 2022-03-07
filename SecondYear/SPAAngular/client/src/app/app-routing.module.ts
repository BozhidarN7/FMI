import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAdPageComponent } from './pages/create-ad-page/create-ad-page.component';
import { EditJobPageComponent } from './pages/edit-job-page/edit-job-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyJobsComponent } from './pages/my-jobs/my-jobs.component';
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
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
