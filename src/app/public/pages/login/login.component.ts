import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/interfaces/user.interfaces";
import {AuthService} from "../../../shared/ providers/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnInit {

  form: FormGroup;
  submitted = false;
  // auth = inject(AuthService)
  #router = inject(Router)

  constructor(
    public auth: AuthService
  ) {}


  ngOnInit() {
    this.form = new FormGroup({
        email: new FormControl(null,
          [
            Validators.required,
            Validators.email,
          ]),
        password: new FormControl(null,
          [
            Validators.required,
            // Validators.minLength(6),
            // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$'),
          ]),

    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }
    // console.log(this.form)
    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.#router.navigate(['home']);
      this.submitted = true;
    }, () => {
      this.submitted = false;
    })
  }
}
