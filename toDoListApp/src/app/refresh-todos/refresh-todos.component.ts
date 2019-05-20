import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-refresh-todos',
  templateUrl: './refresh-todos.component.html',
  styleUrls: ['./refresh-todos.component.css']
})
export class RefreshTodosComponent implements OnInit {

  @Output() update = new EventEmitter<string>();
  
  @Input() todosLength: number;
  

  constructor() { }

  ngOnInit() {
    
  }

  refresh(){
    this.update.emit('update');
  }

  eraseAll(){
    

    this.update.emit('eraseAll');
    
  }

}
