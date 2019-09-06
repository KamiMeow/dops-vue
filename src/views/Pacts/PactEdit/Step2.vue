<template>
  <v-layout>
    <v-text-field
      label="Номер заявления"
      v-model="pact.statementNumber"
      :rules="[rules.required]"
      :readonly="!!pact.statement"
      type="number"
      step="1"
      min="0"
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
    'pact.statementNumber'(newVal) {
      if (newVal < 0) this.pact.statementNumber = 0;
    },
  },
};
</script>
