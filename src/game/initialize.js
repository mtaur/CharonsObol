import { Unit, Team } from './objects/units/unit.js'
import { cloneDeep as clone } from 'lodash'
import { Soul } from './objects/souls/soul.js'
import { CPUUnit } from './objects/units/CPUUnit.js'

function uniqClone (unit) {
  let copy = clone(unit)
  copy.id = Unit.id
  return copy
}

var playerTeam = new Team(Unit.SIDE.PLAYER)
var cpuTeam = new Team(Unit.SIDE.CPU)
var gameObj = { playerTeam: playerTeam, cpuTeam: cpuTeam }

// test script
var jaq = new CPUUnit(gameObj)
jaq.raiseAll()
cpuTeam.front.push(jaq)

// playerTeam.front.push(jaq)

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

function caenenTemplate () {
  let templ = {
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
  templ.baseStats.HP.benScale = 6 // 12
  templ.baseStats.HP.start = 40 // 48
  templ.baseStats.HP.current = templ.baseStats.HP.value // 48
  templ.baseStats.MELEE.benScale = 2 // 3
  templ.baseStats.RANGED.benScale = 2 // 3
  templ.baseStats.MAGIC.benScale = 2 // 3
  return templ
}

// console.log('caenentemplate:', caenenTemplate.baseStats)

var jaqClone = uniqClone(jaq)
console.log(jaqClone)

// var jaqs = []
for (let i = 1; i < 5; i++) {
  if (i < 2) {
    let unit = new CPUUnit(gameObj, caenenTemplate())
    unit.statWeights = {
      HP: 6,
      MP: 0,
      INIT: 1,
      MELEE: 5,
      RANGED: 0,
      DR: 4
    }
    // unit.baseStats.HP.benScale = 6 // 12
    // unit.baseStats.MELEE.benscale = 2 // 3
    // unit.baseStats.MAGIC.benscale = 2 // 3
    unit.name = 'Knight of Caenenfoeder ' + i
    unit.raiseAll()
    cpuTeam.front.push(unit)
  } else {
    let unit = new CPUUnit(gameObj, caenenTemplate())
    unit.statWeights = {
      HP: 3,
      MP: 1,
      INIT: 2,
      MELEE: 0,
      RANGED: 8,
      DR: 2
    }
    // unit.baseStats.HP.benScale = 6 // 12
    // unit.baseStats.MELEE.benscale = 2 // 3
    // unit.baseStats.MAGIC.benscale = 2 // 3
    unit.name = 'Archer of Caenenfoeder ' + i
    unit.raiseAll()
    cpuTeam.back.push(unit)
  }
  // i < 4 ? cpuTeam.front.push(new Unit()) : cpuTeam.back.push(new Unit())
  // i < 4 ? cpuTeam.front.push(uniqClone(jaq)) : cpuTeam.back.push(uniqClone(jaq))
}

// console.log('DR', jaq.baseStats.DR.value)
// cpuTeam.front[0].raise('DR')
// jaq.raise('DR')
// jaq.raise('DR')
// console.log('SP', jaq.SP)
// console.log('DR', jaq.baseStats.DR.value)

// console.log(playerTeam)

var pensoul = new Soul.LIB.PENELOPE()
var pen = new Unit(gameObj, { name: pensoul.name, hero: true })
// var pen = new Unit({ name: Soul.LIB.PENELOPE().name, hero: true })
playerTeam.back.push(pen)
pen.souls = [pensoul]
// pen.raise('RANGED')
// pen.raise('RANGED')
// pen.raise('MAGIC')
// pen.raise('MAGIC')
// pen.raise('MAGIC')
// pen.raise('MAGIC')
// pen.raise('MP')
// pen.raise('HP')
// pen.raise('HP')
// console.log(pen.souls)
// console.log(pen.baseSummary)
// console.log(pen.soulSummary)
// console.log(jaq.soulSummary)

var lynnsoul = new Soul.LIB.LYNN()
var lynn = new Unit(gameObj, { name: lynnsoul.name, hero: true })
playerTeam.front.push(lynn)
// lynn.souls = [Soul.LIB.LYNN()]
lynn.souls = [lynnsoul]
// lynn.raise('RANGED')
// lynn.raise('RANGED')
// lynn.raise('RANGED')
// lynn.raise('MELEE')
// lynn.raise('MELEE')
// lynn.raise('MELEE')
// lynn.raise('HP')
// lynn.raise('HP')
// lynn.raise('HP')

lynn.baseStats.HP.current -= 15
// console.log(lynn.souls)
// console.log(lynn.baseSummary)
// console.log(lynn.soulSummary)

var brosoul = new Soul.LIB.BROCANTRIP()
var bro = new Unit(gameObj, { name: brosoul.name, hero: true })
playerTeam.front.push(bro)
// bro.souls = [Soul.LIB.BROCANTRIP()]
bro.souls = [brosoul]
// bro.raise('RANGED')
// bro.raise('MP')
// bro.raise('MP')
// bro.raise('RANGED')
// bro.raise('MAGIC')
// bro.raise('MAGIC')
// bro.raise('HP')
// bro.raise('HP')
// bro.raise('HP')

lynn.actions = ['melee', 'ranged', 'lunge', 'block']

export { cpuTeam, playerTeam }
