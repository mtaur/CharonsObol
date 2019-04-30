import { Stat } from './baseStats.js'
// import { Soul } from '../souls/soul.js'
import { StatMods } from './statMods/statMods.js'
import { cloneDeep as clone } from 'lodash'
//
// function uniqClone (unit) {
//   let copy = clone(unit)
//   copy.id = Unit.id
//   return copy
// }

// Create Team objects
class Team {
  side = '' // PLAYER or CPU
  front = []
  back = []
  bench = []
  // dead...?

  get field () { return this.front.concat(this.back) }
  get all () { return this.front.concat(this.back).concate(this.bench) }

  reset () {
    this.front = []
    this.back = []
    this.bench = []
  }

  constructor (side) {
    this.side = side

    // Player spends SP between player units.
    if (side === Unit.SIDE.PLAYER) {
      this.SP = 300
    }

    // CPU units all receive CPU SP separately in full.
    if (side === Unit.SIDE.CPU) {
      this.SP = 100
    }
  }
}

class Unit {
  static SIDE = {
    PLAYER: 'player',
    CPU: 'cpu'
  }
  static POS = {
    FRONT: 'front',
    BACK: 'back',
    BENCH: 'bench'
  }

  static _id = -1

  static get id () {
    Unit._id++
    return Unit._id
  }

  raise = function (statName) {
    let stat = this.baseStats[statName]
    // if global SP > 0...
    if (this.playerTeam.SP >= stat.cost) {
      if (stat.isResource) {
        stat.current += stat.benefit
      }
      this.SP += stat.cost
      this.playerTeam.SP -= stat.cost
      stat.increase()
      console.log(this.playerTeam.SP, 'team SP remaining!')
    }
  }

  // Define getters in an external file and bind them here.
  get baseStatValues () { return StatMods.getBaseStatValues.call(this) }
  get soulStatValues () { return StatMods.getSoulStatValues.call(this) }

  get baseSummary () {
    let obj = this.baseStatValues
    obj.name = this.name
    obj.SP = this.SP
    obj.side = this.side
    obj.pos = this.pos
    obj.hero = this.hero
    obj.tooltip = 'This summay includes starting values and bonuses from invested SP only!'
    return obj
  }

  get soulSummary () {
    let obj = clone(this.soulStatValues)
    obj.name = this.name
    obj.SP = this.SP
    obj.side = this.side
    obj.pos = this.pos
    obj.hero = this.hero
    obj.tooltip = 'This summay includes soul bonuses!'
    return obj
  }

  // constructor helper function, must be called each time or else
  // stats shared globally
  static defaultStats = () => {
    let obj = {}
    for (let key in Stat.LIB) {
      // These are constructors which must be called
      // to create independent instances!
      obj[key] = Stat.LIB[key]()
    }

    // if (obj.isResource) {
    //   obj.current = obj.start
    //   Object.defineProperty(this, 'max',
    //     {
    //       get () { return this.value }
    //     }
    //   )
    // }
    return obj
  }

  constructor (
    gameObj = {
      playerTeam: new Team(Unit.SIDE.PLAYER),
      cpuTeam: new Team(Unit.SIDE.CPU)
    },
    // unit initialization object
    obj = {}
  ) {
    this.playerTeam = gameObj.playerTeam
    this.cpuTeam = gameObj.cpuTeam
    // !!!Must reset the template or else data will be shared!!!
    let template = {
      name: 'Jaqen',
      side: Unit.SIDE.CPU,
      pos: Unit.POS.FRONT,
      hero: false,
      // Configure stats with default setup.
      baseStats: Unit.defaultStats(),
      inventory: {},
      souls: [],
      SP: 0
    }
    for (let key in template) {
      this[key] = obj[key] ? obj[key] : template[key]
    }
    this.id = Unit.id
    console.log(this, this.id)
    // if (this.side === Unit.SIDE.PLAYER) {
    //   playerTeam.front.push(this)
    // } else { cpuTeam.front.push(this) }
  }
}
/// ^ end of class ^ ///

