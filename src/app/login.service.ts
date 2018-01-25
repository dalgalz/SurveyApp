import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie';

import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  emailError = new BehaviorSubject({});

	logged_in_user: User = new User();
  logged_in: boolean = false;

  constructor(
  	  	private _http: Http,
        private _router: Router
    ) { 

  }

  register(user: User): Observable<User>{
    console.log('in reg func');
    return this._http.post('/users', user)
        .map((response) => {
            console.log('Reg Response', response);
            return response.json();
        })
        .catch((error) => {
            if(error.json().error.code === 11000){
                console.log('User with email already exists!');
                this.emailError.next({error:'User with email already exists!'});
            }
            return Observable.throw(error);
        })
  }

  login_attempt(user: User): Observable<User>{
    console.log('sending login request');
    return this._http.post('/login', user)
        .map((response) => {
            console.log('logged in!')
            return response.json();
        })
        .catch((error) => {
            console.log('log in error', error);
            return Observable.throw(error);
        })
    }

  login(user: User){
	    console.log('in login func');
        this.logged_in_user = user;
        this._router.navigateByUrl('dashboard');
        localStorage.setItem('id', this.logged_in_user._id);
  }

  logout(){
    console.log('in log out func');
    this.logged_in_user = new User();
    localStorage.setItem('id', undefined);
  }


}
