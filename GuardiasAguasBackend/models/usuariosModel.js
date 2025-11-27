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
const query = 'SELECT idusuario, nome, email, senha  FROM usuarios WHERE idusuario = $1';
const { rows } = await conexao.query(query, [idusuario]);
return rows[0];
};

const buscarUsuarioPorEmail = async (email) => {
    const query = 'SELECT idusuario AS "idUsuario", nome, email, senha FROM usuarios WHERE email = $1';
    const { rows } = await conexao.query(query, [email]);
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



module.exports = {
registrarUsuario,
buscarUsuarioPorId,
buscarUsuarioPorEmail,
gerarSenhaHash,
compararSenhas,
adicionarPost,
selecionarTodosUsuarios,
};


