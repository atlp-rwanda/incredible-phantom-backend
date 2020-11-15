import Joi from 'joi';

export default Joi.object({
  firstName: Joi.string().min(2).max(64).required(),
  lastName: Joi.string().min(2).max(64).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  nationalId: Joi.number().min(16).required(),
  language: Joi.string().default('en'),
  phone: Joi.string().min(10).max(13),
  role: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'rw', 'co', 'test'] },
    }),
});
