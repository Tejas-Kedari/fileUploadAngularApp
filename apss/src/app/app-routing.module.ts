import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path: 'add', redirectTo: '/add', pathMatch: 'full'},
  {path: 'add', component: AddComponent},
  {path: 'viewByOrbitAdmin', component: ViewComponent},
  {path: '**', redirectTo: '/add', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
