import sucessRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import pkg from '@google-cloud/translate';
import dotenv from 'dotenv';

dotenv.config();
const { Translate } = pkg.v2;

//Google cloud translate API credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

const translateText = async (req, res) => {
  var text = req.body.html;
  let targetLanguage = req.body.language;
  try {
    let [response] = await translate.translate(text, targetLanguage);
    return sucessRes(res, 200, response);
  } catch (error) {
    return errorRes(
      res,
      500,
      `Opps there was an error while translating Text --> ${error}`,
    );
  }
};

export default translateText;

// const detectLanguage = async (text) => {

//     try {
//         let response = await translate.detect(text);
//         return response[0].language;
//     } catch (error) {
//         console.log(`Error at detectLanguage --> ${error}`);
//         return 0;
//     }
// }

// detectLanguage('Hello world!')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(error);
//     });
