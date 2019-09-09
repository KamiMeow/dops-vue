<template>
  <v-layout wrap>
    <documents-dialog
      v-model="documentDialog"
      :documents="currentDocuments"
      :get-document-number="getDocumentNumber"
    />
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
        <template #item.period="{ item }">
          {{ item.period }} мес.
        </template>

        <template #item.documents="{ item }">
          <a
            v-if="haveDocuments(item.userId)"
            href="#"
            @click="getCurrentDocuments(item.userId)"
          >Просмотреть документы</a>
          <div class="grey--text" v-else><i>Документы не добавлены</i></div>
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
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            Просмотреть
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
import DocumentsDialog from './DocumentsDialog';

const headers = [
  { value: 'id', text: 'ID' },
  { value: 'fio', text: 'ФИО пользователя' },
  { value: 'statementNumber', text: 'Номер заявления' },
  { value: 'windows', text: 'Количество окон' },
  { value: 'exists', text: 'Количество выходов' },
  { value: 'address', text: 'Адрес' },
  { value: 'documents', text: 'Документы' },
  { value: 'tariff', text: 'Тариф' },
  { value: 'period', text: 'Срок оформления' },
  // { value: 'plan', text: 'План' },
  { value: 'actions', text: 'События', sortable: false },
];

export default {
  name: 'PactsPage',
  components: {
    SortBar,
    DocumentsDialog,
  },
  async created() {
    this.loadPacts();
    this.loadUsers();
    this.loadTariffs();
    this.loadContracts();
    this.loadHouseDocuments();
  },
  data: vm => ({
    search: '',
    currentDocuments: {
      asquisition: 0,
      certificate: 0,
      transmit: 0,
      check: 0,
    },
    documentDialog: false,

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

      return this.pacts
        .map((p) => {
          p.fio = this.getUserFIO(p.userId);
          p.tariff = this.getTariff(p.tariff);
          p.statementNumber = this.getDocumentNumber(p.statement);
          return p;
        })
        .sort(this.asc ? asc : desc);
    },

    users() {
      return this.$store.getters['users/getUsers'];
    },
    tariffs() {
      return this.$store.getters['tariffs/getTariffs'];
    },
    contracts() {
      return this.$store.getters['contracts/getContracts'];
    },
    houseDocuments() {
      return this.$store.getters['houseDocuments/getHouseDocuments'];
    },
  },
  methods: {
    async loadPacts() {
      this.loading = true;
      await this.$store.dispatch('pacts/loadPacts');
      this.loading = false;
    },
    async loadUsers() {
      this.$store.dispatch('users/loadUsers');
    },
    async loadTariffs() {
      this.$store.dispatch('tariffs/loadTariffs');
    },
    async loadContracts() {
      this.$store.dispatch('contracts/loadContracts');
    },
    async loadHouseDocuments() {
      this.$store.dispatch('houseDocuments/loadHouseDocuments');
    },

    addPact() {
      this.$router.push('/pact/new');
    },
    getDocumentNumber(id) {
      if (!id) return;
      const value = this.contracts.find(v => v.id === id);
      if (!value) return;
      return value.number;
    },
    getUserFIO(id) {
      if (!id) return;
      const value = this.users.find(v => v.id === id);
      if (!value) return;
      return value.fio;
    },
    getTariff(id) {
      if (!id) return;
      const value = this.tariffs.find(v => v.id === id);
      if (!value) return;
      return value.name;
    },
    getCurrentDocuments(userId) {
      this.documentDialog = true;
      this.currentDocuments = this.houseDocuments.find(d => d.userId === userId);
    },
    haveDocuments(userId) {
      return !!this.houseDocuments.find(d => d.userId === userId);
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
