<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="glossy">
      <q-toolbar>

        <q-toolbar-title>
          Charon's Obol
        </q-toolbar-title>
        <q-btn
        flat
        dense
        round
        @click="rightDrawerOpen = !rightDrawerOpen"
        aria-label="Menu"
        >
          <q-icon name="accessibility_new" />
        </q-btn>
        <!-- Toggle drawer??? -->
        <q-btn
        flat
        dense
        round
        @click="rightDrawerOpen = !rightDrawerOpen"
        aria-label="Menu"
        >
          <q-icon name="fas fa-book" />
          <!-- <q-icon name="menu" /> -->
        </q-btn>
        <!-- <div>Built in Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <!-- <rightdrawer :visible="rightDrawerOpen"></rightdrawer> -->

    <q-page-container>
      <!-- Defaults to Index.vue -->
      <router-view :rightDrawerOpen="rightDrawerOpen" />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { openURL } from 'quasar'
// import rightdrawer from '../components/rightdrawer.vue'

export default {
  name: 'MyLayout',
  data () {
    return {
      rightDrawerOpen: true // this.$q.platform.is.desktop
    }
  },
  compontents: {
    // rightdrawer: rightdrawer
  },
  methods: {
    // openURL
  }
}
</script>

<style>
</style>
