import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { toDo } from '../to-do/toDo';

@Injectable({
  providedIn: 'root'
})
export class GetTodosService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<toDo[]>{
    return this.http.get<toDo[]>('http://localhost:3000/getTodos');
  }

  addTodo(todo: toDo): Observable<toDo>{
    return this.http.post<toDo>('http://localhost:3000/addTodo', todo);
  }

  refreshTodos(todos: toDo[]){
    return this.http.post<toDo[]>('http://localhost:3000/refresh', todos);
  }

}
