import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import jwtDecode from "jwt-decode";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  nickname : string = '';
  password : string = '';
  passwordConfirm : string = '';
  constructor(private router : Router,
    private readonly authService : AuthService,
    private readonly userService : UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async register(){
    try {
      await this.userService.createUser({
        nickname:this.nickname,
        senha:this.password
      })
      const {token} = await this.userService.login({
        senha:this.password,
        nickname:this.nickname
      });
      const user : any = jwtDecode(token)
      this.authService.setToken(token);
      this.authService.setUser(JSON.stringify({nickname:this.nickname, id:user.jti})) ;
      this.router.navigateByUrl("filas");
    } catch (error) {
      this.openSnackBar('Nickname já esta cadastrado! Tente novamente.','Ok','snack-bar-danger');
    }
  }

  openSnackBar(message: string, action: string, color) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: color,
    });
  }

  isNotValid(){
    return this.nickname.length <= 2 || this.password.length <= 2 || this.password != this.passwordConfirm;
  }

  cancel(){
    this.router.navigateByUrl("");
  }

}
