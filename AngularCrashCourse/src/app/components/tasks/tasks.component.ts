import { Component, OnInit } from '@angular/core';
import { TASKS } from 'src/app/helpers/dummyData';
import { Task } from 'src/app/interfaces/Task.interface';
import { TaskService } from 'src/app/services/task.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:Task[] = [];
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
    deleteTask(task:Task){
      this.taskService
      .deleteTask(task)
      .subscribe( () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      })
    }

    toggleReminder(task:Task){
      task.reminder = !task.reminder;
      this.taskService.updateTaskReminder(task)
      .subscribe( () => {})
    }

    addTask(task:Task){
      this.taskService.addTask(task)
      .pipe(
        catchError((error) => {
          console.log(error,'en el catch');
          return of(null);
        })
      )
      .subscribe( (task) => {
        task && this.tasks.push(task)
      })
    }
}
