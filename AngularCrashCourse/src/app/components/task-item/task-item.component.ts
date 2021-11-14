import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/Task.interface';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input("task") task!:Task;
  @Output()  onDeleteTask:EventEmitter<Task> = new EventEmitter();
  @Output() onToogleReminder:EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(task:Task){
    this.onDeleteTask.emit(task);
  }

  onToggle(task:Task) {
    this.onToogleReminder.emit(task);
  }

}
