import { TipoDificuldade } from './../TipoDificuldade';
import { GetIdService } from './../services/get-id.service';
import { JogoOnlineService } from './../services/jogo-online.service';
import { GameGeneralService } from './../services/game-general.service';
import { GameStatus } from './../game/gameStatus';
import { JogoOfflineService } from './../services/jogo-offline.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  estadoMenu = 0;
  textoInicial = " Modos de Jogo "
  textoIniciandoJogo = " Iniciando Jogo... ";
  textoJogo = " Jogo em Andamento"
  TextoMenuHeader = this.textoInicial;
  JogoZerado = false;
  dificuldadeSelecionada: TipoDificuldade = 0;

  menuJogarComAmigo = false;

  MenuMessages = {
    tipoMessage: "",
    seuTurnoMessage: "",
    seuSimboloMessage: ""
  }

  CurrentStatus : GameStatus;

  constructor(
    private offline: JogoOfflineService,  
    private idService: GetIdService, 
    private game: GameGeneralService,
    private online: JogoOnlineService ) { }

  ngOnInit() {
    this.game.currentStatus.subscribe((status : GameStatus) => {
      this.CurrentStatus = status;
      this.generateMessages();
    })
  }

  iniciaJogoOffline(){

    if(this.JogoZerado){
      this.offline.destroiJogo(this.CurrentStatus.playerId).subscribe(() => {
        console.log("zerei");
        this.idService.currentId.subscribe((id: string) => {
          this.offline.iniciaJogo(id, this.dificuldadeSelecionada).subscribe( (a : GameStatus) => {
    
            console.log(a);
            this.game.changeStatus(a);
            this.CurrentStatus = a;
    
            this.TextoMenuHeader = this.textoJogo;
            this.estadoMenu = 4;   
            this.JogoZerado = false;  
            setInterval(() => {
              this.generateMessages();
            }, 1500);
          });
        });
      })
  
    }else{
      this.idService.currentId.subscribe((id: string) => {
        this.offline.iniciaJogo(id, this.dificuldadeSelecionada).subscribe( (a : GameStatus) => {
  
          console.log(a);
          this.game.changeStatus(a);
          this.CurrentStatus = a;
  
          this.TextoMenuHeader = this.textoJogo;
          this.estadoMenu = 4; 
          this.JogoZerado = false;  
          setInterval(() => {
            this.generateMessages();
          }, 1500);
        });
      });
    }
    
  }

  backToStartMenu(){
    this.estadoMenu = 0;
    this.JogoZerado = true;
    this.TextoMenuHeader = this.textoInicial;
  }

  generateMessages() {
    switch(this.CurrentStatus.tipo) {
      case "1" : {break;}
      case "4" : {this.MenuMessages.tipoMessage = "Jogando contra o Computador"}
    }
    if(this.CurrentStatus.estadoDoJogo != 0) {
      if(!this.JogoZerado){
        this.TextoMenuHeader = "Jogo Encerrado!"

      if(this.CurrentStatus.estadoDoJogo == this.CurrentStatus.jogadorValue) {
        this.MenuMessages.seuTurnoMessage = "Você Venceu!!"
      } 

      if(this.CurrentStatus.estadoDoJogo == this.CurrentStatus.serverValue) {
        this.MenuMessages.seuTurnoMessage = "Você Perdeu :( "
      } 
      if(this.CurrentStatus.estadoDoJogo == -99){
        this.MenuMessages.seuTurnoMessage = "Empate!!"
      } 
      
      this.estadoMenu = 10;
      this.JogoZerado = true;
      }
      

    }

    else {
      if (this.CurrentStatus.jogadorTurno) {
        this.MenuMessages.seuTurnoMessage = "É sua vez de jogar!"
      } else {
        this.MenuMessages.seuTurnoMessage = "É a vez do seu oponente jogar."
      }
      this.MenuMessages.seuSimboloMessage = "Seu Símbolo é " 
    }
   

  }
  
  getFaName() {
    if(this.CurrentStatus.jogadorValue == 1){
      return 'times';
    }
    else{
      return 'ban';
    }
  }

  buscaPorId(id: string) {

    this.idService.currentId.subscribe((meuId) => {
      this.idService.buscaPorId(meuId, id).subscribe(res => {
        if(res){
          console.log('ye');
        }
        else{
          console.log('ou');
        }
      })
    })

  }

  get labelBotaoJogar() {
    return this.estadoMenu ? 'Jogar Novamente' : 'Iniciar Jogo';
  }

}
