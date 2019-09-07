<template>
  <v-layout justify-center>
    <v-flex xs5>
      <v-form v-model="valid" @submit.prevent="action">
        <v-card class="pa-4">
          <v-card-title class="mb-5">{{ currentTitle }}</v-card-title>

          <v-card-text>
            <v-text-field
              v-model.trim="type.name"
              :rules="[rules.required]"
              label="Название типа"
              outlined
              rounded
              shaped
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="primary"
              type="submit"
              depressed
              outlined
              rounded
              large
            >{{ currentActionName }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'TypeEdit',
  props: {
    id: { type: Number },
  },
  async created() {
    if (this.isEdit) {
      this.type = (await this.$store.dispatch('types/loadType', this.id)).data;
    }
  },
  data: vm => ({
    type: {
      name: '',
    },
    valid: false,
    loading: false,
    rules: vm.$store.getters.getRules,
  }),
  computed: {
    isEdit() {
      return !!this.id;
    },
    currentTitle() {
      return this.isEdit ? 'Редактирование типа' : 'Создание нового типа';
    },
    currentActionName() {
      return this.isEdit ? 'Редактировать' : 'Создать';
    },
  },
  methods: {
    action() {
      if (this.isEdit) this.edit();
      else this.create();
    },
    async create() {
      this.loading = true;
      await this.$store.dispatch('types/addType', this.type);
      this.loading = false;

      setTimeout(() => {
        this.$router.push('/types');
      }, 1000);
    },
    async edit() {
      this.loading = true;
      await this.$store.dispatch('types/editType', {
        dat: this.type,
        id: this.id,
      });
      this.loading = false;

      setTimeout(() => {
        this.$router.push('/types');
      }, 1000);
    },
  },
};
</script>
