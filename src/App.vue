<template>
  <v-app>
    <login-page v-if="isLogin" />

    <default-layout v-else />
  </v-app>
</template>

<script>
import LoginPage from '@/views/LoginPage';
import DefaultLayout from '@/Layout';

export default {
  name: 'App',
  components: {
    DefaultLayout,
    LoginPage,
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    },
  },
};
</script>

<style lang="scss">
.v-icon {
  font-size: 23px !important;
}
.icon-small .v-icon {
  font-size: 17px !important;
}

.cursor--pointer {
  cursor: pointer;
}

.custom-elevation {
  box-shadow: 0 20px 20px rgba(48, 52, 59, 0.07) !important;
}

#app.v-application .display-4,
  #app.v-application .display-3,
  #app.v-application .display-2,
  #app.v-application .display-1,
  #app.v-application .headline,
  #app.v-application .title,
  #app.v-application .subtitle-1,
  #app.v-application .subtitle-2,
  #app.v-application .body-1,
  #app.v-application .body-2,
  #app.v-application .caption,
  #app.v-application .overline {
  font-family: "Ubuntu", sans-serif !important;
}

.v-application {
  font-family: "Ubuntu", sans-serif !important;
}
</style>
