import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  TCP_HOST: Joi.string().default('localhost'),
  TCP_PORT: Joi.number().default(4002),
  GATEWAY_PORT: Joi.number().default(3000),

  MONGO_URI: Joi.string()
    .uri({ scheme: ['mongodb'] })
    .required(),
  JWT_SECRET: Joi.string().default('jwt_secret_key'),
});
