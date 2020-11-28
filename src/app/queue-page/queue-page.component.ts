import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private readonly queueService : QueueService,
    private _snackBar: MatSnackBar) {
    if(this.authService.getToken() == 'null' || !this.authService.getToken()  ){
      this.router.navigateByUrl("");
    }
    this.userLogged = JSON.parse(this.authService.getUser());
   }
  
  async ngOnInit() {
    this.reloadQueues()
    setInterval(()=>{
      this.openSnackBar('Atualizando...','','snack-bar-warning');
      this.reloadQueues()
    },1000*120)
  }

  editQueue(queue){
    const dialogRef = this.dialog.open(FormQueueComponent,{
      data:{
        queueId:queue.id,
        name:queue.titulo,
        numberPlayers:queue.jogadoresPorVez,
        mode:'update'
      }
    });
    dialogRef.afterClosed().subscribe(queueu => {      
      this.reloadQueues();
    });
  }

  getPositionQueue(queueId,userId?){
    userId = userId ? userId : this.userLogged.id;
    for (const queue of this.queues) {
      if(queue.id == queueId){
        for (let index = 0; index < queue.users.length; index++) {
          if(queue.users[index].idUsuario == userId){
            return index+1;
          }
        }
      }
    }
    return null;
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
        message:'Tem certeza que deseja excluir essa fila?'
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

  logout(){
    this.authService.setUser(null);
    this.authService.setToken(null);
    this.router.navigateByUrl("");
  }

  openSnackBar(message: string, action: string, color) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: color,
    });
  }
  
}
