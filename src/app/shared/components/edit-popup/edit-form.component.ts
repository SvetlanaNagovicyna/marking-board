import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../providers/services/auth.service';
import { User } from '../../interfaces/user.interfaces';
import { UserService } from '../../providers/services/user.service';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  form = new FormGroup({
      name: new FormControl('',
        [
          Validators.required,
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$'),
        ]),
      confirmPassword: new FormControl('',
        [
          Validators.required,
        ]),
    },
    {validators: this.passwordMatchValidator() }
  );

  auth = inject(AuthService);
  userService = inject(UserService);

  submitted = false;
  user: User | null = null;
  isShowForm: boolean = false;
  updatedUser: User = {};

  ngOnInit() {
    this.userService.user$.subscribe({
      next: (user) => {
        this.user = user;
        this.form.patchValue({
          name: this.user?.name
        });
      }
    });

    this.userService.isShowForm$.subscribe((value) => {
      this.isShowForm = value;
    });

  }


  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        confirmPassword?.setErrors(null);
        return null;
      }
    };
  }


  saveInfoUserInFirebase() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    this.isShowForm = false;
    this.userService.setShowForm(false);

    let idDb = localStorage.getItem('userId') ?? '';
    if (idDb) {
      this.userService.getUserById(idDb).subscribe({
        next: (response: User) => {
          this.updatedUser = {
            ...response,
            name: this.form.value.name ?? '',
            password: this.form.value.password ?? ''
          }
          this.userService.updateUserInfo(idDb, this.updatedUser).subscribe({
              next: () => {
                this.userService.isShowForm$.subscribe({
                  next: () => {
                    console.log('User info updated');
                  }
                })
            }
          })
        }
      })
    }
  }

}
