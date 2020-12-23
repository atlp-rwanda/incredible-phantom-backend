import Joi from 'joi';

export default Joi.object({
  busId: Joi.number().required()
});
