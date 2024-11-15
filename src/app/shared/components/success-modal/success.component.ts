import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})

export class SuccessModalComponent {
  readonly dialogRef = inject(MatDialogRef);

  close(): void {
    this.dialogRef.close();
  }
}
