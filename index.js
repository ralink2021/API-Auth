/** Importando modulos do Express, MongoDB, dotenv */
const express = require('express');
const app = express();
const mongose = require('mongoose');
const dotenv = require('dotenv');

/** Importando as Rotas */
const authRoute = require('./routes/authRouter');

dotenv.config();

/** Conexão com Banco de Dados MongoDB */
mongose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
        return console.log('Conexão com Banco de Dados com Sucesso!');
    });

/** Middleware */
app.use(express.json());
/** Usando Middleware nas Rotas */
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Servidor Online!'))