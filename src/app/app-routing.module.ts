import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent} from './../app/home-page/home-page.component';
import { QueuePageComponent } from './queue-page/queue-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'filas', component: QueuePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
