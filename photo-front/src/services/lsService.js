import moment from 'moment';
import getUserLocale from 'get-user-locale';

export const locales = ['EN', 'RU'];

const lsService = {
  getLocale: () => {
    let locale = localStorage.getItem('language');
    if (!locale || !locales.includes(locale)) {
      locale = getUserLocale().slice(0, 2).toUpperCase();
    }
    locale = locales.includes(locale) ? locale : locales[0];
    lsService.setLocale(locale);
    return locale;
  },
  setLocale: locale => {
    localStorage.setItem('language', locale);
    moment.locale(locale);
  }
};

export default lsService;
