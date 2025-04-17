import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en_us } from './en-us'
import { zh_tw } from './zh-tw'

i18n.use(initReactI18next).init({
  resources: {
    'en-us': en_us,
    zh: zh_tw,
  },
  lng: 'zh-tw',
  fallbackLng: 'en-us',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
