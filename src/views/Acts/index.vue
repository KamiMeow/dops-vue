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
        <template #item.phone="{ item }">
          +7 {{ item.phone }}
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
  { value: 'fio', text: 'ФИО' },
  { value: 'phone', text: 'Телефон' },
  { value: 'inn', text: 'ИНН' },
  { value: 'serialPassport', text: 'Серия паспорта' },
  { value: 'numberPassport', text: 'Номер паспорта' },
  { value: 'actions', text: 'События' },
];

export default {
  name: 'ActsPage',
  components: {
    SortBar,
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('acts/loadActs');
    this.loading = false;
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

      return this.acts.sort(this.asc ? asc : desc);
    },
  },
  methods: {
    addAct() {
      this.$router.push('/act/new');
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
