import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './auth/home/home.component';
import { HomesComponent } from './layout/homes/homes.component';
import { RegisterComponent } from './shared/user/register/register.component';
import { SigninComponent } from './shared/user/signin/signin.component';

const routes: Routes = [
  {
    path:'',
    component:HomesComponent
  },
  {
    path:'userHome',
    component:HomeComponent
  },
  {
    path:'signUp',
    component:RegisterComponent
  },
  {
    path:'signIn',
    component:SigninComponent
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
