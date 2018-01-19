import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Survey } from './../survey';

import { SurveyService } from './../survey.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']

})
export class PollComponent implements OnInit {

  survey: Survey = new Survey();

  @Output() ansPoll = new EventEmitter();


  constructor(private _surveyService: SurveyService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
      console.log("This is ID on init" + this._route.snapshot.params.id);
      this._surveyService.getAnswer(this._route.snapshot.params.id)
        .subscribe(
            survey => {
                this.survey = survey;
            }
        );
  }

  onVote( survey: Survey, idAns: string, indexPoll: number){
      this._surveyService.vote(survey, idAns)
              .subscribe(
                survey => {
                  this.survey = survey;
                },
                error => console.log(error)
              );
      this.ansPoll.emit();
  }  



}
