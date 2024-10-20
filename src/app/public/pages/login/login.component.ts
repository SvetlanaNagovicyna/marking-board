import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/providers/services/auth.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UserRequest } from '../../../shared/interfaces/user-request.interface';
import { finalize } from 'rxjs';
import { LoaderService } from '../../../shared/providers/services/loader.service';

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
  loaderService: LoaderService = inject(LoaderService);
  message: string = '';
  greenText: boolean = false;
  showLoader: boolean = false;

  ngOnInit(): void {
    this.loaderService.hideLoader();
    this.subscribeToQueryParams();
  }

  submit(): void {
    if (this.form.invalid) return;

    const user: Omit<UserRequest, 'name'> = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
      rememberMe: this.form.value.rememberMe ?? false,
    }

    this.login(user);
  }

  login(user: Omit<UserRequest, 'name'>): void {
    this.showLoader = true;

    this.auth.login(user)
      .pipe(
        finalize(() => {
          this.showLoader = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (): void => {
          this.form.reset();
          this.#router.navigate(['home']);
        }
      })
  }

  subscribeToQueryParams(): void {
    this.#activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: Params): void => {
        if (params['loginAgain']) {
          this.message = 'The session has expired. Please, login again';
        }
        if (params['registration']) {
          this.greenText = true;
          this.message = 'You successfully registered! Please login.';
        }
      })
  }
}
