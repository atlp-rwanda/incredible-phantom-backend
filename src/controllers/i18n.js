import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'kin', 'fr'],
  directory: path.join('./src/controllers', 'locales'),
  autoReload: true,
  defaultLocale: 'en',
  headers: 'Accept-Language',
  queryParameter: 'lang'
});

export default i18n;
