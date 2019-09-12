<template>
  <v-app-bar color="primary" dark class="pa-0">
    <v-toolbar-title class="mr-4">
      DoPS
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
        v-for="item in menu"
        :key="item.to"
        :to="item.to"
        text
      >{{ item.title }}</v-btn>
    </v-toolbar-items>

    <v-spacer />
    <div class="mr-4">{{ name }}</div>
    <v-btn style="height: 100%" class="ma-0" text @click="logout">
      Выход
      <v-icon class="ml-3">fa-sign-out</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
const menu = [
  { title: 'Главная', to: '/' },
  { title: 'Акты', to: '/acts' },
  { title: 'Заключённые пакты', to: '/pacts' },
  { title: 'Пользователи', to: '/users' },
  { title: 'Патрули', to: '/patrouls' },
  { title: 'Типы документов', to: '/types' },
  { title: 'Сформировать отчёт', to: '/reports' },
];

export default {
  name: 'TheToolbarApp',
  data: () => ({ menu }),
  computed: {
    name() {
      return this.$store.getters['auth/getName'];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('unsetUserData');
      this.$store.dispatch('auth/logout');
      this.$nextTick(() => {
        this.$router.push({ name: 'login' });
      });
    },
  },
};
</script>

<style>
  .pa-0 > .v-toolbar__content {
    padding: 0 16px;
  }
</style>
