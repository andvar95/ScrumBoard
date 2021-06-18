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
  public errorMessage:String;

  constructor(private authservice:AuthService, private router:Router) { 
    this.registerData = {};

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
      (res:any)=>{
        console.log(res);
        localStorage.setItem('token',res.jwtToken)
        this.registerData = {}
        this.router.navigate(['/saveTask'])
       
      },
      (err)=>{
        console.log(err);
        this.registerData = {}
        this.errorMessage = err.error;
      }
    )
      }
 this.closeAlert(5000)
  }

  closeAlert(time:number){
    setTimeout(()=>{
      this.errorMessage = '';
    },time)

  }

}
