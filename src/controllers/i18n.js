
import sucessRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import i18n from 'i18n'
import cookieParser from 'cookie-parser';

i18n.configure({
    locales: ['en', 'kin', 'fr','sw'],
    directory: `${__dirname}/locales`,
    defaultLocale: 'en',
    headers: 'Accept-language',
    queryParameter: 'lang',
    cookie: 'locale',
    retryInDefaultLocale: false,
})

// Detecting the user browser langauge settings and translate the body
async function detect(req,res){
    i18n.init(req,res)
    res.cookie('locale', 'fr')
    let translation = req.body.html;
    try{
        const translatedText = await res.__(translation);
        return sucessRes(res,200, translatedText)
     } catch (error) {
         console.log(error);
        return errorRes(res,500, 'There was an error while translating your text');
     }
}

// Translating the body based on user input
async function translate(req,res){
    i18n.init(req, res)
    let translation = req.body.html;
    res.cookie('locale', 'fr')
    try{
        const translatedText = await res.__(translation);
       return sucessRes(res,200, translatedText)
    } catch (error) {
        console.log(error);
       return errorRes(res,500, 'There was an error while translating your text');
    }
    // res.send(res.__('Welcome to phantom'))

}

export default { translate , detect }
