import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegisterDto} from '../models/register.dto';
import {LoginDto} from '../models/login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl+'/user-service/api/users/visitors';
  http = inject(HttpClient)

  public register(dto:RegisterDto):Observable<any>{
    return this.http.post(this.baseUrl+'/signup',{
      firstName:dto.firstName,
      lastName:dto.lastName,
      email:dto.email,
      password:dto.password,
      contact:dto.contact
    });
  }

  public login(dto:LoginDto):Observable<any>{
    return this.http.post(this.baseUrl+'/login',{
      email:dto.email,
      password:dto.password,
    });
  }

  public verify(otp:any,email:any):Observable<any>{
    return this.http.post(this.baseUrl+'/verify-email?email='+email+'&otp='+otp,{})
  }

}
