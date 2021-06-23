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

  updateTask(Task:any,status:String){}

  deleteTask(Task:any){}

  closeAlert(time:number){
    setTimeout(()=>{
      this.errorMessage = '';
      this.successMessage = "";
    },time)

  }

}
