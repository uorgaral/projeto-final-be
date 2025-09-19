const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/registrar', usuariosController.registrarUsuario);
router.post('/login', usuariosController.loginUsuario);
router.post('/calendario/adicionarEvento', usuariosController.adicionarEvento);
router.get('/selecionarTodosUsuarios', usuariosController.selecionarTodosUsuarios);
router.get('/selecionarTodosEventos', usuariosController.selecionarTodosEventos);


module.exports = router;