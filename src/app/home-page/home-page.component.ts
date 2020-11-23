import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormLoginComponent } from './form-login/form-login.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public dialog: MatDialog,private router : Router, private readonly authService : AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    console.log('>>> token',token);
    if(token == "null"|| !token){
      return;
    }
    this.router.navigateByUrl("filas");
  }

  openFormLogin(){
    const dialogRef = this.dialog.open(FormLoginComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  register(){
    this.router.navigateByUrl("cadastro");
  }

}
