<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="glossy">
      <q-toolbar>

        <q-toolbar-title>
          Charon's Obol
        </q-toolbar-title>
        <q-btn
        flat
        @click="rightDrawerClick('charInfo')"
        aria-label="Menu"
        >
          <q-icon name="accessibility_new" />
          <div v-if="rightDrawerPage==='charInfo' && rightDrawerOpen" class="q-pa-xs">
            Unit info
          </div>
        </q-btn>
        <!-- Toggle drawer??? -->
        <q-btn
        flat
        @click="rightDrawerClick('log')"
        aria-label="Menu"
        >
          <q-icon name="fas fa-book" />
          <div v-if="rightDrawerPage==='log' && rightDrawerOpen" class="q-pa-xs">
            Battle log
          </div>
          <!-- <q-icon name="menu" /> -->
        </q-btn>
        <!-- <div>Built in Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <!-- <rightdrawer :visible="rightDrawerOpen"></rightdrawer> -->

    <q-page-container>
      <!-- Defaults to Index.vue -->
      <router-view :rightDrawerOpen="rightDrawerOpen" :rightDrawerPage="rightDrawerPage" />
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
      rightDrawerPage: 'log',
      rightDrawerOpen: true // this.$q.platform.is.desktop
    }
  },
  compontents: {
    // rightdrawer: rightdrawer
  },
  methods: {
    rightDrawerClick (pageStr) {
      if (pageStr === this.rightDrawerPage) {
        this.rightDrawerOpen = !this.rightDrawerOpen
      }
      if (pageStr !== this.rightDrawerPage) {
        this.rightDrawerOpen = true
      }
      this.rightDrawerPage = pageStr
      // return 'pageStr'
    }
    // openURL
  }
}
</script>

<style>
</style>
