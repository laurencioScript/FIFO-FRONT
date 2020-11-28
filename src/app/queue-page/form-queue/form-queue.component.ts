import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueueService } from 'src/app/service/queue.service';

@Component({
  selector: 'app-form-queue',
  templateUrl: './form-queue.component.html',
  styleUrls: ['./form-queue.component.scss']
})
export class FormQueueComponent implements OnInit {
  name : string = '';
  numberPlayers : number = 1;
  mode : string = 'create';
  queueId : any;
  constructor(public dialogRef: MatDialogRef<FormQueueComponent>,
    private readonly queueService : QueueService, @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { 
      this.mode = data && data.mode ? data.mode : this.mode;
      this.name = data && data.name ? data.name : this.name;
      this.queueId = data && data.queueId ? data.queueId : null;
      this.numberPlayers = data && data.numberPlayers ? data.numberPlayers : this.numberPlayers;
    }

  async ngOnInit() {
  }

  async save(){
    try {
      let queue;
      if(this.mode == 'create'){
        queue = await this.queueService.createQueue({
          titulo:this.name,
          jogadoresPorVez:this.numberPlayers
        })
      }
      else{
        queue = await this.queueService.updateQueue({
          id:this.queueId,
          titulo:this.name,
          jogadoresPorVez:this.numberPlayers
        });
      }
      this.dialogRef.close(queue);
    } catch (error) {
      this.openSnackBar('Nome da fila/Numero de jogadores é invalido','ok','snack-bar-danger');
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

  generateId(){
    return Math.floor(Math.random() * 99999 + 1)
  }

}
