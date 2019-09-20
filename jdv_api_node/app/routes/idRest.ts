import { Usuario } from './../models/usuario';
import  express from 'express';

export const router = express.Router();

router.post('geraId', (req: express.Request, res: express.Response) => {
    const user: Usuario = req.body;
    res.send
});
