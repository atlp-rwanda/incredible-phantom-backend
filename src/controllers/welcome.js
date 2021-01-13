import sucessRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';

export default async (req, res) => {
  try {
    return sucessRes(
      res,
      200,
      res.__('Welcome to phantom an app which is used to track buses')
    );
  } catch (error) {
    return errorRes(res, 500, res.__('There was error welcoming you'));
  }
};
