<template>
  <v-layout wrap>
    <v-flex grow class="display-1 font-weight-regular">
      <slot name="title">{{ title }}</slot>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            class="mx-3"
            color="accent"
            outlined
            rounded
            v-on="on"
            @click="$emit('add')"
          >
            <!-- x-small
            fab -->
            <!-- <v-icon>add</v-icon> -->
            Создать
          </v-btn>
        </template>
        {{ actionText }}
      </v-tooltip>
    </v-flex>

    <v-flex shrink>
      <v-text-field
        v-model="searchComp"
        label="Поиск"
        class="mt-0 pt-0 icon-small"
        append-icon="fa-search"
      />
    </v-flex>

    <v-flex shrink>
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
            <!-- <v-icon>exchange</v-icon> -->
          </v-btn>
        </template>
        Сначала {{ ascComp ? 'новые' : 'старые' }}
      </v-tooltip>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'SortBar',
  props: {
    search: {
      type: String,
      default: '',
    },
    actionText: {
      type: String,
      default: 'Создать',
    },
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
};
</script>
