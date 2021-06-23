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

  constructor(private boardservice: BoardService, private router: Router) {
    this.taskData = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  saveTask() {

    if (!this.taskData.name || !this.taskData.description) {
      this.errorMessage = 'Error: data incomplete';
      this.closeAlert(5000);
    } else {
     
      this.boardservice.saveTask(this.taskData).subscribe(
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
