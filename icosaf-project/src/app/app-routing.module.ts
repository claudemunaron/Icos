
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {TrackingComponent} from './tracking/tracking.component';


const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  { path: 'Home', component: HomeComponent},
  { path: 'Tracking', component: TrackingComponent},
  { path: '', redirectTo: '/Login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
