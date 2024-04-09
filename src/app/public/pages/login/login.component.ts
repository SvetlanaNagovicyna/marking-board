import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/interfaces/user.interfaces";
import {AuthService} from "../../../shared/ providers/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnInit {

  form = new FormGroup({
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

  });



  submitted = false;
  auth = inject(AuthService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  message : string = '';
  isChecked: boolean = false;




  ngOnInit() {

    this.#route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this.message = 'The session has expired. Please, login again'
      }
    })
    console.log(this.form)

  }


  submit() {
    if(this.form.invalid) {
      return
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    }

    this.auth.login(user, this.isChecked).subscribe({
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
}
