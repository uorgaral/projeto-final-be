const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');


router.post('/login', publicController.loginUsuario);
router.get('/blog', publicController.selecionarTodosPost);
router.get('/blog/:idPost', publicController.getPostPorId);
router.get('/galeria', publicController.selecionarTodosImagem);

module.exports = router;