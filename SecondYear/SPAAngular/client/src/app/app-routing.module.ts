import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersGuard } from './auth/all-users.guard';
import { IsGuestGuard } from './auth/is-guest.guard';
import { IsOrganizationGuard } from './auth/is-organization.guard';
import { IsUserGuard } from './auth/isUser.guard';
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
    // canActivate: [AllUsersGuard],
    component: JobsComponent,
  },
  {
    path: 'login',
    // canActivate: [IsGuestGuard],
    component: LoginPageComponent,
  },
  {
    path: 'register',
    // canActivate: [IsGuestGuard],
    component: RegisterPageComponent,
  },
  {
    path: 'create',
    // canActivate: [IsOrganizationGuard],
    component: CreateAdPageComponent,
  },
  {
    path: 'myJobs',
    // canActivate: [IsOrganizationGuard],
    component: MyJobsComponent,
  },
  {
    path: 'editJob/:id',
    // canActivate: [IsOrganizationGuard],
    component: EditJobPageComponent,
  },
  {
    path: 'details/:id',
    // canActivate: [AllUsersGuard],
    component: JobDetailsComponent,
  },
  {
    path: 'appliedJobs',
    // canActivate: [IsUserGuard],
    component: AppliedJobsComponent,
  },
  {
    path: 'profile',
    // canActivate: [IsUserGuard],
    component: ProfilePageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
