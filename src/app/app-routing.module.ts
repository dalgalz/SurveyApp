import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SurveyComponent } from './survey/survey.component';
import { CreateComponent } from './create/create.component';
import { PollComponent } from './poll/poll.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: SurveyComponent
    },
    {
        path: 'create',
        pathMatch: 'full',
        component: CreateComponent
    },
    {
        path: 'poll/:id',
        pathMatch: 'full',
        component: PollComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }