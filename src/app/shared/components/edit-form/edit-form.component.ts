import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/services/auth.service';
import { User } from '../../interfaces/user.interfaces';
import { UserService } from '../../providers/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  destroyRef: DestroyRef = inject(DestroyRef);
  submitted: boolean = false;
  user: User | null = null;
  ngOnInit() {
    this.patchValueToForm();
  }
  patchValueToForm() {
    this.userService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User | null): void => {
          this.user = user;
          this.form.patchValue({
            name: this.user?.name,
          });
        }
    });
  }
  saveInfoUserInFirebase(): void {
    const newName: string = this.user!.name = this.form.value.name ?? '';
    this.userService.updateUserName(newName).subscribe({
      next: (): void => {
        this.close();
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
