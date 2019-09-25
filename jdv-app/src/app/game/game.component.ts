import { ComponentCanDeactivate } from './../leave.guard';
import { GameGeneralService } from './../services/game-general.service';
import { GameStatus } from './gameStatus';
import { JogoOfflineService } from './../services/jogo-offline.service';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { GetIdService } from '../services/get-id.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, ComponentCanDeactivate {

  @ViewChild('00') id1 : ElementRef;
  @ViewChild('01') id2 : ElementRef;
  @ViewChild('02') id3 : ElementRef;
  @ViewChild('10') id4 : ElementRef;
  @ViewChild('11') id5 : ElementRef;
  @ViewChild('12') id6 : ElementRef;
  @ViewChild('20') id7 : ElementRef;
  @ViewChild('21') id8 : ElementRef;
  @ViewChild('22') id9 : ElementRef;

  localId : string;
  table = [['fw','fw','fw'],['fw','fw','fw'],['fw','fw','fw']];
  tipoDeJogo = '';
  estado = false;
  currentStatus : GameStatus;
  primeiraJogadaOponent = false;
  disponivelParaStartarJogo = true;

  constructor(private offline: JogoOfflineService, private game: GameGeneralService, private idServ: GetIdService) { }

  ngOnInit() {
    this.idServ.currentId.subscribe(id => this.localId = id);
    this.game.currentStatus.subscribe( estado => {
      this.currentStatus = estado;
      if((this.disponivelParaStartarJogo) && estado.tipo != "0"){
        if(estado.jogadorTurno){
          this.startGame();
        }
        else {
          this.primeiraJogadaOponent = true;
          this.startGame();
        }
      }
    });
  }

  startGame(){
    if(this.primeiraJogadaOponent){
      this.chamaJogadaOponente();
    }
    this.disponivelParaStartarJogo = false;
    this.estado = true;
    this.updateGame();
  }

  getSquareMarcado(x,y) : boolean{
    return (!(this.currentStatus.jogo[x][y] != '0') && this.currentStatus.jogadorTurno == true);
  }

  squareClick(event: any){
    if(this.estado == false || this.currentStatus.estadoDoJogo != 0 || !this.currentStatus.jogadorTurno){
      return;
    }
    this.updateGame();
    let SquareId : string = event.target.id;
    console.log(event.target.id);
    this.aplicaJodada(SquareId.charAt(0),SquareId.charAt(1));
  }

  aplicaJodada(x :string, y: string){
    if(this.currentStatus.jogo[parseInt(x)][parseInt(y)] != 0){
      return;
    }
    if(this.currentStatus.tipo == "4"){
      this.offline.realizaJogada(this.localId,x,y).subscribe((newStatus : GameStatus) => {
        this.game.changeStatus(newStatus);
        console.log(newStatus);
        this.updateGame();
        if(this.currentStatus.estadoDoJogo == 0){
          console.log('chamei no apply');
          this.chamaJogadaOponente();
        }
        else{
          this.terminaJogo();
        }
      });
    }
  }

  terminaJogo(){
    //this.estado = false;
    this.disponivelParaStartarJogo = true;
    this.primeiraJogadaOponent = false;
  }

  HighlightaQuadradosVencedores(){
    for(let i = 0; i< 3; i++){
      let array = []
      for(let j = 0; j < 3; j++){
        if(this.currentStatus.winningSquares[i][j] != '0'){
          //array.push('fw');
        } 
        else {
          array.push('ban');
        }        
      }
      this.table.push(array);
   }
  }

  chamaJogadaOponente(){
    setTimeout(() => {
      this.offline.vezDoOponente(this.currentStatus.playerId).subscribe((newStatus:GameStatus) => {
        console.log(newStatus);
        this.currentStatus = newStatus;
        this.game.changeStatus(newStatus);
        this.updateGame();
        if(this.currentStatus.estadoDoJogo != 0){
          this.terminaJogo();
        }
      })
    }, 1500);
  }

  updateGame(){

    this.table = [];

    for(let i = 0; i< 3; i++){
      let array = []
      for(let j = 0; j < 3; j++){
        if(this.currentStatus.jogo[i][j] == '0'){
          array.push('fw');
        } else if(this.currentStatus.jogo[i][j] == '1'){
          array.push('times');
        } else {
          array.push('ban');
        }        
      }
      this.table.push(array);
    }
  }



    
  

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {

    let retorno = false;
    console.log('destruino');
    this.offline.destroiJogo(this.currentStatus.playerId).subscribe(() => {
      retorno = true;
    })
    
    if(retorno){
      return false;
    }
    
  }
  


}
