const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');


router.post('/registrar', usuariosController.registrarUsuario);
router.post('/login', usuariosController.loginUsuario);
router.post('/blog/postarBlog', usuariosController.postarBlog);
router.post('/galeria/postarFoto', usuariosController.postarFoto);
router.post('/calendario/adicionarEvento', usuariosController.adicionarEvento);
router.get('/selecionarTodosUsuarios', usuariosController.selecionarTodosUsuarios);
router.get('/selecionarTodosBlogs', usuariosController.selecionarTodosBlogs);
router.get('/selecionarTodosEventos', usuariosController.selecionarTodosEventos);


module.exports = router;