const publicModel = require('../models/publicModel');


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


module.exports = {
    selecionarTodosImagem,
    selecionarTodosPost
};