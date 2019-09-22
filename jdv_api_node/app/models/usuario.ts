export class Usuario {
    id: string;
    session: string;
    isLogged: boolean;
    gameRequest: boolean;
    requesterId: string;

    constructor() {
        this.isLogged = false;
        this.gameRequest = false;
        this.requesterId = null;
    }
};