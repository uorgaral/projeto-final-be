const conexao = require('../conexao');
const bcrypt = require('bcrypt');

const registrarUsuario = async (nome, email, senhaHash) => {
const query = 'INSERT INTO usuarios(nome, email, senha) VALUES ($1, $2, $3) RETURNING idUsuario, nome, email, senha';
const valores = [nome, email, senhaHash];
const { rows } = await conexao.query(query, valores);
return rows[0];
};

const gerarSenhaHash = async (senha) => {
return bcrypt.hash(senha, 10);
};

const compararSenhas = async (senha, senhaHash) => {
return bcrypt.compare(senha, senhaHash);
};


const selecionarTodosUsuarios = async () => {
    const query = 'SELECT * FROM usuarios';
    const { rows } = await conexao.query(query);
    return rows;
}

const buscarUsuarioPorId = async (idUsuario) => {
const query = 'SELECT idUsuario, nome, email, senha  FROM usuarios WHERE idUsuario = $1';
const { rows } = await conexao.query(query, [idUsuario]);
return rows[0];
};

const buscarUsuarioPorEmail = async (email) => {
const query = 'SELECT * FROM usuarios WHERE email = $1';
const { rows } = await conexao.query(query, [email]);
return rows[0];
};

const adicionarEvento = async (nome, dataInicio, dataFinal, descricao, endereco, idUsuario) => {
const query = 'INSERT INTO eventos(nome, dataInicio, dataFinal, descricao, endereco, idUsuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING nome, dataInicio, dataFinal, descricao, endereco, idUsuario';
const valores = [nome, dataInicio, dataFinal, descricao, endereco, idUsuario];
const { rows } = await conexao.query(query, valores);
return rows[0];
};

const adicionarPost = async (idUsuario, titulo, conteudo, confere_imagem) => {
    const query = 'INSERT INTO post(idUsuario, titulo, conteudo, confere_imagem) VALUES ($1, $2, $3, $4) RETURNING *';
    const valores = [idUsuario, titulo, conteudo, confere_imagem];
    try {
        const { rows } = await conexao.query(query, valores);
        return rows[0];
    } catch (error) {
        throw new Error('Erro no modelo ao adicionar post: ' + error.message);
    }
};

const selecionarTodosEventos = async () => {
    const query = 'SELECT * FROM evento';
    const { rows } = await conexao.query(query);
    return rows;
}
const selecionarTodosPost = async () => {
    const query = 'SELECT * FROM post';
    const { rows } = await conexao.query(query);
    return rows;
}
const selecionarTodosImagem = async () => {
    const query = 'SELECT * FROM imagem';
    const { rows } = await conexao.query(query);
    return rows;
}

module.exports = {
registrarUsuario,
buscarUsuarioPorId,
buscarUsuarioPorEmail,
gerarSenhaHash,
compararSenhas,
adicionarEvento,
adicionarPost,
selecionarTodosUsuarios,
selecionarTodosEventos,
selecionarTodosPost,
selecionarTodosImagem
};


