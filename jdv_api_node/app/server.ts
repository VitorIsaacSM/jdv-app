import { idRouter } from './routes/idRest';
import { botRouter } from './routes/botRest';
import bodyparser from "body-parser";
import cors from 'cors';
import express from "express";

const commonPath = '/jdv/api';

const app = express();

const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:4200",
    preflightContinue: false
  };

/* app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next()
}); */

app.use(cors(options));
app.options('*', cors(options));

app.use(bodyparser.json());

app.use(commonPath + '/id', idRouter);

app.use(commonPath + '/offline', botRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
});
