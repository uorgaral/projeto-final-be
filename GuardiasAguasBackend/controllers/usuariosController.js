const usuarioModel = require('../models/usuariosModel');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'projetoguardias',
  password: 'admin',
  port: 5432, 
});


const registrarUsuario = async (req, res) => {
const { nome, email, senha} = req.body;
try {
const senhaHash = await usuarioModel.gerarSenhaHash(senha);
const usuario = await usuarioModel.registrarUsuario(nome, email, senhaHash);
res.status(201).json(usuario);
} catch (error) {
res.status(500).json({ erro: 'Erro ao registrar usuário', detalhe: error.message
});
}
};

const loginUsuario = async (req, res) => {
const { email, senha } = req.body;
try {
const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
if (!usuario) {
return res.status(401).json({ erro: 'Usuário não encontrado' });
}
const senhaValida = await usuarioModel.compararSenhas(senha, usuario.senha);
if (!senhaValida) {
return res.status(401).json({ erro: 'Senha inválida' });
}
res.json({ mensagem: 'Login realizado com sucesso', usuario: { id: usuario.id,
nome: usuario.nome, email: usuario.email } });
} catch (error) {
res.status(500).json({ erro: 'Erro no login', detalhe: error.message });
}
};

const getUsuarioPorId = async (req, res) => {
const { idUsuario } = req.params;
try {
const usuario = await usuarioModel.buscarUsuarioPorId(idUsuario);
if (!usuario) {
return res.status(404).json({ erro: 'Usuário não encontrado' });
}
res.json(usuario);
} catch (error) {
res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: error.message });
}
};


const selecionarTodosUsuarios = async (req, res) => {
    try{
        const usuarios = await usuarioModel.selecionarTodosUsuarios();
        res.json(usuarios);
    }catch (error){
        res.status(500).json({erro: 'Erro ao buscar usuarios.', detalhe: error.message})
    }
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

const adicionarPost = async (req, res) => {
  const { idUsuario, titulo, conteudo } = req.body;
  const files = req.files;
  const confere_imagem = files && files.length > 0;

  try {
    const postQuery = `
      INSERT INTO post (idUsuario, titulo, conteudo, confere_imagem)
      VALUES ($1, $2, $3, $4)
      RETURNING idPost;
    `;
    const postResult = await pool.query(postQuery, [idUsuario, titulo, conteudo, confere_imagem]);
    const idPost = postResult.rows[0].idpost;

    if (confere_imagem) {
      for (const file of files) {
        const imageUrl = `/uploads/images/${file.filename}`;
        const imageQuery = `
          INSERT INTO imagem (idPost, caminho_imagem)
          VALUES ($1, $2);
        `;
        await pool.query(imageQuery, [idPost, imageUrl]);
      }
    }

    res.status(201).json({ message: 'Postagem criada com sucesso!', idPost });
  } catch (error) {
    console.error('Erro ao criar postagem:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


module.exports = {
  registrarUsuario,
  loginUsuario,
  getUsuarioPorId,
  selecionarTodosUsuarios,
  adicionarPost,
  upload
};