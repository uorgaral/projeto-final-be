const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/selecionarTodosPost', publicController.selecionarTodosPost);
router.get('/selecionarTodosImagem', publicController.selecionarTodosImagem);

module.exports = router;