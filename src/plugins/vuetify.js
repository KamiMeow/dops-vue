import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#40587c',
        secondary: '#407855',
        accent: '#4052AB',
      },
    },
  },
  lang: {
    locales: { ru },
    current: 'ru'
  }
});
