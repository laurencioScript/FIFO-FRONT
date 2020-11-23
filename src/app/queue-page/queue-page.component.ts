import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { QueueService } from '../service/queue.service';
import { ModalConfirmationComponent } from '../shared/modal-confirmation/modal-confirmation.component';
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
  queues : any = [];

  constructor(private authService : AuthService, private router : Router, 
    public dialog: MatDialog, 
    private readonly queueService : QueueService) {
    if(this.authService.getToken() == 'null' || !this.authService.getToken()  ){
      this.router.navigateByUrl("");
    }
    this.userLogged = JSON.parse(this.authService.getUser());
   }
  
  async ngOnInit() {
    
    this.reloadQueues()
    
  }

  openForm(){
    const dialogRef = this.dialog.open(FormQueueComponent);
    dialogRef.afterClosed().subscribe(newQueue => {
      if(newQueue && newQueue.id){
        this.reloadQueues()
      }
    });
  }

  openConfirmation(queueId : any){
    const dialogRef = this.dialog.open(ModalConfirmationComponent,{
      data:{
        tittle:'Aviso',
        message:'Tem certeza que deseja excluir essa fila ?'
      }
    });
    dialogRef.afterClosed().subscribe(async data => {
      if(data){
        await this.deleteQueue(queueId)
      }
    });
  }

  async enterQueue(queueId){
    await this.queueService.enterQueue({
      estado:'Em Fila',
      idAtividade:queueId,
      createdAt:new Date(),
      idUsuario:this.userLogged.id
    });
    this.reloadQueues()
  }

  async reloadQueues(){
    const activitys = await this.queueService.getactivity();
    const queues = await this.queueService.getQueues();

    activitys.forEach(activity => {
      activity.users = [];
      queues.forEach(queue => {
        if(queue.estado == "Em Fila" && queue.idAtividade == activity.id){
          activity.users.push(queue)
        }
      });
    });

    this.queues = activitys;
  }

  async leaveQueue(queueId){
    const queue = this.queues.find(queue => queueId == queue.id);
    if(!queue){
      return
    }
    const user = queue.users.find(user => user.idUsuario == this.userLogged.id )
    if(!user){
      return
    }
    await this.queueService.leaveQueue(user.id,{
      estado:'Saiu',
    })  

    this.reloadQueues()
  }

  userIsQueue(users){
    return users.find(  user => this.userLogged && user.idUsuario == this.userLogged.id);
  }

  async deleteQueue(id){
    await this.queueService.deleteQueue(id)
    this.reloadQueues();
  }

  getRandomNumber(){
    return Math.floor(Math.random() * 888 + 1)
  }

  logout(){
    this.authService.setUser(null);
    this.authService.setToken(null);
    this.router.navigateByUrl("");
  }

  generateId(){
    return Math.floor(Math.random() * 99999 + 1)
  }
  
}
