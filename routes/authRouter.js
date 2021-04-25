/** Arquivo de Rotas */
const { request, response } = require('express');
const Usuarios = require('../model/Usuarios');
const router = require('express').Router();
const User = require('../model/Usuarios');
const bcrypt = require('bcryptjs')
const { usuarioValidacao, loginValidacao } = require('../validation/validacao');

/** Primeira Rota Para Registra um Usuario - POST */
router.post('/registra', async (request, response) => {

    /** Validação do Usuario antes de Salvar no Banco de Dados */
    const { error } = usuarioValidacao(request.body);
    if (error) return response.status(400).send(error.details[0].message);

    /** Validação para verificar se ja existe um Usuario no Banco de Dados */
    const emailExiste = await Usuarios.findOne({email: request.body.email});
    if (emailExiste) return response.status(400).send('Email ja Existente!');

    /** Criando um Hash para a Senha */
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.body.password, salt);
    
    /** Cria um novo Usuario e depois Salva no Banco de Dados */
    const user = new User({
        nome: request.body.nome,
        email: request.body.email,
        password: hashPassword 
    });
    try {
        const salvarUsuario = await user.save();
        response.send({user: user._id});
    } catch (error) {
        response.status(400).send(error);
    }
});

/** Segunda Rota para verificar se o Login e Valido - POST */
router.post('/login', async (request, response) => {
    
    /** Validação do Usuario antes de Salvar no Banco de Dados */
    const { error } = loginValidacao(request.body);
    if (error) return response.status(400).send(error.details[0].message);

    /** Validação para verificar se ja existe um Email no Banco de Dados */
    const usuario = await Usuarios.findOne({email: request.body.email});
    if (!usuario) return response.status(400).send('Email não encontrado!');

    /** Verificar se a senha esta correta */
    const verificaSenha = await bcrypt.compare(request.body.password, usuario.password);
    if(!verificaSenha) return response.status(400).send("Senha Incorreta!");

    response.send('Login Efetudo com Sucesso!')
})

module.exports = router;