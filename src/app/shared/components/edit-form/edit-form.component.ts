import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../providers/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})

export class EditFormComponent {
  data: {name: string} = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef);
  userService: UserService = inject(UserService);
  isLoading: boolean = false;

  form = new FormGroup({
      name: new FormControl(this.data.name,
        [
          Validators.required,
        ]),
    }
  );

  saveInfoUserInFirebase(): void {
    this.isLoading = true;

    const newName: string = this.form.value.name ?? '';

    this.userService.updateUserData({name: newName})
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (): void => {
          this.close();
        }
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
