import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})

export class InfoModalComponent {
  readonly dialogRef = inject(MatDialogRef);

  close(): void {
    this.dialogRef.close();
  }
}
