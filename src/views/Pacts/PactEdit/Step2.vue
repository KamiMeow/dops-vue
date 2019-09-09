<template>
  <v-layout column>
    <v-text-field
      label="Номер заявления"
      v-model="pact.statementNumber"
      :disabled="!!pact.statement"
      :rules="[rules.required]"
      type="number"
      step="1"
      min="0"
      outlined
      rounded
      shaped
    />

    <v-select
      v-model="pact.tariff"
      :rules="[rules.required]"
      :items="tariffs"
      item-text="name"
      item-value="id"
    >
      <template #item="{ item }">
        {{ item.name }} ({{ Number(item.price).toLocaleString() }} руб.)
      </template>
    </v-select>
  </v-layout>
</template>

<script>
export default {
  name: 'Step2',
  props: {
    isEdit: { type: Boolean },
    rules: { type: Object },
    pact: { type: Object },
  },
  created() {
    this.$store.dispatch('tariffs/loadTariffs');
  },
  computed: {
    tariffs() {
      return this.$store.getters['tariffs/getTariffs'];
    },
  },
  watch: {
    'pact.statementNumber': function (newVal) {
      if (newVal < 0) this.pact.statementNumber = 0;
    },
  },
};
</script>
