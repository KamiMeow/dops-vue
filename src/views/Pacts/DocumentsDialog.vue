<template>
  <v-dialog v-model="dialog" max-width="700">
    <v-card class="pa-4">
      <v-card-title>Документы заявителя</v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-content class="font-weight-bold">Номер свидетельства о приобретении</v-list-item-content>

            <v-list-item-content class="align-end">
              <v-list-item-title class="text-right font-weight-medium">{{ getDocumentNumber(documents.asquisition) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content class="font-weight-bold">Номер сертификата о покупке</v-list-item-content>

            <v-list-item-content class="align-end">
              <v-list-item-title class="text-right font-weight-medium">{{ getDocumentNumber(documents.certificate) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content class="font-weight-bold">Номер документа о передачи имущества</v-list-item-content>

            <v-list-item-content class="align-end">
              <v-list-item-title class="text-right font-weight-medium">{{ getDocumentNumber(documents.transmit) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content class="font-weight-bold">Номер банковского чека</v-list-item-content>

            <v-list-item-content class="align-end">
              <v-list-item-title class="text-right font-weight-medium">{{ getDocumentNumber(documents.check) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DocumentsDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    documents: { type: Object },
    getDocumentNumber: { type: Function },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(dialog) {
        this.$emit('input', dialog);
      },
    },
  },
};
</script>
