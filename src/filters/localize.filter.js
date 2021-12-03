import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function localizeFilter(key) {
  let locale;
  if (store.getters.info.locale != undefined) {
    locale = store.getters.info.locale
  } else {
    locale = store.state.localeEmpty
  }
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
