const usuarioModel = require('../models/usuariosModel');

const registrarUsuario = async (req, res) => {
const { nome, email, senha, cpf} = req.body;
try {
const senhaHash = await usuarioModel.gerarSenhaHash(senha);
const usuario = await usuarioModel.registrarUsuario(nome, email, senhaHash, cpf);
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
const { id } = req.params;
try {
const usuario = await usuarioModel.buscarUsuarioPorId(id);
if (!usuario) {
return res.status(404).json({ erro: 'Usuário não encontrado' });
}
res.json(usuario);
} catch (error) {
res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: error.message });
}
};

const postarFoto = async (req, res) => {
  const { titulo, caminho_imagem, idUsuario } = req.body;
  try {
    const foto = await usuarioModel.postarFoto(titulo, caminho_imagem, idUsuario);
    res.status(201).json(foto);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao postar foto', detalhe: error.message });
  }
};

const adicionarEvento = async (req, res) => {
  const { nome, dataInicio, dataFinal, descricao, endereco, idUsuario } = req.body;
  try {
    const evento = await usuarioModel.adicionarEvento(nome, dataInicio, dataFinal, descricao, endereco, idUsuario);
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao adicionar evento', detalhe: error.message });
  }
};

const postarBlog = async (req, res) => {
  const { titulo, conteudo, dataHoraPublicacao, idUsuario } = req.body;
  try {
    const post = await usuarioModel.postarBlog(titulo, conteudo, dataHoraPublicacao, idUsuario);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao postar no blog', detalhe: error.message });
  }
};

const selecionarTodosUsuarios = async (req, res) => {
    try{
        const usuarios = await usuarioModel.selecionarTodosUsuarios();
        res.json(usuarios);
    }catch (error){
        res.status(500).json({erro: 'Erro ao buscar usuarios.', detalhe: error.message})
    }
}

const selecionarTodosEventos = async (req, res) => {
    try{
        const eventos = await usuarioModel.selecionarTodosEventos();
        res.json(eventos);
    }catch (error){
        res.status(500).json({erro: 'Erro ao buscar eventos.', detalhe: error.message})
    }
}

const selecionarTodosBlogs = async (req, res) => {
    try{
        const blog = await usuarioModel.selecionarTodosBlogs();
        res.json(blog);
    }catch (error){
        res.status(500).json({erro: 'Erro ao buscar posts.', detalhe: error.message})
    }
}

module.exports = {
  registrarUsuario,
  loginUsuario,
  getUsuarioPorId,
  postarBlog,
  postarFoto,
  adicionarEvento,
  selecionarTodosUsuarios,
  selecionarTodosEventos,
  selecionarTodosBlogs
};

