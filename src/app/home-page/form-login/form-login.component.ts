import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  nickName;

  constructor(private readonly authService : AuthService, 
    private router : Router,
    public dialogRef: MatDialogRef<FormLoginComponent>) { }

  ngOnInit(): void {
  }

  login(){

    this.authService.setUser(JSON.stringify({
      nickname:this.nickName,
      id:this.generateId()
    })) ;
    this.dialogRef.close();
    this.router.navigateByUrl("filas");

  }

  generateId(){
    return Math.floor(Math.random() * 99999 + 1)
  }

}
