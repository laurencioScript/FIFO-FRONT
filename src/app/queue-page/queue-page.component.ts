import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormQueueComponent } from './form-queue/form-queue.component';

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
  queues : any = [{
    id : this.generateId(),
    name : 'Atividade',
    users : [
      {
        id:'1joel',
        nickname:'Joel'
    },{
      id:'2Gigante',
      nickname:'Gigante'
    },{
      id:'3Ariane',
      nickname:'Ariane'
    }]
  }];
  

  constructor(private authService : AuthService, private router : Router, public dialog: MatDialog) {
    if(this.authService.getUser() == 'null' || !JSON.parse(this.authService.getUser()).id ){
      this.router.navigateByUrl("");
    }
    this.userLogged = JSON.parse(this.authService.getUser());
   }
  
  ngOnInit(): void {
    // quando tiver back end vai ser aqui que iremos consumir o end point que carrega os usuarios que estão na fila
  }

  openForm(){
    const dialogRef = this.dialog.open(FormQueueComponent);
    dialogRef.afterClosed().subscribe(newQueue => {
      if(newQueue && newQueue.id){
        this.queues.push(newQueue);
      }
    });
  }

  enterQueue(users){
    users.push(this.userLogged);
  }

  leaveQueue({users,id}){
    if(!this.userLogged){
      return
    }
    this.queues.forEach(queue => {
      if(queue.id == id){
        queue.users = queue.users.filter(user => user.id != this.userLogged.id);
      }
    })
  }

  userIsQueue(users){
    return users.find(user => this.userLogged && user.id == this.userLogged.id);
  }

  deleteQueue({id}){
    this.queues = this.queues.filter(queue => queue.id != id)
  }

  getRandomNumber(){
    return Math.floor(Math.random() * 888 + 1)
  }

  logout(){
    this.authService.setUser(null);
    this.router.navigateByUrl("");
  }

  generateId(){
    return Math.floor(Math.random() * 99999 + 1)
  }
  
}
