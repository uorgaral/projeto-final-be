const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const multer = require('multer');

router.post('/registrar', usuariosController.registrarUsuario);
router.post('/login', usuariosController.loginUsuario);
router.get('/selecionarTodosUsuarios', usuariosController.selecionarTodosUsuarios);
router.post('/adicionarPost', usuariosController.upload.array('imagem', 5), usuariosController.adicionarPost)


module.exports = router;