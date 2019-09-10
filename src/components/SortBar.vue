<template>
  <v-layout wrap>
    <v-flex grow class="display-1 font-weight-regular">
      <v-layout>
        <slot name="title">{{ title }}</slot>
        <v-tooltip top v-if="!withoutAction">
          <template #activator="{ on }">
            <v-btn
              class="mx-3"
              color="accent"
              outlined
              rounded
              v-on="on"
              small
              fab
              @click="$emit('add')"
            >
              <v-icon>mdi-plus</v-icon>
              <!-- Создать -->
            </v-btn>
          </template>
          {{ actionText }}
        </v-tooltip>

        <v-tooltip top v-if="!notImport">
          <template #activator="{ on }">
            <v-btn
              class="mx-3"
              color="secondary"
              outlined
              rounded
              v-on="on"
              small
              fab
              @click="$refs.inputCsvUpload.click()"
            >
              <v-icon>mdi-file-excel</v-icon>
            </v-btn>
            <input v-show="false" ref="inputCsvUpload" type="file" @change="importExcel">
          </template>
          Импорт из excel
        </v-tooltip>

        <report-export :report="report">
          <v-tooltip top v-if="exportExcel">
            <template #activator="{ on }">
              <v-btn
                class="mx-3"
                color="secondary"
                outlined
                rounded
                v-on="on"
                small
                fab
                @click="$emit('export-excel')"
              >
                <v-icon>mdi-file-excel-outline</v-icon>
              </v-btn>
            </template>
            Экспорт в excel
          </v-tooltip>
        </report-export>
      </v-layout>
    </v-flex>

    <v-flex shrink v-if="!withoutControls">
      <v-text-field
        v-model="searchComp"
        label="Поиск"
        class="mt-0 pt-0 icon-small"
        append-icon="mdi-search"
      />
    </v-flex>

    <v-flex shrink v-if="!withoutControls">
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            style="transform: rotate(90deg)"
            color="primary"
            class="ml-2 mr-4"
            large
            icon
            v-on="on"
            @click="ascComp = !ascComp"
          >
            <v-icon>mdi-autorenew</v-icon>
          </v-btn>
        </template>
        Сначала {{ ascComp ? 'новые' : 'старые' }}
      </v-tooltip>
    </v-flex>
  </v-layout>
</template>

<script>
import XLSX from 'xlsx';
import ReportExport from '@/components/ReportExport';

export default {
  name: 'SortBar',
  components: { ReportExport },
  props: {
    search: {
      type: String,
      default: '',
    },
    actionText: {
      type: String,
      default: 'Создать',
    },
    report: { type: Object },
    withoutControls: { type: Boolean },
    withoutAction: { type: Boolean },
    exportExcel: { type: Boolean },
    notImport: { type: Boolean },
    title: { type: String },
    asc: { type: Boolean },
  },
  computed: {
    searchComp: {
      get() {
        return this.search;
      },
      set(search) {
        this.$emit('update:search', search);
      },
    },
    ascComp: {
      get() {
        return this.asc;
      },
      set(asc) {
        this.$emit('update:asc', asc);
      },
    },
    active: {
      get() {
        return this.type;
      },
      set(type) {
        this.$emit('update:type', type);
      },
    },

    isCard() {
      return this.type === 'card';
    },
    isTable() {
      return this.type === 'table';
    },
  },
  methods: {
    importExcel({ target }) {
      const { files } = target;
      if (files && files[0]) this.parseExcel(files[0]);
    },
    parseExcel(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const { result } = e.target;
        const read = XLSX.read(result, { type: 'binary' });
        const name = read.SheetNames[0];
        const ws = read.Sheets[name];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        console.log(data);
        this.$emit('import-excel', data);
      };
      reader.readAsBinaryString(file);
    },
  },
};
</script>
