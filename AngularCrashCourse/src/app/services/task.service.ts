import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { TASKS } from '../helpers/dummyData';
import { Task } from '../interfaces/Task.interface';



const httpOptions= {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private httpClient: HttpClient) { }

/*   getTasks():Observable<Task[]>{
    return of(TASKS);
  } */
  
  getTasks():Observable<Task[]>{
    return this.httpClient.get<Task[]>(this.apiUrl)
  }
  
  deleteTask(task:Task):Observable<Task>{
    return this.httpClient.delete<Task>(`${this.apiUrl}/${task.id}`);
  }  

  updateTaskReminder(task:Task):Observable<Task>{
    return this.httpClient.put<Task>(`${this.apiUrl}/${task.id}`,task,httpOptions)
  }

 addTask(task:Task):Observable<Task>{
   return this.httpClient.post<Task>(`${this.apiUrl}`,task,httpOptions);
 } 

}
