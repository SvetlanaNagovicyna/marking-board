import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../providers/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent {
  form = new FormGroup({
      name: new FormControl(this.data.name,
        [
          Validators.required,
        ]),
    }
  );

  readonly dialogRef = inject(MatDialogRef);
  userService: UserService = inject(UserService);
  isLoading: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {
  }

  saveInfoUserInFirebase(): void {
    this.isLoading = true;

    const newName: string = this.form.value.name ?? '';

    this.userService.updateUserData({name: newName}).subscribe({
      next: (): void => {
        this.isLoading = false;
        this.close();
      },
      error: (): void => {
        this.isLoading = true;
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
