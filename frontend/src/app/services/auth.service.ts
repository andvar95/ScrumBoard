import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:String;

  constructor(private http:HttpClient, private router : Router) { 
    this.baseUrl = environment.APP_URL;
  }

registerUser(user:any){
  return this.http.post(this.baseUrl+"user/RegisterUser",user)
}
  login(user:any){
    return this.http.post(this.baseUrl+"auth/login",user)

}

loguedIn(){
   return !!localStorage.getItem('token');
}
    
    getToken(){
    return localStorage.getItem('token');
    }

    logout(){
      localStorage.removeItem('token')
      this.router.navigate(["/login"]);
    }

}
