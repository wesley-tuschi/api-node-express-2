import livros from '../models/Livro.js';

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const listar = await livros.find().populate('autor').exec();
      res.status(200).json(listar);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const listarId = await livros
        .findById(id)
        .populate('autor', 'nome')
        .exec();
      if (listarId !== null) {
        res.status(200).send(listarId);
      } else {
        res.status(404).send({ message: 'Livro não localizado.' });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroCadastro = await livro.save();
      res.status(201).send(livroCadastro.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: 'Livro atualizado com sucesso' });
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: 'Livro removido com sucesso' });
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      const listarEditora = await livros.find({ editora: editora });
      res.status(200).send(listarEditora);
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
