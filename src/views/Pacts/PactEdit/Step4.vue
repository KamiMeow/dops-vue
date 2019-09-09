<template>
  <v-layout column>
    <v-layout>
      <v-text-field
        v-model="pact.exists"
        :rules="[rules.required]"
        label="Количество входов"
        class="mr-4"
        type="number"
        min="0"
        outlined
        rounded
        shaped
      />
      <v-text-field
        v-model="pact.windows"
        :rules="[rules.required]"
        label="Количество окон"
        type="number"
        min="0"
        outlined
        rounded
        shaped
      />
    </v-layout>
    <v-text-field
      v-model="pact.address"
      label="Адрес"
      :rules="[rules.required]"
      outlined
      rounded
      shaped
    />

    <v-flex xs12 v-if="!pact.plan">
      <v-responsive :aspect-ratio="17/7" class="video-placeholder">
        <v-layout fill-height justify-center align-center column>
          <vue-dropzone
            id="dropzone"
            ref="myVueDropzone"
            :options="dropzoneOptions"
            duplicate-check
            @vdropzone-complete="uploadFile"
          />
        </v-layout>
      </v-responsive>
    </v-flex>


    <v-flex xs12 v-else>
      <v-layout wrap justify-end>
        <v-flex xs12>
          <v-img
            class="video-placeholder"
            :aspect-ratio="17/7"
            :src="pact.plan"
            contain
          />
        </v-flex>
        <v-flex shrink>
          <v-btn
            color="error"
            depressed
            class="mt-4"
            @click="clearPhoto"
          >Удалить</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name: 'Step4',
  props: {
    isEdit: { type: Boolean },
    rules: { type: Object },
    pact: { type: Object },
  },
  components: {
    vueDropzone: vue2Dropzone,
  },
  data: () => ({
    dropzoneOptions: {
      paramName: 'image',
      acceptedFiles: 'image/*',
      url: 'https://httpbin.org/post',

      maxFiles: 1,
      maxFilesize: 2,

      addRemoveLinks: true,
      withCredentials: true,
      thumbnailWidth: null,
      thumbnailHeight: null,
      createImageThumbnails: false,

      dictRemoveFile: 'Удалить',
      dictCancelUpload: 'Отменить загрузку',
      dictInvalidFileType: 'Нужно загрузить изображение',

      dictDefaultMessage:
        `
          <i class="mb-2 v-icon notranslate mdi mdi-cloud theme--light primary--text" style="font-size: 80px !important;"></i>
          <br>
          <div class="title font-weight-regular">Кликните или просто перетащите в это поле видеофайл</div>
        `,
      dictResponseError:
        'Возникла проблема на сервере. Свяжитесь с нами или попробуйте позже',
      dictMaxFilesExceeded:
        'Можно загрузить только один файл. Удалите лишний',
      dictFileTooBig:
        'Размер файла должен быть меньше 2 мегабайт',
    },
  }),
  methods: {
    clearPhoto() {
      this.pact.plan = null;

      if (this.$refs.dropzone) {
        this.$refs.dropzone.removeAllFiles();
      }
    },

    uploadFile(file) {
      const reader = new FileReader;
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e);
        console.log(e.target.result);
        const image = e.target.result;
        this.pact.plan = image;
        // const blob = new Blob([e], { type: e.type });
        // this.pact.plan = window.URL.createObjectURL(blob);
        // this.pact.image = JSON.stringify(e)
      }
    },
  },
};
</script>

<style>
.video-placeholder {
  background-color: #f1f1f1;
  border: 2px dashed #00695c;
}

#dropzone {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dz-preview,
.dz-processing,
.dz-image-preview,
.dz-success,
.dz-complete {
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
