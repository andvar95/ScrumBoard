import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseUrl:String;

  constructor(private http:HttpClient) { 
    this.baseUrl = environment.APP_URL;
  }

saveTask(task:any){
  return this.http.post(this.baseUrl+"board/saveTask",task)
}

listTask(){
  return this.http.get(this.baseUrl+"board/listTask")
}

}
