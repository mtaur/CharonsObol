import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example/index.js'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
//
console.log(example)

export default function (/* { ssrContext } */) {
  console.log('Function.prototype.toString called on incompatible object???')
  const Store = new Vuex.Store({
    modules: {
      // example: example
      example
    }
  })
  // console.log(Store)

  return Store
}
