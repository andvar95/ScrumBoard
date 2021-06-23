import { Component, OnInit } from '@angular/core';
import { BoardService } from "../../services/board.service";
import {Router} from "@angular/router"

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  public successMessage:String;
  public errorMessage:String;
  public tasksData:any;

  constructor(private boardservice:BoardService, private router:Router) { 
    this.successMessage = ""
    this.errorMessage = ""
    this.tasksData = {}
  }

  ngOnInit(): void {

    this.boardservice.listTask().subscribe(
      (res:any)=>{
        this.tasksData = res.board;
      },(err)=>{
        this.errorMessage = err.error;
        this.closeAlert(5000)
      }
    )
  }

  updateTask(task:any,status:String){
    const prevStatus = task.status;
    task.status = status
    this.boardservice.updateTask(task).subscribe(
      (res)=>{
        task.status = status
      },(err)=>{
        task.status = prevStatus
        this.errorMessage = err.errror;
        this.closeAlert(5000);
      }

    )
  }

  deleteTask(task:any){
    
   
    this.boardservice.deleteTask(task).subscribe(
      (res:any)=>{
        console.log(res)

        const index = this.tasksData.indexOf(task);

        if(index>-1){
          this.tasksData.splice(index,1)
        }
        
        this.successMessage = res.message
        this.closeAlert(5000)
      
      },(err)=>{
        console.log(err)
        this.errorMessage = err.error
        this.closeAlert(5000)
   
      }
    )

    
  }

  closeAlert(time:number){
    setTimeout(()=>{
      this.errorMessage = '';
      this.successMessage = "";
    },time)

  }

}
