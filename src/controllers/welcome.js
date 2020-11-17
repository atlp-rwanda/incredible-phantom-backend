import sucessRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';

const welcome = async (req, res) => {
  try {
    return sucessRes(
      res,
      200,
      'Welcome to phantom an app which is used to track buses',
    );
  } catch (error) {
    res.status(500).json({
      message: 'There was error welcoming you',
    });

    return errorRes(res, 500, 'There was error welcoming you');
  }
};

export default welcome;
