import { BehaviorSubject } from 'rxjs';
import { GetIdService } from './get-id.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameStatus } from '../game/gameStatus';

@Injectable({
  providedIn: 'root'
})
export class JogoOnlineService {

  private estadoSubject = new BehaviorSubject<GameStatus>(null); 
  currentEstado = this.estadoSubject.asObservable();

  constructor(private http: HttpClient) { }

  realizaJogada(id:string, x:string, y:string){
    console.log(id);
    return this.http.post('http://localhost:8080/jdv/api/online/'+id, {x : x, y : y});
  }

  destroiJogo(id: string){
    return this.http.post('http://localhost:8080/jdv/api/online/delete/'+id, {});
  }
}
