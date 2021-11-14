import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
 private showAddTask: boolean = false;
 private subject = new Subject<any>();
  
 constructor() { }


 toggleAddTask(): void {
  this.showAddTask = !this.showAddTask;
  // cada vez que cambie al opposite lo almaceno también
  this.subject.next(this.showAddTask);
 }

 onToggle():Observable<any>{
   return this.subject.asObservable();
 }
}
