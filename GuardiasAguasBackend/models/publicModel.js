const conexao = require('../conexao');
const bcrypt = require('bcrypt');


const selecionarTodosPost = async () => {
    const query = 'SELECT * FROM post';
    const { rows } = await conexao.query(query);
    return rows;
};

const selecionarTodosImagem = async () => {
    const query = 'SELECT * FROM imagem';
    const { rows } = await conexao.query(query);
    return rows;
};


module.exports = {
selecionarTodosPost,
selecionarTodosImagem
};