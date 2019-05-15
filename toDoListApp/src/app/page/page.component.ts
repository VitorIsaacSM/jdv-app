import { Component, OnInit } from '@angular/core';
import { toDo } from '../to-do/toDo';
import { GetTodosService } from '../services/get-todos.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  todos: toDo[] = [];

  constructor(private service: GetTodosService) { }

  ngOnInit() {
    this.service.getTodos().subscribe(todos => { this.todos = todos});
    console.log(this.todos);
  }


  updateList(){
    this.service.refreshTodos(this.todos).subscribe();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  checkBox(todo: toDo){
    setTimeout(() => {
      this.todos[todo.index - 1] = todo;
      console.log(this.todos);
    }, 100);
  }

}
