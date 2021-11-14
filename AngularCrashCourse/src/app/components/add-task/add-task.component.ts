import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/Task.interface';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  
  @Output() onAddTask:EventEmitter<Task> = new EventEmitter();
  // recuerda que hay muchas formas de tratar un formulario.Esta es la sencilla con [(ngModel)]
  text: string="";
  day: string="";
  reminder:boolean = false;
  showAddTask!:boolean;
  subscription!:Subscription;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService
    .onToggle()
    .subscribe((value:boolean) => this.showAddTask = value)
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.text){
      alert("Please,add a task...")
      return;
    }
    const newTask = {
      text:this.text,
      day:this.day,
      reminder:this.reminder,
    }
    // we emit the submit to the parent again
    this.onAddTask.emit(newTask);

    this.text = "";
    this.day = "";
    this.reminder = false;
  }
  
}
