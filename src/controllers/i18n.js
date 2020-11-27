import i18n from 'i18n';

function translate(req, res) {
  i18n.configure({
    locales: ['en', 'kin', 'fr', 'sw'],
    directory: `${__dirname}/locales`,
    defaultLocale: 'en',
    headers: 'Accept-language',
  });
  i18n.init(req, res);
  res.end(res.__('Welcome to phantom'));
}

export default translate;
