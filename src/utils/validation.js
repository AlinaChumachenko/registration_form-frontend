import Joi from 'joi';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(3).required(),
});

export const validateForm = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) {
    return error.details.map(detail => detail.message).join(', ');
  }
  return null;
};