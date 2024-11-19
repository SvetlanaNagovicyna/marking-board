import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReasonModalData } from '../../../shared/interfaces/reason-modal-data.interface';

@Component({
  selector: 'app-reason-modal',
  templateUrl: './reason-modal.component.html',
  styleUrls: ['./reason-modal.component.scss']
})
export class ReasonModalComponent {

  dialogRef = inject(MatDialogRef);
  data: { text: ReasonModalData } = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
      text: new FormControl('',
        [
          Validators.required,
        ]),
    }
  );

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.text);
    }
  }

}
