import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterDto} from '../../../dto/register.dto';
import {Auth} from '../../../services/auth/auth';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class Register {

  registerDto: RegisterDto| undefined;
  authService = inject(Auth);
  router= inject(Router);

  form = new FormGroup({
    email: new FormControl('',
      [Validators.email,Validators.required,
        Validators.minLength(3)]),

    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[@&$])[A-Za-z0-9@&$]{6,}$/),
      Validators.pattern(/^\S*$/)
    ]),

    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[A-Za-z]+$/)
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[A-Za-z]+$/)
    ]),

    contact: new FormControl('',
      [Validators.required,
        Validators.minLength(10)]),

  })

  register(){
    const firstName = this.form.value.firstName?.trim() || '';
    const lastName = this.form.value.lastName?.trim() || '';
    const email = this.form.value.email?.trim() || '';
    const password = this.form.value.password?.trim() || '';
    const contact = this.form.value.contact?.trim() || '';

    this.registerDto = {
      firstName,
      lastName,
      email,
      password,
      contact
    };

    this.authService.register(this.registerDto).subscribe(res =>
      {this.router.navigateByUrl('/security/register-verification/'+this.form.value.email?.trim());
      },error => {
      console.log(error);
      }
    )

  }

}
