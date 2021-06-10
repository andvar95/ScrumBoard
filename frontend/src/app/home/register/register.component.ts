import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerData:any;
  public successMessage:String;
  public errorMessage:String;

  constructor(private authservice:AuthService, private router:Router) { 
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {

  
  }

  registerUser(){
    if( !this.registerData.name ||
      !this.registerData.email||
      !this.registerData.password){
        console.log("Error: Incomplete data")
        this.errorMessage = "Error: Incomplete data";
      }
      else{
    this.authservice.registerUser(this.registerData).subscribe(
      (res)=>{
        console.log(res);
        this.successMessage = "Register User Successfully"
      },
      (err)=>{
        console.log(err);
        this.errorMessage = err.error;
      }
    )
      }
 this.closeAlert(5000)
  }

  closeAlert(time:number){
    setTimeout(()=>{
      this.errorMessage = '';
      this.successMessage =  '';
    },time)

  }

}
