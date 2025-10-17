const publicModel = require('../models/publicModel');
const usuarioModel = require('../models/usuariosModel');
const { get } = require('../routes/usuariosRoutes');


// Informações abertas ao público
const selecionarTodosImagem = async (req, res) => {
    try{
        const imagens = await publicModel.selecionarTodosImagem();
        res.json(imagens);
    }catch (error){
        res.status(500).json({erro: 'Erro ao buscar imagens.', detalhe: error.message})
    }
};
const selecionarTodosPost = async (req, res) => {
    try{
        const post = await publicModel.selecionarTodosPost();
        res.json(post);
    }catch (error){
        res.status(500).json({erro: 'Erro ao buscar imagens.', detalhe: error.message})
    }
};


const loginUsuario = async (req, res) => {
const { email, senha } = req.body;
try {
const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
if (!usuario) {
return res.status(401).json({ message: 'Usuário não encontrado' });
}
const senhaValida = await usuarioModel.compararSenhas(senha, usuario.senha);
if (!senhaValida) {
return res.status(401).json({ message: 'Senha inválida' });
}
res.json({ mensagem: 'Login realizado com sucesso', usuario: { id: usuario.id,
nome: usuario.nome, email: usuario.email } });
} catch (error) {
res.status(500).json({ message: 'Erro no login', detalhe: error.message });
}
};

const getPostPorId = async (req, res) => {
    const { idPost } = req.params;
    try {
        const post = await publicModel.getPostPorId(idPost);
        if (!post) {
            return res.status(404).json({ erro: 'Publicação não encontrada' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar publicação', detalhe: error.message });
    }
};

module.exports = {
    selecionarTodosImagem,
    selecionarTodosPost,
    loginUsuario,
    getPostPorId
};