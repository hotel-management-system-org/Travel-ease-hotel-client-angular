import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CookieManager {
   constructor(private cookieService:CookieService, private router:Router) {
   }

   public set(token:string, name:string):void {
      const expires = new Date();
      expires.setHours(new Date().getHours() + 9);
      this.cookieService.set(name, token, expires,'/');
   }

   public tokenExists(name:string):boolean {
     return this.cookieService.check(name);
   }

   public clearToken(name:string):void {
      if(this.tokenExists(name)){
          this.cookieService.delete(name);
      }
   }

   public clearAll(){
     this.cookieService.getAll()
   }

   public getToken(name:any){
     return this.cookieService.get(name);
   }

   public tokenExistsWithPromise(name:any):Promise<boolean> {
     return new Promise((resolve,reject)=>{
       try {
         const exists = this.cookieService.check(name);
         resolve(exists);
       }catch (error){
         reject(error);
       }
     })
   }
}
