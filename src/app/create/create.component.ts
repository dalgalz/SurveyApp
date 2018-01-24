import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Survey } from './../survey';
import { User } from './../user';

import { SurveyService } from './../survey.service';
import { LoginService } from './../login.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Output() addPoll = new EventEmitter();

  survey: Survey = new Survey();

  constructor(private _loginService: LoginService, private _surveyService: SurveyService, private _router: Router) { }

  ngOnInit() {
  }

  newPoll(event: Event, form: NgForm): void{
    event.preventDefault();
    console.log('create a new poll', event);
    this.survey.user = this._loginService.logged_in_user;
    this._surveyService.createPoll(this.survey)
      .subscribe(
        survey => {
          console.log('About to emit', survey);
          this.addPoll.emit(survey);
          error => console.log(error);
        }
        );
      this.survey = new Survey();
      console.log('new poll');
      console.log(this.survey);
      this._router.navigateByUrl('dashboard');
  }

}
