import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/providers/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import { UserRequest } from '../../../shared/interfaces/user-request.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('test@test.com',
      [
        Validators.required,
        Validators.email,
      ]),
    password: new FormControl('193978777Zaq',
      [
        Validators.required,
      ]),
    rememberMe: new FormControl<boolean>(false)
  });

  submitted = false;
  auth = inject(AuthService);
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  message : string = '';
  greenText: boolean = false;

  ngOnInit() {
    this.subscribeToQueryParams();
  }

  submit() {
    if(this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user: Omit<UserRequest, 'name'> = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    }

    this.login(user);
  }

  login(user: Omit<UserRequest, 'name'>) {
    const rememberMe: boolean = !!this.form.value.rememberMe;
    this.auth.login(user, rememberMe)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.form.reset();
          this.#router.navigate(['home']);
          this.submitted = true;
        },
        error: () => {
          this.submitted = false;
        }
      })
  }

  subscribeToQueryParams() {
    this.#activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: Params) => {
        if(params['loginAgain']) {
          this.message = 'The session has expired. Please, login again';
        }
        if(params['registration']) {
          this.greenText = true;
          this.message = 'You successfully registered! Please login.';
        }
      })
  }
}
