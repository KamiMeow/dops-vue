<template>
  <v-layout justify-center>
    <v-flex xs5>
      <v-layout wrap>
        <v-flex
          v-for="item in items"
          :key="item.to"
          class="text-center"
          xs6
          @click="openLink(item.to)"
        >
          <div class="title">{{ item.title }}</div>
          <v-card
            :color="item.color"
            class="elevation-0 py-4 px-2 ma-5 mt-2 cursor--pointer"
            v-ripple
          >
            <v-responsive :aspect-ratio="4/3">
              <v-layout fill-height justify-center align-center>
                <v-icon class="white--text" style="font-size: 75px !important">{{ item.icon }}</v-icon>
              </v-layout>
            </v-responsive>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
const items = [
  { title: 'Заключить пакт', icon: 'mdi-file-document-box-multiple', to: 'pact/new', color: 'primary' },
  { title: 'Создать патруль', icon: 'mdi-shield-home', to: 'patroule/new', color: 'accent' },
  { title: 'Составить акт', icon: 'mdi-file-document-box-plus', to: 'act/new', color: 'secondary' },
  { title: 'Добавить пользователя', icon: 'mdi-account-plus', to: 'user/new', color: 'grey' },
];

export default {
  name: 'Dashboard',
  data: () => ({
    items,
  }),
  methods: {
    openLink(path) {
      this.$router.push({ path });
    },
  }
};
</script>
