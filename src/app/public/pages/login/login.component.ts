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
    password: new FormControl('123Zaq',
      [
        Validators.required,
      ]),
    rememberMe: new FormControl<boolean>(false),
  });

  auth: AuthService = inject(AuthService);
  #router: Router = inject(Router);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  destroyRef: DestroyRef = inject(DestroyRef);
  message : string = '';
  submitted: boolean = false;
  greenText: boolean = false;

  ngOnInit(): void {
    this.subscribeToQueryParams();
  }

  submit(): void {
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

  login(user: Omit<UserRequest, 'name'>): void {
    const rememberMe: boolean = !!this.form.value.rememberMe;
    this.auth.login(user, rememberMe)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (): void => {
          this.form.reset();
          this.#router.navigate(['home']);
          this.submitted = true;
        },
        error: (): void => {
          this.submitted = false;
        }
      })
  }

  subscribeToQueryParams(): void {
    this.#activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: Params): void => {
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
