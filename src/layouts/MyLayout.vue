<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <!-- Toggle drawer??? -->
        <!-- <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn> -->

        <q-toolbar-title>
          Charon's Obol
        </q-toolbar-title>

        <div>Built in Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- Defaults to Index.vue -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { openURL } from 'quasar'
// import drawer from '../components/drawer.vue'

export default {
  name: 'MyLayout',
  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    // openURL
  }
}
</script>

<style>
</style>
