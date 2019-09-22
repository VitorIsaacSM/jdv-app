import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestroyGame } from './leave.guard';

const routes: Routes = [
  {path: "", component: HomeComponent, canDeactivate: [DestroyGame]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
