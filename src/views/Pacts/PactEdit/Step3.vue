<template>
  <v-layout column>
    <v-text-field
      v-model.trim="houseDocuments.asquisitionNumber"
      :disabled="!!houseDocuments.asquisition"
      :readonly="!!houseDocuments.asquisition"
      :rules="[rules.required]"
      label="Номер свидетельства о приобретении"
      type="number"
      outlined
      rounded
      shaped
      @input="notNull('asquisitionNumber')"
    />
    <v-text-field
      v-model.trim="houseDocuments.certificateNumber"
      :disabled="!!houseDocuments.certificate"
      :readonly="!!houseDocuments.certificate"
      :rules="[rules.required]"
      label="Номер сертификата о покупке"
      type="number"
      outlined
      rounded
      shaped
      @input="notNull('certificateNumber')"
    />
    <v-text-field
      v-model.trim="houseDocuments.transmitNumber"
      :rules="[rules.required]"
      :disabled="!!houseDocuments.transmit"
      :readonly="!!houseDocuments.transmit"
      label="Номер документа о передачи имущества"
      type="number"
      outlined
      rounded
      shaped
      @input="notNull('transmitNumber')"
    />
    <v-text-field
      v-model.trim="houseDocuments.checkNumber"
      :rules="[rules.required]"
      :disabled="!!houseDocuments.check"
      :readonly="!!houseDocuments.check"
      label="Номер банковского чека"
      type="number"
      outlined
      rounded
      shaped
      @input="notNull('checkNumber')"
    />
  </v-layout>
</template>

<script>
export default {
  name: 'Step3',
  props: {
    houseDocuments: { type: Object },
    isEdit: { type: Boolean },
    rules: { type: Object },
    pact: { type: Object },
  },
  methods: {
    notNull(key) {
      if (this.houseDocuments[key] < 0) {
        this.houseDocuments[key] = 0;
      }
    },
  },
};
</script>
