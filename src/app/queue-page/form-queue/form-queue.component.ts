import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-queue',
  templateUrl: './form-queue.component.html',
  styleUrls: ['./form-queue.component.scss']
})
export class FormQueueComponent implements OnInit {
  name : string = '';
  constructor(public dialogRef: MatDialogRef<FormQueueComponent>) { }

  ngOnInit(): void {
  }

  save(){
    this.dialogRef.close({
      id:this.generateId(),
      name:this.name,
      users:[]
    });
  }

  generateId(){
    return Math.floor(Math.random() * 99999 + 1)
  }

}
