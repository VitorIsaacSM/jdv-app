import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { toDo } from './toDo';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  @Input() todo: toDo;

  @Output() boxClick = new EventEmitter<toDo>();
  constructor() { }

  ngOnInit() {
    this.todo.isDone = false;
  }

  log(){
    setTimeout(() => {
      this.boxClick.emit(this.todo);
    }, 100);

  }

}
