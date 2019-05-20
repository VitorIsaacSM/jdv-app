import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { toDo } from '../to-do/toDo';

let URL = 'http://localhost:3000';
let URL2 = 'https://angular-todo-list-app.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class GetTodosService {

  constructor(private http: HttpClient) {
   }

  getTodos(): Observable<toDo[]>{
    let token = window.localStorage.getItem('token');
    return this.http.post<toDo[]>( URL + '/getTodos', {token: token});
  }

  addTodo(todo: toDo): Observable<toDo[]>{
    let token = window.localStorage.getItem('token');
    return this.http.post<toDo[]>( URL + '/addTodo', {todo: todo, token: token});
  }

  refreshTodos(todos: toDo[]): Observable<toDo[]>{
    let token = window.localStorage.getItem('token');
    return this.http.post<toDo[]>( URL + '/refresh', {todos: todos, token: token});
  }

  eraseAllTodos(){
    let token = window.localStorage.getItem('token');
    let todos : toDo[] = []
    return this.http.post<toDo[]>( URL + '/erase', {todos: todos, token: token});
  }

}
