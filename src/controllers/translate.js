import sucessRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
// import {Translate} from '@google-cloud/translate';
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Configuration for the client
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

const translateText = async (req, res) => {
  const text = req.body.html;
  const targetLanguage = req.body.language;
  try {
    const [response] = await translate.translate(text, targetLanguage);
    return sucessRes(res, 200, response);
  } catch (error) {
    return errorRes(res, 500, `Error while translating Text --> ${error}`);
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
