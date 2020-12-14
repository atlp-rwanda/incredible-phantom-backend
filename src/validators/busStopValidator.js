import Joi from 'joi';

export default Joi.object({
  coordinates: Joi.string().required(),
  sector: Joi.string().required(),
  cell: Joi.string().required()
});
