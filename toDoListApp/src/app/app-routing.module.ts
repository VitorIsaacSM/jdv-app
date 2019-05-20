import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { SignupComponent } from './login/signup/signup.component';
import { SigninComponent } from './login/signin/signin.component';


const routes: Routes = [
  { path : 'user/:username', component: PageComponent},
  { path : 'register', component : SignupComponent},
  { path : 'login', component : SigninComponent},
  { path : '**', component : SigninComponent},
  { path : '', component : SigninComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
