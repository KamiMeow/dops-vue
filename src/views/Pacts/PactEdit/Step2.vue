<template>
  <v-layout>
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
  watch: {
    'pact.statementNumber': function (newVal) {
      if (newVal < 0) this.pact.statementNumber = 0;
    },
  },
};
</script>