// var playerTeam = new Team(Unit.SIDE.PLAYER)
// var cpuTeam = new Team(Unit.SIDE.CPU)
//
// // test script
// var jaq = new Unit()
// // playerTeam.front.push(jaq)
//
// // console.log('SP', jaq.SP)
// // console.log('HP', jaq.baseStats.HP.value)
// jaq.raise('HP')
// jaq.raise('HP')
// jaq.raise('HP')
// // console.log('SP', jaq.SP)
// // console.log('HP', jaq.baseStats.HP.value)
//
// // console.log('MELEE', jaq.baseStats.MELEE.value)
// jaq.raise('MELEE')
// jaq.raise('MELEE')
// jaq.raise('MELEE')
// jaq.raise('MELEE')
// // console.log('MELEE', jaq.baseStats.MELEE.value)
// // console.log('SP', jaq.SP)
//
// var jaqClone = uniqClone(jaq)
// console.log(jaqClone)
//
// // var jaqs = []
// for (let i = 0; i < 6; i++) {
//   i < 4 ? cpuTeam.front.push(new Unit()) : cpuTeam.back.push(new Unit())
//   // i < 4 ? cpuTeam.front.push(uniqClone(jaq)) : cpuTeam.back.push(uniqClone(jaq))
// }
//
// // console.log('DR', jaq.baseStats.DR.value)
// cpuTeam.front[0].raise('DR')
// // jaq.raise('DR')
// // jaq.raise('DR')
// // console.log('SP', jaq.SP)
// // console.log('DR', jaq.baseStats.DR.value)
//
// // console.log(playerTeam)
//
// var pensoul = new Soul.LIB.PENELOPE()
// var pen = new Unit({ name: pensoul.name, hero: true })
// // var pen = new Unit({ name: Soul.LIB.PENELOPE().name, hero: true })
// playerTeam.back.push(pen)
// pen.souls = [pensoul]
// pen.raise('RANGED')
// pen.raise('RANGED')
// pen.raise('MAGIC')
// pen.raise('MAGIC')
// pen.raise('MAGIC')
// pen.raise('MAGIC')
// pen.raise('MP')
// pen.raise('HP')
// pen.raise('HP')
// // console.log(pen.souls)
// // console.log(pen.baseSummary)
// // console.log(pen.soulSummary)
// // console.log(jaq.soulSummary)
//
// var lynnsoul = new Soul.LIB.LYNN()
// var lynn = new Unit({ name: lynnsoul.name, hero: true })
// playerTeam.front.push(lynn)
// // lynn.souls = [Soul.LIB.LYNN()]
// lynn.souls = [lynnsoul]
// lynn.raise('RANGED')
// lynn.raise('RANGED')
// lynn.raise('RANGED')
// lynn.raise('MELEE')
// lynn.raise('MELEE')
// lynn.raise('MELEE')
// lynn.raise('HP')
// lynn.raise('HP')
// lynn.raise('HP')
//
// lynn.baseStats.HP.current -= 15
// // console.log(lynn.souls)
// // console.log(lynn.baseSummary)
// // console.log(lynn.soulSummary)
//
// var brosoul = new Soul.LIB.BROCANTRIP()
// var bro = new Unit({ name: brosoul.name, hero: true })
// playerTeam.front.push(bro)
// // bro.souls = [Soul.LIB.BROCANTRIP()]
// bro.souls = [brosoul]
// bro.raise('RANGED')
// bro.raise('MP')
// bro.raise('MP')
// bro.raise('RANGED')
// bro.raise('MAGIC')
// bro.raise('MAGIC')
// bro.raise('HP')
// bro.raise('HP')
// bro.raise('HP')
//
// lynn.actions = ['melee', 'ranged', 'lunge', 'block']
//
// export { Unit, cpuTeam, playerTeam, Team }
export { Unit, Team }
