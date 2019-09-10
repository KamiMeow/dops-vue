<template>
  <v-layout wrap>
    <v-flex xs12>
      <sort-bar
        :searck.sync="search"
        :asc.sync="asc"
        title="Отчёт"
        without-action
        export-excel
        not-import
        :report="globalReport"
      />
    </v-flex>

    <v-flex xs12 class="my-5">
      <v-layout justify-space-around>
        <v-flex shrink class="display-1">Выручка: 
          <span class="primary--text">{{ Number(currentBudget).toLocaleString('ru-Ru') }}</span>
        </v-flex>
        <v-flex shrink class="display-1">НДС: 
          <span class="primary--text">{{ Number(budgetWithNDC).toLocaleString('ru-Ru') }}</span>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12 class="my-4">
      <v-data-table
        :items-per-page.sync="itemsPerPageOptions[0]"
        :footer-props="{ itemsPerPageOptions }"
        :loading="loading"
        :headers="headers"
        :search="search"
        :items="report"
        class="custom-elevation"
      >
        <template #item.summ="{ item }">
          {{ Number(item.summ).toLocaleString('ru-Ru') }}
        </template>
      </v-data-table>
    </v-flex>

    <v-flex xs12 class="my-5 headline">
      Всего записей <strong>{{ report.length }}</strong>, на суммму <strong>{{ Number(currentBudget).toLocaleString('ru-Ru') }}</strong>
      <div class="mt-3">
        <strong>{{ russianBudget }}</strong>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { numberToString } from './converter';
import SortBar from '@/components/SortBar';

const headers = [
  { value: 'id', text: 'ID' },
  { value: 'statement', text: 'Номер заявления' },
  { value: 'fio', text: 'ФИО клиента' },
  { value: 'tariff', text: 'Тарифный план' },
  { value: 'tariffMonth', text: 'Плата за месяц' },
  { value: 'period', text: 'Срок оформления' },
  { value: 'summ', text: 'Плата за весь период' },
];

export default {
  name: 'Reports',
  components: { SortBar },
  created() {
    this.loadPacts();
  },
  data: vm => ({
    search: '',

    asc: false,
    loading: true,

    headers,
    itemsPerPageOptions: vm.$store.getters.getPerPage.table,
  }),
  computed: {
    globalReport() {
      return {
        russianBudget: this.russianBudget, 
        budgetWithNDC: this.budgetWithNDC,
        budget: this.currentBudget,
        items: this.report,
      };
    },
    report() {
      const asc = (next, prev) => (next.id > prev.id ? 1 : -1);
      const desc = (next, prev) => (next.id < next.id ? 1 : -1);

      return this.pacts
        .map((pact, index) => ({
          id: index + 1,
          statement: this.getDocumentNumber(pact.statement),
          fio: this.getUserFIO(pact.userId),
          tariff: this.getTariff(pact.tariff).name,
          tariffMonth: Number(this.getTariff(pact.tariff).price).toLocaleString('ru-Ru'),
          period: pact.period,
          summ: this.getCurentSumm(pact.tariff, pact.period),
        }))
        .sort(this.asc ? asc : desc);
    },

    currentBudget() {
      return this.report.reduce((summ, current) => {
        return summ + Number(current.summ);
      }, 0);
    },
    russianBudget() {
      return numberToString(this.currentBudget);
    },
    budgetWithNDC() {
      return (13 * this.currentBudget) / 100;
    },

    users() {
      return this.$store.getters['users/getUsers'];
    },
    tariffs() {
      return this.$store.getters['tariffs/getTariffs'];
    },
    pacts() {
      return this.$store.getters['pacts/getPacts'];
    },
    contracts() {
      return this.$store.getters['contracts/getContracts'];
    },
  },
  methods: {
    async exportExcel() {
      /// export here...
    },

    convertArrayOfObjectsToCSV(args) {
      let result, ctr, keys, columnDelimiter, lineDelimiter, data;

      data = args.data || null;
      if (data == null || !data.length) return null

      columnDelimiter = args.columnDelimiter || ";";
      lineDelimiter = args.lineDelimiter || "\n";

      result = "";
      result += Object.keys(data[0]).join(columnDelimiter);
      result += lineDelimiter;

      data.forEach(item => {
        ctr = 0;
        Object.values(item).forEach(value => {
          if (ctr > 0) result += columnDelimiter;

          result += value;
          ctr++;
        });
        result += lineDelimiter;
      });

      return result;
    },
    downloadCSV(args) {
      let data, filename, link;
      let csv = this.convertArrayOfObjectsToCSV({
        data: this.report
      });
      if (csv == null) return;

      filename = args.filename || "export.csv";

      if (!csv.match(/^data:text\/csv/i)) {
        csv = "data:text/csv;," + csv;
      }
      data = encodeURI(csv);

      link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", filename);
      link.click();
    },

    async loadPacts() {
      this.loading = true;
      this.$store.dispatch('pacts/loadPacts');
      this.loadContracts();
      this.loadTariffs();
      this.loadTariffs();
      this.loadUsers();

      this.loading = false;
    },
    async loadTariffs() {
      this.$store.dispatch('tariffs/loadTariffs');
    },
    async loadUsers() {
      this.$store.dispatch('users/loadUsers');
    },
    async loadContracts() {
      this.$store.dispatch('contracts/loadContracts');
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
      return value;
    },

    getCurentSumm(tarrifId, period) {
      const tariff = this.getTariff(tarrifId);
      if (tariff){
        return Number(tariff.price) * Number(period);
      }
    }
  },
};
</script>
 