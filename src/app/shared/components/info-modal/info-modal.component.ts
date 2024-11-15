import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {

  readonly dialogRef = inject(MatDialogRef);
  data: { modal: string } = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
      text: new FormControl('',
        [
          Validators.required,
        ]),
    }
  );

  submit() {
    this.dialogRef.close(this.form.value.text);
  }

}
