<template>
  <v-layout wrap>
    <modal-form
      v-model="typeEditDialog"
      :action-name="!type.id ? 'Создать' : 'Редактировать'"
      title="Добавление нового типа"
      @action="action"
    >
      <type-edit :data="type" ref="typeEdit" />
    </modal-form>

    <v-flex xs12>
      <sort-bar
        actionText="Добавить новый тип"
        title="Типы документов"
        :search.sync="search"
        :asc.sync="asc"
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
          <v-btn
            color="primary"
            text
            @click="editType(item.id)"
          >
            Редактировать
          </v-btn>
          <v-btn
            color="error"
            text
            @click="deleteType(item.id)"
          >
            Удалить
          </v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import ModalForm from '@/components/ModalForm';
import SortBar from '@/components/SortBar';
import TypeEdit from './TypeEdit';

const headers = [
  { value: 'id', text: 'ID' },
  { value: 'name', text: 'Название' },
  { value: 'actions', text: 'Действия' },
];

export default {
  name: 'TypesPage',
  components: {
    SortBar,
    TypeEdit,
    ModalForm,
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('types/loadTypes');
    this.loading = false;
  },
  data: vm => ({
    type: {},
    search: '',

    asc: false,
    typeEditDialog: false,

    headers,
    loading: true,
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
      this.type = {};
      this.typeEditDialog = true;
    },
    async editType(id) {
      this.typeEditDialog = true;
      this.type = (await this.$store.dispatch('types/loadType', id));
    },
    async deleteType(id) {
      await this.$store.dispatch('types/deleteTypes', id);
    },

    action() {
      if (this.type.id) {
        this.$refs.typeEdit.edit(this.type.id);
      }
      else {
        this.$refs.typeEdit.create();
      }
    }
  },
};
</script>
