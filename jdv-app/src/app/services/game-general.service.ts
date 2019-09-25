import { JogoOfflineService } from './jogo-offline.service';
import { HttpClient } from '@angular/common/http';
import { GameStatus } from './../game/gameStatus';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameGeneralService {

  initialStatus : GameStatus = {
    estadoDoJogo: 0,
    tipo: "0",
    jogadorTurno : false,
    jogadorSimbolo : false,
    serverValue : 0,
    jogo: [['0','0','0'],['0','0','0'],['0','0','0']],
    winningSquares: [],
    playerId: "-1",
    jogadorValue: 0,
    dificuldade: 0
  };

  private statusSource = new BehaviorSubject<GameStatus>(this.initialStatus);
  currentStatus = this.statusSource.asObservable();

  constructor(private http: HttpClient, private offline:JogoOfflineService) { }

  changeStatus(newStatus : GameStatus){
    this.statusSource.next(newStatus);
  }

  resetStatus(){
    this.statusSource.next(this.initialStatus);
  }

}
