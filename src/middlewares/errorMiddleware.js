import mongoose from 'mongoose';
// eslint-disable-next-line no-unused-vars
function errorMiddleware(erro, req, res, next) {
  if (erro instanceof mongoose.CastError) {
    res.status(400).send({ message: 'Um ou mais dados fornecidos estão incorretos' });
  } else {
    res.status(500).send({ message: ' Erro interno no servidor.' });
  }
}

export default errorMiddleware;
