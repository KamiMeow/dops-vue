<template>
  <v-layout justify-center>
    <v-flex xs5>
      <v-form v-model="valid" @submit.prevent="action">
        <v-card class="pa-4">
          <v-card-title class="mb-5">{{ currentTitle }}</v-card-title>

          <v-card-text>
            <v-autocomplete
              v-model="act.userId"
              :rules="[rules.required]"
              :items="clients"
              label="Клиент, в чьё имение был вызов"
              item-value="id"
              item-text="fio"
            />
            <v-autocomplete
              v-model="act.patroulId"
              :rules="[rules.required]"
              :items="currentPatrouls"
              item-value="patroulNumber"
              item-text="displayPatroul"
              label="Номер отряда"
            />
            <v-switch
              label="Проблема с сигнализацией"
              v-model="act.isTrouble"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="primary"
              type="submit"
              depressed
              outlined
              rounded
              large
            >{{ currentActionName }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mask } from 'vue-the-mask';

export default {
  name: 'ActEdit',
  directives: { mask },
  props: {
    id: { act: Number },
  },
  async created() {
    if (this.isEdit) {
      this.act = (await this.$store.dispatch('acts/loadAct', this.id)).data;
    }
    this.loadUsers();
    this.loadPatrouls();
  },
  data: vm => ({
    act: {
      isTrouble: '',
      patroulId: '',
      userId: '',
    },
    valid: false,
    loading: false,
    rules: vm.$store.getters.getRules,
  }),
  computed: {
    isEdit() {
      return !!this.id;
    },
    currentTitle() {
      return this.isEdit ? 'Редактирование типа' : 'Создание нового типа';
    },
    currentActionName() {
      return this.isEdit ? 'Редактировать' : 'Создать';
    },

    users() {
      return this.$store.getters['users/getUsers'];
    },
    clients() {
      return this.users.filter(u => !u.isSotr);
    },

    patrouls() {
      return this.$store.getters['patrouls/getPatrouls'];
    },
    currentPatrouls() {
      const newPatrouls = [];

      this.patrouls.forEach((patroul) => {
        const founded = newPatrouls.find(p => p.patroulNumber === patroul.patroulNumber);
        const user = this.getUser(patroul.userId);

        if (founded) {
          founded.users.push(user);
        } else {
          newPatrouls.push({
            patroulNumber: patroul.patroulNumber,
            date: patroul.date,
            users: [user],
          });
        }
      });

      return newPatrouls.map((p) => {
        p.displayPatroul = `${p.patroulNumber} (${p.users.join(', ')})`;
        return p;
      });
    },
  },
  methods: {
    async loadUsers() {
      this.$store.dispatch('users/loadUsers');
    },
    async loadPatrouls() {
      await this.$store.dispatch('patrouls/loadPatrouls');
    },

    action() {
      if (this.isEdit) this.edit();
      else this.create();
    },
    getUser(userId) {
      if (!userId) return;
      const user = this.users.find(u => u.id === userId);
      if (!user) return;
      return user.fio;
    },

    async create() {
      this.loading = true;
      await this.$store.dispatch('acts/addAct', this.act);
      this.loading = false;

      setTimeout(() => {
        this.$router.push('/acts');
      }, 1000);
    },
    async edit() {
      this.loading = true;
      await this.$store.dispatch('acts/editAct', {
        data: this.act,
        id: this.id,
      });
      this.loading = false;

      setTimeout(() => {
        this.$router.push('/acts');
      }, 1000);
    },
  },
};
</script>
