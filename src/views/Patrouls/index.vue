<template>
  <v-layout wrap>
    <v-flex xs12>
      <sort-bar
        actionText="Создать патруль"
        title="Патрули"
        :search.sync="search"
        :asc.sync="asc"
        @add="addPatroul"
      />
    </v-flex>

    <v-flex xs12 mt-4>
      <v-data-table
        :items-per-page.sync="itemsPerPageOptions[0]"
        :footer-props="{ itemsPerPageOptions }"
        :items="currentPatrouls"
        :loading="loading"
        :headers="headers"
        :search="search"
        class="custom-elevation"
      >
        <template #item.users="{ item }">
          {{ item.users.join(', ') }}
        </template>

        <template #item.actions="{ item }">
          <!-- <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                color="primary"
                text
                icon
                v-on="on"
                @click="editPatroul(item.id)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            Редактировать
          </v-tooltip> -->

          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                color="error"
                text
                icon
                v-on="on"
                @click="deletePatroul(item.id)"
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
  { value: 'patroulNumber', text: 'Номер отряда' },
  { value: 'users', text: 'Отряд' },
  { value: 'date', text: 'Дата' },
  // { value: 'actions', text: 'События' },
];

export default {
  name: 'PatroulsPage',
  components: {
    SortBar,
  },
  async created() {
    this.loadPatrouls();
    this.loadUsers();
  },
  data: vm => ({
    search: '',

    asc: false,
    loading: true,

    headers,
    itemsPerPageOptions: vm.$store.getters.getPerPage.table,
  }),
  computed: {
    patrouls() {
      return this.$store.getters['patrouls/getPatrouls'];
    },
    users() {
      return this.$store.getters['users/getUsers'];
    },
    currentPatrouls() {
      const newPatrouls = [];
      const asc = (next, prev) => (next.patroulNumber > prev.patroulNumber ? 1 : -1);
      const desc = (next, prev) => (next.patroulNumber < prev.patroulNumber ? 1 : -1);

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
      return newPatrouls.sort(this.asc ? asc : desc);
    },
  },
  methods: {
    async loadPatrouls() {
      this.loading = true;
      await this.$store.dispatch('patrouls/loadPatrouls');
      this.loading = false;
    },
    async loadUsers() {
      await this.$store.dispatch('users/loadUsers');
    },

    addPatroul() {
      this.$router.push('/patroul/new');
    },
    getUser(userId) {
      if (!userId) return;
      const user = this.users.find(u => u.id === userId);
      if (!user) return;
      return user.fio;
    },

    async editPatroul(id) {
      this.$router.push(`/patroul/${id}/edit`);
    },
    async deletePatroul(id) {
      await this.$store.dispatch('patrouls/deletePatroul', id);
    },
  },
};
</script>
