import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ITask } from '../model/Task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm !:FormGroup;
  tasks: ITask[] = [];
  inProgress: ITask[] =[];
  done : ITask[]=[];
  updateIndex!:any
  isEditEnabled:boolean=false;


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item:['',Validators.required]
    })
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];


  addTask(){
    this.tasks.push({
      description: this.todoForm.value.item,
      done:false
    })

    this.todoForm.reset();
  }


  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deleteTask(i:number){
    this.tasks.splice(i,1);
  }

  deleteInProgress(i:number){
    this.inProgress.splice(i,1);
  }

  deleteInDone(i:number){
    this.done.splice(i,1);
  }

  onEdit(item:ITask,i:number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex=i;
    this.isEditEnabled = true;

  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;

  }

}
