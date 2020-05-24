import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { STATE, ANSWER } from '../interfaces/interface';

export interface DialogData {
  state:number,
  text:string
}



@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  
  public StateEnum = STATE;
  public AnswerEnum = ANSWER;
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


    onNoClick(): void {
      this.dialogRef.close();
    }

}
