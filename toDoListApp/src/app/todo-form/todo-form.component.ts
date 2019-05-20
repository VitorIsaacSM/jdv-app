import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { toDo } from '../to-do/toDo';
import { GetTodosService } from '../services/get-todos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


let timer;

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  @Output() added = new EventEmitter<toDo>();

  addTodoForm : FormGroup;

  constructor(private service: GetTodosService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.addTodoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(40)]],
      desc: ['', Validators.required],
      date: ['']
    })
  }

  addTodo(){

    const title = this.addTodoForm.get('title').value;
    const description = this.addTodoForm.get('desc').value;
    const limit = this.addTodoForm.get('date').value;

    console.log('adicionando a tarefa: '+ title);

    let todo : toDo = {
      title: title,
      description: description,
      limit: limit,
      isDone: false,
      index: 0
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      //this.service.addTodo(todo).subscribe(todo => console.log(todo));
      this.added.emit(todo);
      this.addTodoForm.reset();
      window.scrollTo(0,0);
    }, 500);
  }

}
