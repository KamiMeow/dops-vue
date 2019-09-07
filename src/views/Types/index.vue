<template>
  <v-layout wrap>
    <v-flex xs12>
      <sort-bar
        actionText="Добавить новый тип"
        title="Типы документов"
        :search.sync="search"
        :asc.sync="asc"
        @import-excel="importExcel"
        @add="addType"
      />
    </v-flex>

    <v-flex xs12 mt-4>
      <v-data-table
        :items-per-page.sync="itemsPerPageOptions[0]"
        :footer-props="{ itemsPerPageOptions }"
        :items="sortedTypes"
        :loading="loading"
        :headers="headers"
        :search="search"
        class="custom-elevation"
      >
        <template #item.actions="{ item }">
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                color="primary"
                text
                icon
                v-on="on"
                @click="editType(item.id)"
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
                @click="deleteType(item.id)"
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
  { value: 'name', text: 'Название' },
  { value: 'actions', text: 'Действия' },
];

export default {
  name: 'TypesPage',
  components: {
    SortBar,
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('types/loadTypes');
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
    types() {
      return this.$store.getters['types/getTypes'];
    },
    sortedTypes() {
      const asc = (next, prev) => (next.id > prev.id ? 1 : -1);
      const desc = (next, prev) => (next.id < next.id ? 1 : -1);

      return this.types.sort(this.asc ? asc : desc);
    },
  },
  methods: {
    addType() {
      this.$router.push('/type/new');
    },
    async editType(id) {
      this.$router.push(`/type/${id}/edit`);
    },
    async deleteType(id) {
      await this.$store.dispatch('types/deleteType', id);
    },

    importExcel(data) {
      const keys = data.splice(0, 1).flat();

      console.log(keys);
      console.log(data);

      const newData = [];
      data.forEach((item, index) => {
        const element = {};
        keys.forEach((key, index) => {
          element[key] = item[index];
        });
        newData.push(element);
        setTimeout(() => {
          this.$store.dispatch('types/addType', element);
        }, 500 * index);
      });
      console.log(newData);
    },
  },
};
</script>
