export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(dialog) {
        this.$emit('input', dialog);
      }
    }
  }
};
