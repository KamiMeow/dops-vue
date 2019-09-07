<template>
  <div>
    <v-layout v-if="isEdit" column>
      <v-autocomplete
        v-model="pact.userId"
        :items="users"
        item-value="id"
        item-text="fio"
        readonly
      />
    </v-layout>

    <v-slide-y-transition v-else group>
      <v-layout v-if="!isCreateUser" key="baka">
        <v-autocomplete
          v-model="pact.userId"
          :items="users"
          label="Выберите существующего пользователя"
          item-value="id"
          item-text="fio"
        >
          <template #no-data>
            <div
              @click="isCreateUser = true"
              class="pa-4 cursor--pointer"
            >Создать нового пользователя</div>
          </template>
        </v-autocomplete>
      </v-layout>

      <v-layout v-else key="boo" wrap>
        <v-layout column>
          <v-text-field
            v-model.trim="user.fio"
            :rules="[rules.required, rules.fio]"
            label="ФИО"
            outlined
            rounded
            shaped
          />

          <v-text-field
            v-model.trim="user.phone"
            :rules="[rules.required, rules.phone]"
            v-mask="'(###) ###-##-##'"
            label="Телефон"
            prefix="+7 "
            outlined
            rounded
            shaped
          />

          <v-text-field
            v-model.trim="user.inn"
            :rules="[rules.required, rules.inn]"
            v-mask="'##### #####'"
            label="ИНН"
            outlined
            rounded
            shaped
          />

          <v-layout>
            <v-text-field
              v-model.trim="user.serialPassport"
              :rules="[rules.required, rules.seria]"
              label="Серия паспорта"
              v-mask="'####'"
              class="mr-4"
              outlined
              rounded
              shaped
            />

            <v-text-field
              v-model.trim="user.numberPassport"
              :rules="[rules.required, rules.numberPassport]"
              label="Номер паспорта"
              v-mask="'######'"
              outlined
              rounded
              shaped
            />
          </v-layout>
        </v-layout>

        <v-flex XS12>
          <v-btn
            :loading="loading"
            color="primary"
            text
            @click="isCreateUser = false"
          >Выбрать пользователя</v-btn>
          <v-btn
            :loading="loading"
            :disabled="!valid"
            color="primary"
            depressed
            @click="createUser"
          >Создать</v-btn>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';

export default {
  name: 'Step1',
  directives: { mask },
  props: {
    isEdit: { type: Boolean },
    valid: { type: Boolean },
    rules: { type: Object },
    pact: { type: Object },
  },
  created() {
    this.loadUsers();
  },
  data: () => ({
    isCreateUser: false,
    loading: false,

    user: {
      serialPassport: '',
      numberPassport: '',
      isSotr: false,
      phone: '',
      inn: '',
      fio: '',
    },
  }),
  computed: {
    users() {
      return this.$store.getters['users/getUsers'].filter(u => !u.isSotr);
    },
  },
  methods: {
    async loadUsers() {
      this.$store.dispatch('users/loadUsers');
    },
    async createUser() {
      this.loading = true;
      this.pact.userId = (await this.$store.dispatch('users/addUser', this.user)).data.id;
      this.loading = false;
      setTimeout(() => {
        this.isCreateUser = false;
      }, 500);
    },
  },
};
</script>
