import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {
  tittle : string = '';
  message : string = '';
  constructor( public dialogRef: MatDialogRef<ModalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.tittle = data.tittle;
      this.message = data.message;
    }

  ngOnInit(): void {
  }

  confirmation(){
    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
