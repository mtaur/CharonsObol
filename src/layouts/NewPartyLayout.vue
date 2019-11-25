<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="glossy">
      <q-toolbar>

        <q-toolbar-title>
          Charon's Obol
        </q-toolbar-title>
        <q-btn
        flat
        @click="rightDrawerClick('newCharInfo')"
        aria-label="Menu"
        >
          <q-icon name="accessibility_new" />
          <div v-if="rightDrawerPage==='newCharInfo' && rightDrawerOpen" class="q-pa-xs">
            Unit info
          </div>
        </q-btn>
        <!-- Toggle drawer??? -->
        <q-btn
        flat
        @click="rightDrawerClick('souls')"
        aria-label="Menu"
        >
          <q-icon name="fas fa-book" />
          <div v-if="rightDrawerPage==='souls' && rightDrawerOpen" class="q-pa-xs">
            Book of Souls
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
  name: 'NewPartyLayout',
  data () {
    return {
      rightDrawerPage: 'newCharInfo',
      rightDrawerOpen: true // this.$q.platform.is.desktop
    }
  },
  compontents: {
    // rightdrawer
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
