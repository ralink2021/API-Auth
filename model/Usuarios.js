/** Classe de Usuarios que ira representar a Tabela no Banco de Dados */

const mongoose = require('mongoose');

/** Instanciando um novo objeto */
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        require: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        require: true,
        max: 1024,
        min: 6
    },
    data: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Usuario', usuarioSchema);