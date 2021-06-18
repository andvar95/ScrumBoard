import { Injectable } from '@angular/core';
import {HttpClient, HttpInterceptor } from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private http:HttpClient, private authservice:AuthService) { }

 intercept(req:any,next:any){
     const token = req.clone({
         setHeaders:{
             Authorization:'Bearer '+this.authservice.getToken()
         }
     })
     return next.handle(token);
 }

}
