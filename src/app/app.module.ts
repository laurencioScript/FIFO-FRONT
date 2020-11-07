import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page/home-page.component';
import { QueuePageComponent } from './queue-page/queue-page.component';
import { FormLoginComponent } from './home-page/form-login/form-login.component';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

<<<<<<< HEAD
import {MatCardModule} from '@angular/material/card';
import { CardQueueComponent } from './card-queue/card-queue.component';

=======
>>>>>>> 3ce13c5fb82cf56708a26272dec02a27307ed1ef
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FormLoginComponent,
<<<<<<< HEAD
    QueuePageComponent,
    CardQueueComponent
=======
    QueuePageComponent
>>>>>>> 3ce13c5fb82cf56708a26272dec02a27307ed1ef
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
<<<<<<< HEAD
    FormsModule,
    MatCardModule,
=======
    FormsModule
>>>>>>> 3ce13c5fb82cf56708a26272dec02a27307ed1ef
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
