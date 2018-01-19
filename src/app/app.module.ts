import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpModule } from '@angular/http'; // <-- Import HttpModule

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SurveyComponent } from './survey/survey.component';

import { LoginService } from './login.service';
import { SurveyService } from './survey.service';

import { AppRoutingModule } from './app-routing.module';
import { CreateComponent } from './create/create.component';
import { PollComponent } from './poll/poll.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SurveyComponent,
    CreateComponent,
    PollComponent
  ],
  imports: [
    BrowserModule,
	FormsModule, // <-- Include module in our AppModules
	HttpModule, // <-- Include module in our AppModules
	AppRoutingModule
  ],
  providers: [LoginService, SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
