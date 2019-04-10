<template>
  <div class="col-6">
    {{ stat.name }}: {{ stat.value }}  <button @click="increase">Increase</button>
  </div>
</template>

<script>
export default {
  props: ['stat', 'unit'],
  data () {
    return { }
  },
  methods: {
    increase: function () { this.unit.raise(this.stat.name) }
  }
}
</script>
