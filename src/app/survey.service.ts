import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Survey } from './survey';
import { Router } from '@angular/router';

@Injectable()
export class SurveyService {

  pollObserver = new BehaviorSubject([]);

  constructor(private _http: Http, private _router: Router) { }


getAllPoll(): Observable<Survey[]>{
return this._http.get('/survey')
  .map((response)=>{
      console.log(response);
      return response.json();
  })
   .catch((error)=> Observable.throw(error))
}

createPoll(survey:Survey): Observable<Survey[]>{
  return this._http.post('/survey', survey)
  .map((response)=>{
      console.log(response);
      return response.json();
  })
  .catch((error)=> Observable.throw(error))
}

getAnswer(id:string): Observable<Survey>{
console.log('This is ID: ' + id);
return this._http.get('/poll/'+ id)
  .map((response)=>{
      console.log(response);
      return response.json();
  })
   .catch((error)=> Observable.throw(error))
}

vote(survey:Survey, idAns: string): Observable<Survey>{
  return this._http.put('/survey/'+ survey._id, {idAns: idAns})
     .map( response => response.json())
     .catch((error)=> Observable.throw(error))
  }

  deleteSurvey(survey: Survey): Observable<Survey>{
  console.log("Gonna Delete in Service");
    return this._http.delete(`/survey/${survey._id}`)
        .map( response => response.json())
        .catch((error)=> Observable.throw(error))
  }

}
