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
  password : any = "";

  constructor(private readonly authService : AuthService,
    private readonly userService : UserService, 
    private router : Router,
    public dialogRef: MatDialogRef<FormLoginComponent>,
    private _snackBar: MatSnackBar) { }

  async ngOnInit()  {
    this.users = await this.userService.getUsers();
  }

  async login(){
    try {
      const {token} = await this.userService.login({
        senha:this.password,
        nickname:this.nickName
      });
      this.authService.setToken(token);
      const userExist = this.users.find(user => user.nickname == this.nickName);
      this.authService.setUser(JSON.stringify({nickname:this.nickName, id:userExist.id})) ;
      this.dialogRef.close();
      this.router.navigateByUrl("filas");
    } catch (error) {
      this.openSnackBar('Nickname ou senha invalido','ok','snack-bar-danger');
    }
  }

  isNotValid(){
    return this.nickName.length <= 2 || this.password.length <= 2;
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
