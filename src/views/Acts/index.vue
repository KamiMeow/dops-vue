<template>
  <v-layout wrap>
    <v-flex xs12>
      <sort-bar
        actionText="Добавить нового пользователя"
        title="Пользователи"
        :search.sync="search"
        :asc.sync="asc"
        @add="addAct"
      />
    </v-flex>

    <v-flex xs12 mt-4>
      <v-data-table
        :items-per-page.sync="itemsPerPageOptions[0]"
        :footer-props="{ itemsPerPageOptions }"
        :items="sortedActs"
        :loading="loading"
        :headers="headers"
        :search="search"
        class="custom-elevation"
      >
        <template #item.isTrouble="{ item }">
          <div v-if="item.isTrouble">Сигнализация</div>
          <div v-else>Грабитель</div>
        </template>

        <template #item.actions="{ item }">
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                color="primary"
                text
                icon
                v-on="on"
                @click="editAct(item.id)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            Редактировать
          </v-tooltip>

          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                color="error"
                text
                icon
                v-on="on"
                @click="deleteAct(item.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            Удалить
          </v-tooltip>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import SortBar from '@/components/SortBar';

const headers = [
  { value: 'id', text: 'ID' },
  { value: 'fio', text: 'ФИО клиента' },
  { value: 'displayPatroul', text: 'Отряд' },
  { value: 'isTrouble', text: 'Причина' },
  // { value: 'actions', text: 'События' },
];

export default {
  name: 'ActsPage',
  components: {
    SortBar,
  },
  async created() {
    this.loadUsers();
    this.loadPatrouls();
    this.loadActs();
  },
  data: vm => ({
    search: '',

    asc: false,
    loading: true,

    headers,
    itemsPerPageOptions: vm.$store.getters.getPerPage.table,
  }),
  computed: {
    acts() {
      return this.$store.getters['acts/getActs'];
    },
    sortedActs() {
      const asc = (next, prev) => (next.id > prev.id ? 1 : -1);
      const desc = (next, prev) => (next.id < next.id ? 1 : -1);

      return this.acts
        .map(act => {
          act.displayPatroul = this.getDisplayPatroul(act.patroulId);
          act.fio = this.getUser(act.userId);
          return act;
        })
        .sort(this.asc ? asc : desc);
    },
    
    users() {
      return this.$store.getters['users/getUsers'];
    },
    patrouls() {
      return this.$store.getters['patrouls/getPatrouls'];
    },
    currentPatrouls() {
      const newPatrouls = [];

      this.patrouls.forEach(patroul => {
        const founded = newPatrouls.find(p => p.patroulNumber === patroul.patroulNumber),
              user = this.getUser(patroul.userId);

        if (!!founded) {
          founded.users.push(user);
        } else {
          newPatrouls.push({
            patroulNumber: patroul.patroulNumber,
            date: patroul.date,
            users: [user],
          });
        }
      });

      return newPatrouls.map(p => {
        p.displayPatroul = `${p.patroulNumber} (${p.users.join(', ')})`
        return p;
      });
    },
  },
  methods: {
    async loadActs() {
      this.loading = true;
      await this.$store.dispatch('acts/loadActs');
      this.loading = false;
    },
    async loadUsers() {
      this.$store.dispatch('users/loadUsers');
    },
    async loadPatrouls() {
      await this.$store.dispatch('patrouls/loadPatrouls');
    },

    addAct() {
      this.$router.push('/act/new');
    },
    getUser(userId) {
      if (!userId) return;
      const user = this.users.find(u => u.id === userId);
      if (!user) return;
      return user.fio;
    },
    getDisplayPatroul(patroulId) {
      if (!patroulId) return;
      const patroul = this.currentPatrouls.find(p => p.patroulNumber === patroulId);
      if (!patroul) return;
      return patroul.displayPatroul;
    },

    async editAct(id) {
      this.$router.push(`/act/${id}/edit`);
    },
    async deleteAct(id) {
      await this.$store.dispatch('acts/deleteAct', id);
    },
  },
};
</script>
