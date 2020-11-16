import sucessRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import bodyParser from 'body-parser';
// import {Translate} from '@google-cloud/translate';
const {Translate} = require('@google-cloud/translate').v2;
import detenv from 'dotenv'
require('dotenv').config();


// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

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

const translateText = async (req,res) => {
    var text = "My friend";
    let targetLanguage = 'kin'
    try {
        let [response] = await translate.translate(text, targetLanguage);
        res.status(200).send(response);
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};

// translateText('Hello world', 'it')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });


export default translateText