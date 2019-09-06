<template>
  <v-navigation-drawer
    ref="drawer"
    v-model="currentDrawer"
    :mini-variant="$vuetify.breakpoint.mdAndDown ? false : mini"
    :temporary="$vuetify.breakpoint.mdAndDown"
    :clipped="clipped"
    enable-resize-watcher
    fixed
    app
  >
    <v-list>
      <template v-for="item in items">
        <v-list-group
          v-if="!!item.children && item.children.length && item.rule"
          v-model="item.active"
          :prepend-icon="item.icon"
          :key="item.title"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-for="subItem in item.children"
            :key="subItem.title"
            :to="subItem.link"
            class="item--child"
            exact
          >
            <v-list-tile-avatar>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile
          v-else-if="item.rule"
          :to="item.link"
          :key="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'TheMenuApp',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const { drawer } = this.$refs;
    drawer.$el.addEventListener('mouseenter', () => this.mini = this.drawer ? this.mini : false);
    drawer.$el.addEventListener('mouseleave', () => this.mini = this.drawer ? this.mini : true);
  },
  computed: {
    items() {
      return this.$store.getters['menu/getMenuItems'];
    },
    mini: {
      get() {
        return this.value.mini;
      },
      set(mini) {
        this.$emit('input', {
          mini,
          drawer: this.drawer,
          clipped: this.clipped,
        });
      },
    },
    drawer: {
      get() {
        return this.value.drawer;
      },
      set(drawer) {
        this.$emit('input', {
          drawer,
          mini: this.mini,
          clipped: this.clipped,
        });
      },
    },
    clipped: {
      get() {
        return this.value.clipped;
      },
      set(clipped) {
        this.$emit('input', {
          clipped,
          mini: this.mini,
          drawer: this.drawer,
        });
      },
    },

    currentDrawer: {
      get() {
        return this.$vuetify.breakpoint.mdAndDown ? this.drawer : true;
      },
      set(drawer) {
        if (this.$vuetify.breakpoint.mdAndDown) this.drawer = drawer;
      },
    },
  },
};
</script>

<style>
.item--child {
  margin-left: -55px;
}
</style>
