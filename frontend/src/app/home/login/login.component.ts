import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData:any;
  public errorMessage:String;


  constructor(private auth:AuthService, private router:Router) { 
    this.loginData = {}
    this.errorMessage = ''
  }

  login(){

    if(!this.loginData.email || !this.loginData.password){
      console.log("Failed process: incomplete ata")

      this.errorMessage = "Failed process: incomplete ata"

      this.closeAlert(5000)
      this.loginData = {}
    }else{
      this.auth.login(this.loginData).subscribe(
        (res:any)=>{
          console.log(res)
         localStorage.setItem('token',res.jwtToken)
         this.loginData = {}
         this.router.navigate(['/listTask'])
       

        },
        (err)=>{
          console.log(err)
         this.errorMessage = err.error;
         this.loginData = {}
        }
      )
    }

  }



  ngOnInit(): void {
  }


  closeAlert(time:number){
    setTimeout(()=>{
      this.errorMessage = '';
    },time)

  }

}
