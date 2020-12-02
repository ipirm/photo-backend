import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { locales } from "../services/lsService";
import resourcesEn from './resources_en.json';
import resourcesRu from './resources_ru.json';

Vue.use(VueI18n);

const fixBrackets = locales => {
  for (let key in locales) {
    const value = locales[key];
    if (typeof value === 'object') {
      locales[key] = fixBrackets(value);
    } else {
      locales[key] = value.replace(/{{/g, '{').replace(/}}/g, '}');
    }
  }
  return locales;
}

export default new VueI18n({
  locale: locales[0],
  fallbackLocale: locales[0],
  messages: {
    EN: fixBrackets({ ...resourcesEn }),
    RU: fixBrackets({ ...resourcesRu })
  },
});
