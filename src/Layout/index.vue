<template>
  <div>
    <the-toolbar-app />
    <notification />
    <!-- <the-menu-app v-model="options" class="mt-5" /> -->

    <v-content fliud>
      <v-slide-y-transition>
        <v-container fluid>
          <v-layout fill-height justify-center>
            <v-flex xs10 class="px-5 pt-5 mt-5">
              <router-view />
            </v-flex>
          </v-layout>
        </v-container>
      </v-slide-y-transition>
    </v-content>
  </div>
</template>

<script>
import Notification from '@/components/Notification';
import TheToolbarApp from './toolbar';
import TheMenuApp from './menu';

const options = {
  mini: true,
  drawer: false,
  clipped: true,
};

export default {
  name: 'DefaultLayout',
  components: {
    TheToolbarApp,
    Notification,
    TheMenuApp,
  },
  data: () => ({
    options,
  }),
};
</script>
