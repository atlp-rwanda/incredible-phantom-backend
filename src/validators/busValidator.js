import Joi from 'joi';

export default Joi.object({
  brand: Joi.string().required(),
  plateNo: Joi.string().required(),
  driver: Joi.string(),
  seats: Joi.number(),
  location: Joi.string().required(),
  status: Joi.string(),
  commuters: Joi.number(),
  type: Joi.string()
});
