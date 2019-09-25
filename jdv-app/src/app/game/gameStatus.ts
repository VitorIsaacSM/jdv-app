export interface GameStatus {
    estadoDoJogo : number,
    jogadorSimbolo : boolean,
    jogadorTurno : boolean,
    jogadorValue : number,
    serverValue: number,
    jogo: any[],
    winningSquares: any[];
    playerId: string,
    tipo : string,
    dificuldade: number
}