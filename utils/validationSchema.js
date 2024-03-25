const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const registerBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password')
  });
  return schema.validate(body);
}

const logInBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
  });
  return schema.validate(body);
}

const refreshTokenBodyValidation = (body) => {
	const schema = Joi.object({
		refreshToken: Joi.string().required().label("RefreshToken"),
	});
	return schema.validate(body);
};

module.exports = { registerBodyValidation, logInBodyValidation, refreshTokenBodyValidation };