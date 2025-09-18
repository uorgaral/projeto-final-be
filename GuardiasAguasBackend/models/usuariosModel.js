const conexao = require('../conexao');
const bcrypt = require('bcrypt');

const registrarUsuario = async (nome, email, senhaHash, cpf) => {
const query = 'INSERT INTO usuarios(nome, email, senha, cpf) VALUES ($1, $2, $3, $4) RETURNING idUsuario, nome, email, senha, cpf';
const valores = [nome, email, senhaHash, cpf];
const { rows } = await conexao.query(query, valores);
return rows[0];
};

const gerarSenhaHash = async (senha) => {
console.log(bcrypt.hash(senha, 10));
return bcrypt.hash(senha, 10);
};

const buscarUsuarioPorEmail = async (email) => {
const query = 'SELECT * FROM usuarios WHERE email = $1';
const { rows } = await conexao.query(query, [email]);
return rows[0];
};

const compararSenhas = async (senha, senhaHash) => {
return bcrypt.compare(senha, senhaHash);
};

const buscarUsuarioPorId = async (idUsuario) => {
const query = 'SELECT idUsuario, nome, email, senha, RA  FROM usuarios WHERE idUsuario = $1';
const { rows } = await conexao.query(query, [idUsuario]);
return rows[0];
};

const postarBlog = async (titulo, conteudo, dataHoraPublicacao, idUsuario) => {
const query = 'INSERT INTO blog(titulo, conteudo, dataHoraPublicacao, idUsuario) VALUES ($1, $2, $3, $4) RETURNING titulo, conteudo, dataHoraPublicacao, idUsuario';
const valores = [titulo, conteudo, dataHoraPublicacao, idUsuario];
const { rows } = await conexao.query(query, valores);
return rows[0];
};

const postarFoto = async (titulo, caminho_imagem, idUsuario) => {
const query = 'INSERT INTO galeria_imagens(titulo, caminho_imagem, idUsuario) VALUES ($1, $2, $3) RETURNING titulo, caminho_imagem, idUsuario';
const valores = [titulo, caminho_imagem, idUsuario];
const { rows } = await conexao.query(query, valores);
return rows[0];
};

const adicionarEvento = async (nome, dataInicio, dataFinal, descricao, endereco, idUsuario) => {
const query = 'INSERT INTO eventos(nome, dataInicio, dataFinal, descricao, endereco, idUsuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING nome, dataInicio, dataFinal, descricao, endereco, idUsuario';
const valores = [nome, dataInicio, dataFinal, descricao, endereco, idUsuario];
const { rows } = await conexao.query(query, valores);
return rows[0];
};

const selecionarTodosUsuarios = async () => {
    const query = 'SELECT * FROM usuarios *';
    const { rows } = await conexao.query(query);
    return rows;
}

const selecionarTodosEventos = async () => {
    const query = 'SELECT * FROM eventos *';
    const { rows } = await conexao.query(query);
    return rows;
}

const selecionarTodosBlogs = async () => {
    const query = 'SELECT * FROM blog *';
    const { rows } = await conexao.query(query);
    return rows;
}


module.exports = {
registrarUsuario,
buscarUsuarioPorEmail,
buscarUsuarioPorId,
gerarSenhaHash,
compararSenhas,
postarBlog,
postarFoto,
adicionarEvento,
selecionarTodosUsuarios,
selecionarTodosEventos,
selecionarTodosBlogs
};

