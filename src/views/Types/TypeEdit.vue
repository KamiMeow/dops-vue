<template>
  <v-text-field
    v-model.trim="data.name"
    :rules="[rules.required]"
    label="Название типа"
    outlined
    rounded
    shaped
  />
</template>

<script>
export default {
  name: 'TypeEdit',
  props: {
    data: { type: Object },
  },
  data: vm => ({
    _name: '',
    rules: vm.$store.getters.getRules,
  }),
  computed: {
    name: {
      get() {
        return this.data.name || this._name;
      },
      set(name) {
        this.data
      }
    }
  },
  methods: {
    create() {
      this.$store.dispatch('types/addType', this.name);
    },
    edit(id) {
      this.$store.dispatch('types/addType', {
        name: this.name,
        id,
      });
    }
  }
};
</script>
