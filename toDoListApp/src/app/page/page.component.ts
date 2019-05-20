import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { toDo } from '../to-do/toDo';
import { GetTodosService } from '../services/get-todos.service';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  todos: toDo[] = [];
  isFine = false;
  route: string;

  constructor(
    private service: GetTodosService, 
    private loginService: LoginService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
    
    ) { }

  ngOnInit() {

    this.route = this.activatedRoute.snapshot.params.username;
    this.loginService.checkToken().subscribe(
      (user : any) => {
        if(this.route != user.name){
          this.router.navigate(['']);
        }
        else{
          this.isFine = true;
        }
      } ,
      err => {
        console.log(err);
        this.router.navigate(['']);
      }
    )

    setTimeout(() => {
      this.service.getTodos().subscribe(todos => { this.todos = todos});
      console.log(this.todos);
    }, 500);
    
  }

  
  updateList(param : string){
    if(param == 'update') {
      console.log('refreshed');
      this.service.refreshTodos(this.todos).subscribe( (todos) => {
        this.todos = todos;
      });
    }
    else {
      this.service.eraseAllTodos().subscribe(() => {
        this.todos = [];
      });
    }
    window.scrollTo(0,0);
  }

  addTodo(todo: toDo){
    console.log(todo);
    this.service.addTodo(todo).subscribe( (todos) => {
      this.todos = todos;
    })
  }

  checkBox(todo: toDo){
    setTimeout(() => {
      this.todos[todo.index - 1] = todo;
      console.log(this.todos);
    }, 100);
  }

}
