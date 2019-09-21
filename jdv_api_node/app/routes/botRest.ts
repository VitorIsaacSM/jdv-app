import { Coordenada } from './../models/Coordenada';
import  express from 'express';
import { Usuario } from '../models/usuario';
import * as gameController from '../controllers/gameManager';

export const router = express.Router();

router.post('start', (req: express.Request, res:express.Response) => {
    const user: Usuario = req.body.user;
    return res.json(gameController.criaNovoJogo(user.id));
});

router.post(':id', (req: express.Request, res:express.Response) => {
    const coord: Coordenada = req.body.coord;
    const id = req.params.id;
    console.log('Usuario de id = ' + id + ' faz jogada');
    return res.json(gameController.fazJogada(id, coord));
});

router.delete('delete/:id', (req: express.Request, res:express.Response) => {
    const id = req.params.id;
    console.log('Deletando jogo do usuario com id = ' + id);
    return res.json(gameController.deletaJogoDoUsuario(id));
});

router.post('bot/:id', (req: express.Request, res:express.Response) => {
    const id = req.params.id;
    console.log('Fazendo Jogada do Bot no jogo do usuario de id = ' + id);
    res.json(gameController.fazJogadaBot(id));
});


