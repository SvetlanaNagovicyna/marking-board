import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reason-modal',
  templateUrl: './reason-modal.component.html',
  styleUrls: ['./reason-modal.component.scss']
})
export class ReasonModalComponent {

  dialogRef = inject(MatDialogRef);
  data: { title: string, subtitle: string } = inject(MAT_DIALOG_DATA);

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
