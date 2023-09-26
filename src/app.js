/* eslint-disable no-unused-vars */
import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());
routes(app);

app.use(errorMiddleware);

db.on('error', console.log.bind(console, 'Erro de conexão com o banco de dados!  😞'));
db.once('open', () => {
  console.log('conexao com o banco de dados realizada com sucesso! 🙂');
});


export default app;