import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { toDo } from '../to-do/toDo';
import { GetTodosService } from '../services/get-todos.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  @Input()todos: toDo[];

  @Output() passTodoUp = new EventEmitter<toDo>();

  constructor() { }

  ngOnInit() {
    
  }

  updateList(todo : toDo){
    this.passTodoUp.emit(todo);
  }

}
