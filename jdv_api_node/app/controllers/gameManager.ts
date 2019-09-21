import { Coordenada } from './../models/Coordenada';
import { Jogo } from './../models/jogo';

const listaJogos: Jogo[] = [];

export const criaNovoJogo = (id: string): Jogo  => {
		
    let userSymbol = 1;
    
    if(getRandomBoolean()) {
        userSymbol = -1;
    }
    
    let newJogo = new Jogo(id, userSymbol); 
    
    listaJogos.push(newJogo);
    
    return newJogo;
}

export const fazJogada = (id: string, coord: Coordenada) => {
    let meuJogo: Jogo;
    
    for(let i = 0; i < listaJogos.length; i++) {
        if(listaJogos[i].playerId == id) {
            meuJogo = listaJogos[i];
            meuJogo.playerJogada(coord.x, coord.y);
            return meuJogo;
        }
    }
    throw new Error("Não achei um jogo pra este id");
}

export const fazJogadaBot = (id: string) => {
    let meuJogo: Jogo;
    
    for(let i = 0; i < listaJogos.length; i++) {
        if(listaJogos[i].playerId == id) {
            meuJogo = listaJogos[i]
            meuJogo.serverJogada2();
            return meuJogo;
        }
    }
    throw new Error("Não achei um jogo pra este id");
}

export const deletaJogoDoUsuario = (id: string) => {
    const jogo = getJogoById(id)
    if(!!jogo) {
        listaJogos.indexOf(jogo);
        return true;
    }
    
    return false;
}

function getRandomBoolean(): boolean {
    return (Math.round(Math.random()) >= 0.5);
}

function getJogoById(id: string): Jogo {
    return listaJogos.find( jogo => jogo.playerId == id);
}
