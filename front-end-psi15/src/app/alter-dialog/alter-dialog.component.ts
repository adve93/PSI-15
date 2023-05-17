import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-alter-dialog',
  templateUrl: './alter-dialog.component.html',
  styleUrls: ['./alter-dialog.component.css']
})
export class AlterDialogComponent {


  quantity = 0;

  constructor(
    public dialogRef: MatDialogRef<AlterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemKey: string }
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.dialogRef.close(this.quantity);
  }
}
