import { Unit, playerTeam, cpuTeam } from './unit.js'

class CPUUnit extends Unit {
  // override
  cpuTeam = cpuTeam
  raise = function (statname) {
    // let stat = this.baseStats[statName]
    // // if global SP > 0...
    // if (playerTeam.SP >= stat.cost) {
    //   if (stat.isResource) {
    //     stat.current += stat.benefit
    //   }
    //   this.SP += stat.cost
    //   playerTeam.SP -= stat.cost
    //   stat.increase()
    //   console.log(playerTeam.SP, 'team SP remaining!')
    // }
    let stat = this.baseStats[statName]
    if (this.cpuTeam.SP >= this.SP + stat.cost) {
      if (stat.isResource) {
        stat.current += stat.benefit
      }
      this.SP += stat.cost
      stat.increase()
    }
  }

  // relative ratio of counters maintained.
  statWeights = {
    // static LIB = {
      //   HP: HP,
      //   MP: MP,
      //   INIT: INIT,
      //   MELEE: MELEE,
      //   RANGED: RANGED,
      //   MAGIC: MAGIC,
      //   DR: DR
      // }
      HP: 5,
      MP: 2,
      INIT: 1,
      MELEE: 4,
      RANGED: 4,
      MAGIC: 4,
      DR: 3
  }

  autoRaiseOne = function () {
    let avail = this.cpuTeam.SP - this.SP
    let totalRatio = 0
    for (let key in this.statWeights) {
      totalRatio += statWeights[key]
    }
    let totalCounters = 0
    for (let key in this.statWeights) {
      totalCounters += this.baseStats[key].counters
    }

    function canAfford(statname) {
      return avail > this.baseStats[statname].cost
    }
    function needsRaise(statname) {
      if (totalCounters === 0) return true
      return this.baseStats[statname].counters / totalCounters < this.statWeights[statname] / totalRatio
    }
    function compareStats(a, b) {
      // b comes first if larger
      return this.baseStats[b].counters - this.baseStats[a].counters
    }

    let arr = []
    for (let key in this.statWeights) {
      arr.push(statWeights[key])
    }

    arr = arr.filter(canAfford).filter(needsRaise).sortBy(compareStats)
    if (arr.length > 0) {
      this.raise(arr[0])
      console.log('Auto-raised ', arr[0])
      return true
    } else {
      return false
    }
  }

  raiseAll = function () {
    let j = 0
    while (j < 100) {
      j = this.autoRaiseOne() ? j + 1 : 100
    }
  }

  constructor (obj = {}) {
    // {
    //   name: 'Jaqen',
    //   side: Unit.SIDE.CPU,
    //   pos: Unit.POS.FRONT,
    //   hero: false,
    //   // Configure stats with default setup.
    //   baseStats: Unit.defaultStats(),
    //   inventory: {},
    //   souls: [],
    //   SP: 0
    // }
    super()
}

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
  // get value () { return this.start + this.benScale * this.counters }
  // increase () { this.counters++ }

}

// function HP () {
//   return new Stat({
//     name: 'HP',
//     start: 48,
//     // counters: 1,
//     // costScale: 1,
//     benScale: 12,
//     isResource: true
//   })
// }

export { CPUUnit }
