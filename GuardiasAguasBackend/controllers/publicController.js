const publicModel = require('../models/usuariosModel');

// Informações abertas ao público
const paginaInicial = ('/', (req, res) => res.send('Página inicial'));
const sobre = ('/sobreOProjeto', (req, res) => res.send('Sobre o Projeto'));
const oQueE= ('/saneamentoBasico', (req, res) => res.send('Conteúdo sobre saneamento'));
const galeria = ('/galeria', (req, res) => res.send('Fotos públicas'));
const blog = ('/blog', (req, res) => res.send('Postagens públicas'));
const calendario = ('/calendario', (req, res) => res.send('Calendário público'));


module.exports = {
    paginaInicial,
    sobre,
    oQueE,
    galeria,
    blog,
    calendario
};