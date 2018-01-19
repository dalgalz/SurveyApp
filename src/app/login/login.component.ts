import { Component, OnInit } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../user';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  password: string;
  confirm_password: string;

  error: string = null;
  emailError: any = {};

  constructor( private _loginService: LoginService) { 
  }

  ngOnInit() {
  }

  onLogin( event: Event){
	event.preventDefault();
    console.log('login attempt');
    this._loginService.login_attempt(this.user)
            .subscribe(
                user => this._loginService.login(user),
                errorResponse => this.error = errorResponse.json()
            );
  }  

  register(event:Event){
    event.preventDefault();
    console.log('register', this.user);
    this.user.password = this.password;
    this._loginService.register(this.user).subscribe(
        (user: any) => {
            console.log('in subscribe user')
            this._loginService.login(user);
        },
        errorResponse => {
            console.log('in subscribe email')
            this.emailError = errorResponse.json();
        }
    );

  }


}
