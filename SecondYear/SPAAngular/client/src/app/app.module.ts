import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { InputComponent } from './common/input/input.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CreateAdPageComponent } from './pages/create-ad-page/create-ad-page.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { CardComponent } from './common/card/card.component';
import { MyJobsComponent } from './pages/my-jobs/my-jobs.component';
import { EditJobPageComponent } from './pages/edit-job-page/edit-job-page.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { AppliedJobsComponent } from './pages/applied-jobs/applied-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    HomePageComponent,
    InputComponent,
    RegisterPageComponent,
    CreateAdPageComponent,
    JobsComponent,
    CardComponent,
    MyJobsComponent,
    EditJobPageComponent,
    JobDetailsComponent,
    AppliedJobsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
