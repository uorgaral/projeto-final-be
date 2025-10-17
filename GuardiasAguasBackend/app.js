require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuariosRoutes');
const publicRoutes = require('./routes/publicRoutes')
const app = express();


const corsOptions = {
    // 2. Configure a origem (ORIGIN) do seu FRONTEND.
    // O seu frontend parece estar em http://localhost:3001
    origin: 'http://localhost:3001', 
    credentials: true, // Se você precisar enviar cookies ou cabeçalhos de autorização
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization' // Cabeçalhos permitidos
};



// Middlewares
app.use(cors(corsOptions)); // Habilita CORS
app.use(express.json()); // Permite receber JSON no body das requisições

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/', publicRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
res.send('API funcionando!');
});
// Inicia o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
console.log(`Servidor executando em: http://localhost:${port}`);
});