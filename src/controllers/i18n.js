import sucessRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import path from 'path'
import i18n from 'i18n'

    i18n.configure({
    locales: ['en', 'kin', 'fr','sw'],
    directory: path.join('./src/controllers', 'locales'),
    autoReload: true,
    defaultLocale: 'en',
    headers: 'Accept-language',
    queryParameter: 'lang'
})

export default i18n;
    
