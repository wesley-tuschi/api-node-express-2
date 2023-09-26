import livros from '../models/Livro.js';

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const listar = await livros.find().populate('autor').exec();
      res.status(200).json(listar);
    } catch (erro) {
      res.status(500).send({ message: 'Erro ao listar livros' });
    }
  };

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const listarId = await livros
        .findById(id)
        .populate('autor', 'nome')
        .exec();
      res.status(200).send(listarId);
    } catch (err) {
      res
        .status(400)
        .send({ message: `${err.message} - Id do livro não localizado.` });
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);

      const livroCadastro = await livro.save();
      res.status(201).send(livroCadastro.toJSON());
    } catch (err) {
      res
        .status(500)
        .send({ message: `${err.message} - falha ao cadastrar livro.` });
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: 'Livro atualizado com sucesso' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: 'Livro removido com sucesso' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;
      const listarEditora = await livros.find({ editora: editora });
      res.status(200).send(listarEditora);
    } catch (err) {
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  };
}

export default LivroController;
