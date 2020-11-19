import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QueueService } from 'src/app/service/queue.service';

@Component({
  selector: 'app-form-queue',
  templateUrl: './form-queue.component.html',
  styleUrls: ['./form-queue.component.scss']
})
export class FormQueueComponent implements OnInit {
  name : string = '';
  constructor(public dialogRef: MatDialogRef<FormQueueComponent>,
    private readonly queueService : QueueService) { }

  async ngOnInit() {
  }

  async save(){
    const queue = await this.queueService.createQueue({
      titulo:this.name
    })
    this.dialogRef.close(queue);
  }

  generateId(){
    return Math.floor(Math.random() * 99999 + 1)
  }

}
