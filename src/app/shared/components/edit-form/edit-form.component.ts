import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/services/auth.service';
import { User } from '../../interfaces/user.interfaces';
import { UserService } from '../../providers/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  form = new FormGroup({
      name: new FormControl('',
        [
          Validators.required,
        ]),
    }
  );

  auth: AuthService = inject(AuthService);
  readonly dialogRef = inject(MatDialogRef);
  userService: UserService = inject(UserService);
  user: User | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    this.patchValueToForm();
  }

  patchValueToForm() {
    this.user = this.userService.user$.getValue();
    this.form.patchValue({
      name: this.user?.name,
    });
  }

  saveInfoUserInFirebase(): void {
    if (!this.user?.name) return;

    this.isLoading = true;

    const newName: string = this.user.name = this.form.value.name ?? '';
    this.userService.updateUserName(newName).subscribe({
      next: (): void => {
        this.isLoading = false;
        this.close();
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
