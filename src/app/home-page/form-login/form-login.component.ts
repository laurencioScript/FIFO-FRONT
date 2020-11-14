import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  nickName : string = '';
  users : any = [];

  constructor(private readonly authService : AuthService,
    private readonly userService : UserService, 
    private router : Router,
    public dialogRef: MatDialogRef<FormLoginComponent>,
    private _snackBar: MatSnackBar) { }

  async ngOnInit()  {
    this.users = await this.userService.getUsers();
  }

  login(){
    console.log('>>> this.users',this.users);
    console.log('>>> this.nickName',this.nickName);
    const existUser = this.users.find(user => user.nickname == this.nickName);

    if(!existUser){
      this.openSnackBar('Nickname invalido','ok','snack-bar-danger');
      return
    }

    this.authService.setUser(JSON.stringify(existUser)) ;
    this.dialogRef.close();
    this.router.navigateByUrl("filas");
  }

  openSnackBar(message: string, action: string, color) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: color,
    });
  }

  generateId(){
    return Math.floor(Math.random() * 99999 + 1)
  }

}
