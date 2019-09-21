import { Usuario } from './../models/usuario';
import * as gameController from '../controllers/idManager';
import  express from 'express';

export const router = express.Router();

router.post('geraId', (req: express.Request, res: express.Response) => {
    const user: Usuario = req.body;
    res.json(gameController.geraId(user));
});
