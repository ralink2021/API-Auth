const Joi = require("@hapi/joi");

/** Validação do Dados de USUARIO com Hapi Joi */
const usuarioValidacao = data => {
  const schema = {
    nome: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
   return Joi.validate(data, schema);
};

const loginValidacao = data => {
    const schema = {
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    };
     return Joi.validate(data, schema);
  };

module.exports.usuarioValidacao = usuarioValidacao;
module.exports.loginValidacao = loginValidacao;
