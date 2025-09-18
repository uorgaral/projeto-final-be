const express = require('express');
const router = express.Router();



router.get('/sobreOProjeto', (req, res) => res.send('Sobre o Projeto'));
router.get('/saneamentoBasico', (req, res) => res.send('Conteúdo sobre saneamento'));
router.get('/galeria', (req, res) => res.send('Fotos públicas'));
router.get('/blog', (req, res) => res.send('Postagens públicas'));
router.get('/calendario', (req, res) => res.send('Calendário público'));

module.exports = router;