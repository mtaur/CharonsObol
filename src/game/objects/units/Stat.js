import { hasIn as hasProp } from 'lodash'
// import { ResourceManager } from './ResourceManager'

class Stat {
  // ( default values are written from template upon
  // construction )
  // name = ''
  // start = 0
  // counters = 1
  // costScale = 1
  // benScale = 1
  // isResource = false

  static template = {
    name: '',
    start: 0,
    counters: 1,
    costScale: 1,
    benScale: 1,
    isResource: false
  }

  get cost () { return this.costScale * this.counters }
  get benefit () { return this.benScale }
  get value () { return this.start + (this.benScale * this.counters) }
  increase () { this.counters++ }

  constructor (obj) {
    for (let key in Stat.template) {
      this[key] = hasProp(obj, key) ? obj[key] : Stat.template[key]
    }
  }

  static LIB = {
    HP: HP,
    MP: MP,
    INIT: INIT,
    MELEE: MELEE,
    RANGED: RANGED,
    MAGIC: MAGIC,
    DRED: DRED,
    DREF: DREF
  }
}

function HP () {
  return new Stat({
    name: 'HP',
    start: 60,
    // counters: 1,
    // costScale: 1,
    benScale: 15,
    isResource: true
  })
}
function MP () {
  return new Stat({
    name: 'MP',
    // start: 0,
    // counters: 1,
    costScale: 4,
    // benScale: 1,
    isResource: true
  })
}
function INIT () {
  return new Stat({
    name: 'INIT',
    // start: 0,
    counters: 2, // 1
    costScale: 2 // 4
    // benScale: 1,
    // isResource: false
  })
}
function MELEE () {
  return new Stat({
    name: 'MELEE',
    // start: 0,
    counters: 2,
    // costScale: 1,
    benScale: 4
    // isResource: false
  })
}
function RANGED () {
  return new Stat({
    name: 'RANGED',
    // start: 0,
    counters: 2,
    // costScale: 1,
    benScale: 4
    // isResource: false
  })
}
function MAGIC () {
  return new Stat({
    name: 'MAGIC',
    // start: 0,
    counters: 2,
    // costScale: 1,
    benScale: 4
    // isResource: false
  })
}
function DRED () {
  return new Stat({
    name: 'DRED',
    // start: 0,
    counters: 2,
    // costScale: 1,
    benScale: 1
    // isResource: false
  })
}
function DREF () {
  return new Stat({
    name: 'DREF',
    start: -1,
    counters: 1,
    // costScale: 1,
    benScale: 1
    // isResource: false
  })
}

export { Stat }
