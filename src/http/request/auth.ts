import Joi, { ObjectSchema } from 'joi';

export const loginValidator = (): ObjectSchema =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

export const registrationValidator = (): ObjectSchema =>
  loginValidator().concat(
    Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
    })
  );
