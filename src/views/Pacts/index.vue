<template>
  <v-layout wrap>
    <v-flex xs12>
      <sort-bar
        actionText="Заключить новый пакт"
        title="Пакты"
        :search.sync="search"
        :asc.sync="asc"
        @add="addPact"
      />
    </v-flex>

    <v-flex xs12 mt-4>
      <v-data-table
        :items-per-page.sync="itemsPerPageOptions[0]"
        :footer-props="{ itemsPerPageOptions }"
        :items="sortedPacts"
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
                @click="editPact(item.id)"
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
                @click="deletePact(item.id)"
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
  { value: 'userId', text: 'ID пользователя' },
  { value: 'statement', text: 'ID заявления' },
  { value: 'windows', text: 'Количество окон' },
  { value: 'exists', text: 'Количество выходов' },
  { value: 'address', text: 'Адрес' },
  // { value: 'plan', text: 'План' },
  { value: 'actions', text: 'События' },
];

export default {
  name: 'PactsPage',
  components: {
    SortBar,
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('pacts/loadPacts');
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
    pacts() {
      return this.$store.getters['pacts/getPacts'];
    },
    sortedPacts() {
      const asc = (next, prev) => (next.id > prev.id ? 1 : -1);
      const desc = (next, prev) => (next.id < next.id ? 1 : -1);

      return this.pacts.sort(this.asc ? asc : desc);
    },
  },
  methods: {
    addPact() {
      this.$router.push('/pact/new');
    },
    async editPact(id) {
      this.$router.push(`/pact/${id}/edit`);
    },
    async deletePact(id) {
      await this.$store.dispatch('pacts/deletePact', id);
    },
  },
};
</script>
