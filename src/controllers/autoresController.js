import mongoose from 'mongoose';
import autores from '../models/Autor.js';

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (erro) {
      res.status(500).send({ message: 'Erro ao listar autores' });
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({ message: 'Autor não localizado.' });
      }
    } catch (erro) {
      if (erro instanceof mongoose.CastError) {
        res.status(400).send({ message: 'Id do autor inválido.' });
      } else {
        res.status(500).send({ message: ' Erro interno no servidor.' });
      }
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);
      const autorCadastro = await autor.save();
      res.status(201).send(autorCadastro.toJSON());
    } catch (erro) {
      res
        .status(500)
        .send({ message: `${erro.message} - falha ao cadastrar autor.` });
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: 'Autor atualizado com sucesso' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findById(id);
      res.status(200).send({ message: 'Autor removido com sucesso' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default AutorController;
