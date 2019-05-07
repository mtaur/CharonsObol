import { hasIn as hasProp } from 'lodash'

class ResourceManager {
  // static template = {
  //   name: '',
  //   start: 0,
  //   counters: 1,
  //   costScale: 1,
  //   benScale: 1,
  //   isResource: false
  // }
  // get cost () { return this.costScale * this.counters }
  // get benefit () { return this.benScale }
  // get value () { return this.start + (this.benScale * this.counters) }
  // increase () { this.counters++ }
  hello = function () { console.log('I am a statManager object for', this.unit) }

  // Check if it's a resource and then initialize if so
  makeResource = function (unit, stat) {
    console.log('unit:', unit)
    console.log('stat:', stat)
    console.log('unit.baseStats:', unit.baseStats)
    console.log('unit.effectiveStatValues:', unit.effectiveStatValues)
    if (hasProp(stat, 'isResource')) {
      if (stat.isResource === true) {
        // unit.baseStats[stat].statManager = this
        //
        // Initialize stat to converted max value
        // Not bound to a getter.  Primitive value, written to often.
        stat.current = unit.effectiveStatValues[stat.name]

        // Use getter because max is dynamic and subject to interacting bonuses.
        Object.defineProperty(stat, 'max',
          {
            // get () { return this.value }
            get () { return unit.effectiveStatValues[stat.name] }
          }
        )
      }
    }
  }

  constructor (unit) {
    this.unit = unit
    for (let statName in unit.baseStats) {
      this.makeResource(unit, unit.baseStats[statName])
    }
    // unit.statManager = this
  }

// resources have current and max...
// if (obj.isResource === true) {
//   this.current = this.value
//   Object.defineProperty(this, 'max',
//     {
//       get () { return this.value }
//     }
//   )
// }
// static LIB = {
//   HP: HP,
//   MP: MP,
//   INIT: INIT,
//   MELEE: MELEE,
//   RANGED: RANGED,
//   MAGIC: MAGIC,
//   DRED: DRED,
//   DREF: DREF
// }
}
export { ResourceManager }
