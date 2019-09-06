<template>
  <v-layout justify-center>
    <v-flex xs5>
      <v-stepper v-model="step" vertical>
        <template v-for="(stepItem, index) in stepper">
          <v-stepper-step
            :key="`header-${stepItem.index}`"
            :step="stepItem.index"
            :complete="stepItem.valid"
            :editable="stepItem.index === step"
          >
            {{ stepItem.title }}
          </v-stepper-step>

          <v-stepper-content
            :key="`content-${index}`"
            :step="stepItem.index"
          >
            <v-form v-model="stepItem.valid">
              <v-layout column>
                <v-flex class="py-5">
                  <component
                    :house-documents.sync="houseDocuments"
                    :is="`step-${stepItem.index}`"
                    :valid="stepItem.valid"
                    :is-edit="isEdit"
                    :pact.sync="pact"
                    :rules="rules"
                  />
                </v-flex>

                <v-flex>
                  <v-btn
                    v-if="index"
                    color="primary"
                    outlined
                    class="mr-4"
                    @click="prevStep"
                  >Назад</v-btn>
                  <v-btn
                    v-if="index !== 3"
                    :disabled="!stepItem.valid || !pact.userId"
                    color="primary"
                    outlined
                    @click="nextStep"
                  >Вперёд</v-btn>
                  <v-btn
                    v-if="index === 3"
                    color="primary"
                    :disabled="!globalValid"
                    @click="nextStep"
                  >{{ currentActionName }}</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-stepper-content>
        </template>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';
import Step3 from './Step3.vue';
import Step4 from './Step4.vue';

const stepper = [
  { index: 1, title: 'Добавление пользователя', valid: false },
  { index: 2, title: 'Добавление заявления', valid: false },
  { index: 3, title: 'Добавление документов на имущество', valid: false },
  { index: 4, title: 'Добавление данных об имуществе', valid: false },
]

export default {
  name: 'PactEdit',
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
  },
  props: {
    id: { pact: Number },
  },
  async created() {
    if (this.isEdit) {
      this.pact = (await this.$store.dispatch('pacts/loadPact', this.id)).data;
    }
  },
  data: vm => ({
    pact: {
      statementNumber: '',
      statement: 0,
      windows: '',
      address: '',
      exists: '',
      userId: 1,
    },
    houseDocuments: {
      asquisitionNumber: '',
      certificateNumber: '',
      transmitNumber: '',
      checkNumber: '',
      asquisition: 0,
      certificate: 0,
      transmit: 0,
      check: 0,
    },

    step: 4,
    stepper,

    loading: false,
    rules: vm.$store.getters.getRules,
  }),
  computed: {
    isEdit() {
      return !!this.id;
    },
    currentTitle() {
      return this.isEdit ? 'Редактирование пакта' : 'Заключение нового пакта'
    },
    currentActionName() {
      return this.isEdit ? 'Редактировать' : 'Создать';
    },
    globalValid() {
      return this.stepper.every(s => s.valid);
    }
  },
  methods: {
    action() {
      if (this.isEdit) this.edit();
      else this.create();
    },

    prevStep() {
      this.step = this.step - 1;
    },
    nextStep() {
      this.step = this.step + 1;
    },

    async create() {
      this.loading = true;
      await this.$store.dispatch('pacts/addPact', this.pact);
      this.loading = false;

      setTimeout(() => {
        this.$router.push('/pacts');
      }, 1000);
    },
    async edit() {
      this.loading = true;
      await this.$store.dispatch('pacts/editPact', {
        data: this.pact,
        id: this.id,
      });
      this.loading = false;

      setTimeout(() => {
        this.$router.push('/pacts');
      }, 1000);
    },
    async createDocument(number, contractType) {
      return (await this.$store.dispatch('contracts/addContract', {
        contractType,
        number,
      })).data.id;
    }
  },
  watch: {
    step(newVal) {
      if (newVal === 3 && !this.pact.statement) {
        this.pact.statement = this.createDocument(this.pact.statementNumber, 3);
      }
      if (newVal === 4 && !this.houseDocuments.check) {
        this.houseDocuments.asquisition = this.createDocument(this.houseDocuments.asquisitionNumber, 2);
        setTimeout(() => {
          this.houseDocuments.certificate = this.createDocument(this.houseDocuments.certificateNumber, 7);
        }, 500);
        setTimeout(() => {
          this.houseDocuments.transmit = this.createDocument(this.houseDocuments.transmitNumber, 4);
        }, 1000);
        setTimeout(() => {
          this.houseDocuments.check = this.createDocument(this.houseDocuments.checkNumber, 1);
        }, 1500);
      }
    },
  },
};
</script>
