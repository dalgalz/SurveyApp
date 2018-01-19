import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SurveyService } from './../survey.service';
import { LoginService } from '../login.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Survey } from './../survey';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  @Output() ansPoll = new EventEmitter();

  surveys: Survey[] = [];
  tempSurveys: Survey[] = [];
  fullSurvey: Survey[] = [];
  searchTerm: string;

  constructor(private _surveyService: SurveyService, private _loginService: LoginService, private _router: Router) { }

  ngOnInit() {
          this._surveyService.getAllPoll()
            .subscribe(
                surveys => {
                    this.surveys = surveys
                    this.fullSurvey = surveys
                    for(let s of this.surveys)
                    {
                      if( s.user._id === this._loginService.logged_in_user._id)
                        s.isOwnedByUser = true;
                    }
                }
            );
  }

  onSurveyClick(id:string){
    this._surveyService.getAnswer(id)
    .subscribe(
      survey => {
        console.log('About to emit', survey);
          this.ansPoll.emit(survey);
          error => console.log(error);
        }
        );
    console.log()
    this._router.navigateByUrl('poll');
  }

  deleteSurvey(survey_to_delete:Survey){
  console.log("Delete Me!!");
  this._surveyService.deleteSurvey(survey_to_delete)
    .subscribe(
      survey => {
          console.log('Delete Survey', survey);
          this.surveys.splice(this.surveys.indexOf(survey_to_delete), 1);
        },
        errorResponse => {
          console.log('error', errorResponse);
        }
        );
  }

  search(event: Event){
    event.preventDefault();
      console.log('Search!', this.searchTerm);
      if(this.searchTerm === null || this.searchTerm === "" || this.searchTerm === undefined)
      {
        this.surveys = this.fullSurvey;
      }
      else
      {
        this.surveys = this.surveys.filter(survey => survey.question.toLowerCase().includes(this.searchTerm.toLowerCase()) )
        if(this.surveys.length === 0){
            this.surveys = null;
        }
      }
    }


  logout(event: Event){
    event.preventDefault();
    console.log('log out')
    this._loginService.logout();
    }

}
