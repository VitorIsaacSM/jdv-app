import { BehaviorSubject } from 'rxjs';
import { GetIdService } from './get-id.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameStatus } from '../game/gameStatus';
import { URL_SERVER } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class JogoOfflineService {

  private estadoSubject = new BehaviorSubject<GameStatus>(null); 
  currentEstado = this.estadoSubject.asObservable();

  constructor(private http: HttpClient) { }
  
  iniciaJogo(id: string, dificuldade: number){
    let session = window.localStorage.getItem('session');
    return this.http.post( URL_SERVER + '/offline/start', {user:{id : id, session : session}, dificuldade: dificuldade});
  }

  realizaJogada(id:string, x:string, y:string){
    console.log(id);
    return this.http.post(URL_SERVER + '/offline/'+id, {x : x, y : y});
  }

  vezDoOponente(id: string){
    return this.http.post(URL_SERVER + '/offline/bot/'+id, {});
  }

  destroiJogo(id: string){
    return this.http.delete(URL_SERVER + '/offline/delete/'+id, {});
  }
}
