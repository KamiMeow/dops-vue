<template>
  <v-dialog
    v-model="dialog"
    :max-width="maxWidth"
    persistent
  >
    <v-form v-model="valid">
      <v-card class="pa-4">
        <v-card-title class="mb-4">
          <v-layout>
            <v-flex grow>
              <slot name="title">
                {{ title }}
              </slot>
            </v-flex>

            <v-flex shrink>
              <v-btn @click="closeDialog" color="error" icon>
                <v-icon>close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>

        <v-card-text>
          <slot />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            text
            @click="closeDialog"
          >Отмена</v-btn>
          <v-btn
            color="accent"
            :disabled="!valid"
            depressed
            @click="$emit('action')"
          > 
            <slot name="action-name">
              {{ actionName }}
            </slot>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalForm',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: [Number, String],
      default: 650,
    },
    title: { type: String },
    actionName: { type: String },
  },
  data: () => ({
    valid: false,
  }),
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
  methods: {
    closeDialog() {
      this.dialog
    }
  }
};
</script>