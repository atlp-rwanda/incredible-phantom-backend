import Joi from 'joi';

export default Joi.object({
  firstName: Joi.string().min(2).max(64),
  lastName: Joi.string().min(2).max(64),
  language: Joi.string().default('en'),
  phone: Joi.string().min(10).max(13),
});
