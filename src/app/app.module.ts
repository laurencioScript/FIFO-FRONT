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

import {MatCardModule} from '@angular/material/card';
import { FormQueueComponent } from './queue-page/form-queue/form-queue.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FormLoginComponent,
    QueuePageComponent,
    FormQueueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
