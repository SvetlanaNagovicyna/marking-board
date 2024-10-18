import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/providers/services/auth.service";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UserRequest } from '../../../shared/interfaces/user-request.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  form = new FormGroup({
      name: new FormControl('',
        [
          Validators.required,
        ]),
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
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
    {validators: this.passwordMatchValidator()}
  );

  auth: AuthService = inject(AuthService);
  #router: Router = inject(Router);
  destroyRef: DestroyRef = inject(DestroyRef);
  isLoading: boolean = false;

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password: AbstractControl<string, string> | null = control.get('password');
      const confirmPassword: AbstractControl<string, string> | null = control.get('confirmPassword');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({mismatch: true});
        return {mismatch: true};
      } else {
        confirmPassword?.setErrors(null);
        return null;
      }
    };
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const user: UserRequest = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
      name: this.form.value.name ?? '',
    }

    this.singUp(user);
  }

  singUp(user: UserRequest): void {
    this.isLoading = true;

    this.auth.singUp(user)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (): void => {
          this.form.reset();
          this.#router.navigate(['login'], {
            queryParams: {
              registration: true,
            }
          });
        }
      });
  }
}
