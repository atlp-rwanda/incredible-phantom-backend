import Joi from 'joi';

export default Joi.object({
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  distance: Joi.string()
});
