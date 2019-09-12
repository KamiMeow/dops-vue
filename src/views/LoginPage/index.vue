<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center fill-height>
      <v-flex xs5>
        <v-form v-model="valid" @submit.prevent="auth">
          <v-card class="pa-4 custom-elevation">
            <v-card-title class="pb-4">
              Авторизация
            </v-card-title>

            <v-card-text>
              <v-layout column>
                <v-text-field
                  v-model.trim="login"
                  :rules="[rules.required, rules.email]"
                  hint="Введите логин, выданный вам организацией"
                  label="Логин (e-mail)"
                  validate-on-blur
                  outlined
                  rounded
                  shaped
                />
                
                <v-text-field
                  v-model.trim="password"
                  :rules="[rules.required]"
                  hint="Введите пароль, выданный вам организацией"
                  label="Пароль"
                  type="password"
                  validate-on-blur
                  outlined
                  rounded
                  shaped
                />
              </v-layout>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                depressed
                large
              >Войти</v-btn>
            </v-card-actions>

            <v-alert v-show="error" transition="slide-y-transition" type="error">{{ error }}</v-alert>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  created() {
    this.loadUsers();
  },
  data: vm => ({
    password: '',
    login: '',
    error: '',

    valid: true,
    loading: false,
    rules: vm.$store.getters['getRules'],
  }),
  computed: {
    users() {
      return this.$store.getters['users/getUsers'].filter(u => u.isSotr || u.isSotr === 'true');
    },
  },
  methods: {
    async loadUsers() {
      this.$store.dispatch('users/loadUsers');
    },
    auth() {
      this.loading = true;
      const user = this.users.find(u => (u.login === this.login) && (u.password === this.password));
      if (user) {
        this.$store.dispatch('auth/login', user.fio);
        this.$router.push('/');
      }
      else {
        this.error = 'Неверные логин/пароль'
      }
      this.loading = false;
    },
  },
};
</script>
