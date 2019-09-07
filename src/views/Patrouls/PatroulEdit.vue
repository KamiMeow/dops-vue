<template>
  <v-layout justify-center>
    <v-flex xs5>
      <v-form v-model="valid" @submit.prevent="action">
        <v-card class="pa-4">
          <v-card-title class="mb-5">{{ currentTitle }}</v-card-title>

          <v-card-text>
            <v-text-field
              v-model.trim="patroulNumber"
              label="Номер отряда"
              disabled
              outlined
              rounded
              shaped
            />
            <refresh-select
              v-model="selectedUsers"
              :items="users"
              :rules="[rules.required]"
              label="Выберите пользователей"
              item-value="id"
              item-text="fio"
              with-select-all
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
import { mask } from 'vue-the-mask';
import RefreshSelect from '@/components/RefreshSelect';

export default {
  name: 'PatroulEdit',
  directives: { mask },
  components: { RefreshSelect },
  props: {
    id: { patroul: Number },
  },
  async created() {
    if (this.isEdit) {
      this.patroul = (await this.$store.dispatch('patrouls/loadPatroul', this.id)).data;
    }
    this.loadPatrouls();
    this.loadUsers();
  },
  data: vm => ({
    selectedUsers: [],

    valid: false,
    loading: false,
    rules: vm.$store.getters.getRules,
  }),
  computed: {
    isEdit() {
      return !!this.id;
    },
    currentTitle() {
      return this.isEdit ? 'Редактирование патруля' : 'Создание нового патруля'
    },
    currentActionName() {
      return this.isEdit ? 'Редактировать' : 'Создать';
    },

    patroulNumber() {
      const patroules = this.patrouls.sort((p, n) => n.patroulNumber > p.patroulNumber ? 1: -1);
      if (!patroules.length) return 0;
      return patroules[0].patroulNumber + 1;
    },
    
    patrouls() {
      return this.$store.getters['patrouls/getPatrouls'];
    },
    users() {
      return this.$store.getters['users/getUsers'].filter(u => u.isSotr);
    },
    today() {
      const today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth(),
            yyyy = today.getFullYear();
      
      return [
        `0${dd}`.slice(0, 2),
        `0${mm}`.slice(0, 2),
        yyyy,
      ].join('.');
    }
  },
  methods: {
    action() {
      if (this.isEdit) this.edit();
      else this.create();
    },

    async loadUsers() {
      await this.$store.dispatch('users/loadUsers');
    },
    async loadPatrouls() {
      await this.$store.dispatch('patrouls/loadPatrouls');
    },

    async create() {
      this.loading = true;
      this.selectedUsers.map((user, index) => {
        
        setTimeout(async() => {
          await this.$store.dispatch('patrouls/addPatroul', {
            patroulNumber: this.patroulNumber,
            date: this.today,
            userId: user,
          });
        }, 500 * index);
      })
      this.loading = false;

      setTimeout(() => {
        this.$router.push('/patrouls');
      }, 1000);
    },
    async edit() {
      this.loading = true;
      await this.$store.dispatch('patrouls/editPatroul', {
        data: this.patroul,
        id: this.id,
      });
      this.loading = false;

      setTimeout(() => {
        this.$router.push('/patrouls');
      }, 1000);
    }
  }
};
</script>
