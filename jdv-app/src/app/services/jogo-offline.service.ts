import { BehaviorSubject } from 'rxjs';
import { GetIdService } from './get-id.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameStatus } from '../game/gameStatus';

@Injectable({
  providedIn: 'root'
})
export class JogoOfflineService {

  private estadoSubject = new BehaviorSubject<GameStatus>(null); 
  currentEstado = this.estadoSubject.asObservable();

  constructor(private http: HttpClient) { }
  
  iniciaJogo(id: string){
    let session = window.localStorage.getItem('session');
    return this.http.post('http://localhost:8080/jdv/api/offline/start', {id : id, session : session});
  }

  realizaJogada(id:string, x:string, y:string){
    console.log(id);
    return this.http.post('http://localhost:8080/jdv/api/offline/'+id, {x : x, y : y});
  }

  vezDoOponente(id: string){
    return this.http.post('http://localhost:8080/jdv/api/offline/bot/'+id, {});
  }

  destroiJogo(id: string){
    return this.http.post('http://localhost:8080/jdv/api/offline/delete/'+id, {});
  }
}
