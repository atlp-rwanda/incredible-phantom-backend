const Joi = require('joi');

const userValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(64).required(),
  lastName: Joi.string().min(2).max(64).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  nationalId: Joi.number().min(16).required(),
  phone: Joi.string().min(10).max(13),
  role: Joi.string().required(),
  language: Joi.string().default('en'),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'rw', 'co'] },
    }),
});
export default userValidationSchema;