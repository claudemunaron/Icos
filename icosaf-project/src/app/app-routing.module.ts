
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  { path: 'Home', component: HomeComponent},
  { path: '', redirectTo: '/Login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
