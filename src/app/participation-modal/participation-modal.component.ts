import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-participation-modal',
  templateUrl: './participation-modal.component.html',
  styleUrl: './participation-modal.component.css'
})
export class ParticipationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ParticipationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public date: {title: string, message: string}
    ) { }

    closeDialog() {
      this.dialogRef.close();
    }
}
