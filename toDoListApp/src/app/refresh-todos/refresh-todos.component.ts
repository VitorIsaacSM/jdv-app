import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { toDo } from '../to-do/toDo';
import { GetTodosService } from '../services/get-todos.service';

@Component({
  selector: 'app-refresh-todos',
  templateUrl: './refresh-todos.component.html',
  styleUrls: ['./refresh-todos.component.css']
})
export class RefreshTodosComponent implements OnInit {

  @Output() update = new EventEmitter<string>();
  
  constructor(private service: GetTodosService) { }

  ngOnInit() {
    
  }

  refresh(){
    this.update.emit('atualiza ae meu parcero');
  }

}
