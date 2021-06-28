import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: String;
  public selectedFile:any;

  constructor(private boardservice: BoardService, private router: Router) {
    this.taskData = {};
    this.errorMessage = '';
    this.selectedFile=null;
  }

  ngOnInit(): void {}

  uploadImg(event:any){
    console.log(<File>event.target.files[0])
    this.selectedFile = <File>event.target.files[0];
  }

  saveTask() {

    const data = new FormData();

    if(this.selectedFile && this.selectedFile.name) {
      data.append("image",this.selectedFile,this.selectedFile.name)
     
    }
  

      data.append("name",this.taskData.name)
      data.append("description",this.taskData.description)
   
 

      

    if (!this.taskData.name || !this.taskData.description) {
      this.errorMessage = 'Error: data incomplete';
      this.closeAlert(5000);
    } else {

      console.log(data)
     
      this.boardservice.saveTask(data).subscribe(
        (res: any) => {
          console.log(res)
          this.taskData = {};
          this.router.navigate(['/listTask']);
        },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.error;
          this.closeAlert(5000);
        }
      );
    }
  }

  closeAlert(time: number) {
    setTimeout(() => {
      this.errorMessage = '';
    }, time);
  }
}
