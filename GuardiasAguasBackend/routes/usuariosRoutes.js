const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/images/' });

router.post('/registrar', usuariosController.registrarUsuario);
router.post('/login', usuariosController.loginUsuario);
router.post('/calendario/adicionarEvento', usuariosController.adicionarEvento);
router.get('/selecionarTodosUsuarios', usuariosController.selecionarTodosUsuarios);
router.get('/selecionarTodosEventos', usuariosController.selecionarTodosEventos);
router.get('/selecionarTodosPost', usuariosController.selecionarTodosPost);
router.get('/selecionarTodosImagem', usuariosController.selecionarTodosImagem);
router.post('/adicionarPost', usuariosController.upload.array('imagem', 5), usuariosController.adicionarPost)


module.exports = router;