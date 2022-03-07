import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './shared/user/register/register.component';
import { SigninComponent } from './shared/user/signin/signin.component';

const routes: Routes = [
  // {
  //   path:'',
  //   component:HomePageComponent
  // },
  {
    path:'signUp',
    component:RegisterComponent
  },
  {
    path:'signIn',
    component:SigninComponent
  },
  // {
  //   path:'contact',
  //   component:ContactPageComponent
  // },
  // {
  //   path:'**',
  //   redirectTo:'',
  //   pathMatch:'full'
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
