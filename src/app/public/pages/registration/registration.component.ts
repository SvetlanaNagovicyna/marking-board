import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {User} from "../../../shared/interfaces/user.interfaces";
import {AuthService} from "../../../shared/providers/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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


  submitted = false;
  auth = inject(AuthService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  message : string = '';
  isChecked: boolean = false;

  ngOnInit(): void {
  }

  // passwordMatchValidator( control: AbstractControl) {
  //   console.log(control)
  //   return control.get('password')?.value === control.get('confirmPassword')?.value
  //     ? null
  //     : {'mismatch': true};
  // }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
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

  submit() {

    console.log(this.form)

    if(this.form.invalid) {
      return
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
      name: this.form.value.name ?? '',
    }

    this.auth.singUp(user, this.isChecked).subscribe({
      next: () => {
        this.form.reset();
        this.#router.navigate(['login']);
        this.submitted = true;
      },
      error: () => {
        this.submitted = false;
      }
    })

  }
}
