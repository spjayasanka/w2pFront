import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {UserDashBoardComponent} from './user-dash-board/user-dash-board.component';
import {AuthGuardService} from './service/auth-guard.service';
import {OrganizationDashBoardComponent} from './organization-dash-board/organization-dash-board.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'userDashBoard/:username',
    component: UserDashBoardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'organizationDashBoard/:id',
    component: OrganizationDashBoardComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
