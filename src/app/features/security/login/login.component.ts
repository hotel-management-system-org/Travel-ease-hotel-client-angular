import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Auth} from '../../../services/auth/auth';
import {LoginDto} from '../../../dto/login.dto';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  imports: [
    MatIcon,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login {
  showStatus: boolean = false;
  loginDto: LoginDto | undefined;
  authService = inject(Auth);
  cookieService = inject(CookieService);
  router= inject(Router);

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[@&$])[A-Za-z0-9@&$]{6,}$/),
      Validators.pattern(/^\S*$/)]),
  });

  login(){
    const email = this.form.value.email?.trim() || '';
    const password = this.form.value.password?.trim() || '';

     this.loginDto = {
      email,
      password
    };

    this.authService.login(
     this.loginDto
    ).subscribe(res => {
      console.log(res.data.accessToken);
     this.cookieService.set('token', res?.data?.accessToken);
    },error => {
      console.log(error);
    })
  }

  togelUp() {
    this.showStatus = !this.showStatus;
  }
}
