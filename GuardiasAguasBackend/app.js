require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuariosRoutes');
const publicRoutes = require('./routes/publicRoutes')
const app = express();



// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite receber JSON no body das requisições
app.use('/uploads', express.static('uploads'));

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/', publicRoutes);


app.get('/', (req, res) => {
res.send('API funcionando!');
});
// Inicia o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
console.log(`Servidor executando em: http://localhost:${port}`);
});