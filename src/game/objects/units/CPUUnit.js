// import { Unit, playerTeam, cpuTeam } from './unit.js'
import { Unit } from './Unit.js'

// Constructor requires a reference to cpuTeam!!!
class CPUUnit extends Unit {
  // override
  // cpuTeam = cpuTeam
  raise = function (statName) {
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
  // static LIB = {
  //   HP: HP,
  //   MP: MP,
  //   INIT: INIT,
  //   MELEE: MELEE,
  //   RANGED: RANGED,
  //   MAGIC: MAGIC,
  //   DR: DR
  // }
  statWeights = {
    HP: 5,
    MP: 2,
    INIT: 1,
    MELEE: 4,
    RANGED: 4,
    MAGIC: 4,
    DRED: 3,
    DREF: 3
  }

  autoRaiseOne = function () {
    // console.log('autoraiseone this: ', this)
    let unit = this
    let baseStats = unit.baseStats
    let avail = this.cpuTeam.SP - this.SP
    let totalRatio = 0
    for (let key in this.statWeights) {
      totalRatio += this.statWeights[key]
    }
    let totalCounters = 0
    for (let key in this.statWeights) {
      totalCounters += baseStats[key].counters
    }

    function canAfford (statname) {
      // console.log('statname: ', statname)
      // console.log('avail: ', avail)
      // console.log('unit: ', unit)
      // console.log(baseStats)
      return (avail > baseStats[statname].cost)
    }
    function needsRaise (statname) {
      if (totalCounters === 0) return true
      return baseStats[statname].counters / totalCounters < unit.statWeights[statname] / totalRatio
    }
    function compareStats (a, b) {
      // b comes first if larger
      return baseStats[b].counters - baseStats[a].counters
    }

    let arr = []
    for (let key in this.statWeights) {
      arr.push(key)
      // arr.push(this.statWeights[key])
    }

    arr = arr.filter(canAfford).filter(needsRaise).sort(compareStats)
    if (arr.length > 0) {
      this.raise(arr[0])
      // console.log('Auto-raised', arr[0], ', avail =', avail)
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

  constructor (gameObj, unitObj = {}) {
    // gameObj = { playerTeam, cpuTeam }
    //
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
    super(gameObj, unitObj)
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

export { CPUUnit }
