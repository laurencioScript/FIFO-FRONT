import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

interface User{
  id:any,
  nickname:string
}

@Component({
  selector: 'app-queue-page',
  templateUrl: './queue-page.component.html',
  styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent implements OnInit {

  userLogged : any ;
  users : User[] = [
    {
      id:'1joel',
      nickname:'Joel'
  },{
    id:'2Gigante',
    nickname:'Gigante'
  },{
    id:'3Ariane',
    nickname:'Ariane'
  }];

  constructor(private authService : AuthService, private router : Router) {
    if(this.authService.getUser() == 'null' || !JSON.parse(this.authService.getUser()).id ){
      this.router.navigateByUrl("");
    }
    this.userLogged = JSON.parse(this.authService.getUser());
   }
  
  ngOnInit(): void {
    // quando tiver back end vai ser aqui que iremos consumir o end point que carrega os usuarios que estão na fila
  }

  enterQueue(){
    this.users.push(this.userLogged);
  }

  leaveQueue(){
    if(!this.userLogged){
      return
    }
    this.users = this.users.filter(user => user.id != this.userLogged.id);
  }

  userIsQueue(){
    return this.users.find(user => this.userLogged && user.id == this.userLogged.id);
  }

  getRandomNumber(){
    return Math.floor(Math.random() * 888 + 1)
  }

  logout(){
    this.authService.setUser(null);
    this.router.navigateByUrl("");
  }

  
}
