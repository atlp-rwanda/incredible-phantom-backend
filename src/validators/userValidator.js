import Joi from 'joi';

export const RegisterValidator = Joi.object({
  firstName: Joi.string().min(2).max(64).required(),
  lastName: Joi.string().min(2).max(64).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  nationalId: Joi.number().min(16).required(),
  language: Joi.string(),
  phone: Joi.string().min(10).max(13),
  role: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'rw', 'co'] },
    }),
});



export const UpdateInput = (req) => {
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(6).max(15),
    role: Joi.string().valid('admin', 'bus'),
    busId: Joi.string()
  });

  return schema.validate(req.body);
};

export const loginInput = (req) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(15)
  });

  return schema.validate(req.body);
};
