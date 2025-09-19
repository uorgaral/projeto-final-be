const conexao = require('../conexao');
const bcrypt = require('bcrypt');

const registrarUsuario = async (nome, email, senhaHash) => {
const query = 'INSERT INTO usuarios(nome, email, senha) VALUES ($1, $2, $3) RETURNING idUsuario, nome, email, senha';
const valores = [nome, email, senhaHash];
const { rows } = await conexao.query(query, valores);
return rows[0];
};

const gerarSenhaHash = async (senha) => {
console.log(bcrypt.hash(senha, 10));
return bcrypt.hash(senha, 10);
};

const compararSenhas = async (senha, senhaHash) => {
return bcrypt.compare(senha, senhaHash);
};

const adicionarEvento = async (nome, dataInicio, dataFinal, descricao, endereco, idUsuario) => {
const query = 'INSERT INTO eventos(nome, dataInicio, dataFinal, descricao, endereco, idUsuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING nome, dataInicio, dataFinal, descricao, endereco, idUsuario';
const valores = [nome, dataInicio, dataFinal, descricao, endereco, idUsuario];
const { rows } = await conexao.query(query, valores);
return rows[0];
};

const selecionarTodosUsuarios = async () => {
    const query = 'SELECT * FROM usuarios';
    const { rows } = await conexao.query(query);
    return rows;
}

const selecionarTodosEventos = async () => {
    const query = 'SELECT * FROM eventos';
    const { rows } = await conexao.query(query);
    return rows;
}


const buscarUsuarioPorId = async (idUsuario) => {
const query = 'SELECT idUsuario, nome, email, senha  FROM usuarios WHERE idUsuario = $1';
const { rows } = await conexao.query(query, [idUsuario]);
return rows[0];
};



module.exports = {
registrarUsuario,
buscarUsuarioPorId,
gerarSenhaHash,
compararSenhas,
adicionarEvento,
selecionarTodosUsuarios,
selecionarTodosEventos,
};

