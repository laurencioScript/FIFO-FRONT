import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent} from './../app/home-page/home-page.component';
import { QueuePageComponent } from './queue-page/queue-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'filas', component: QueuePageComponent},
  { path: 'cadastro', component: RegisterPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
