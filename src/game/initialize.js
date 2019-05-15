import { Unit, Team } from './objects/units/Unit.js'
// import { cloneDeep as clone } from 'lodash'
import { Soul } from './objects/souls/soul.js'
import { CPUUnit } from './objects/units/CPUUnit.js'

// function uniqClone (unit) {
//   let copy = clone(unit)
//   copy.id = Unit.id
//   return copy
// }

var playerTeam = new Team(Unit.SIDE.PLAYER)
var cpuTeam = new Team(Unit.SIDE.CPU)
var gameObj = { playerTeam: playerTeam, cpuTeam: cpuTeam }

// test script
var jaq = new CPUUnit(gameObj)
// console.log('Outside of constructor...')
console.log(jaq)
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
  templ.baseStats.HP.benScale = 10 // 15
  templ.baseStats.HP.start = 40 // 60
  templ.baseStats.HP.current = templ.baseStats.HP.value // 60
  templ.baseStats.MELEE.benScale = 3 // 4
  templ.baseStats.RANGED.benScale = 3 // 4
  templ.baseStats.MAGIC.benScale = 3 // 4
  return templ
}

// console.log('caenentemplate:', caenenTemplate.baseStats)

// var jaqClone = uniqClone(jaq)
// console.log(jaqClone)

// Knight of Caenenfoeder
for (let i = 1; i < 4; i++) {
  if (i < 2) {
    let unit = new CPUUnit(gameObj, caenenTemplate())
    unit.statWeights = {
      HP: 6,
      MP: 0,
      INIT: 1,
      MELEE: 5,
      RANGED: 0,
      DRED: 3,
      DREF: 3
    }
    unit.name = 'Knight of Caenenfoeder ' + i
    unit.raiseAll()
    cpuTeam.front.push(unit)
    // console.log('Outside of constructor...')
    // console.log(unit)
  } else {
    let unit = new CPUUnit(gameObj, caenenTemplate())
    unit.statWeights = {
      HP: 3,
      MP: 1,
      INIT: 2,
      MELEE: 0,
      RANGED: 8,
      DRED: 2,
      DREF: 0
    }
    unit.name = 'Archer of Caenenfoeder ' + i
    unit.raiseAll()
    cpuTeam.back.push(unit)
    // console.log('Outside of constructor...')
    // console.log(unit)
  }
}

var pensoul = new Soul.LIB.PENELOPE()
var pen = new Unit(gameObj, { name: pensoul.name,
  hero: true,
  souls: [pensoul],
  side: Unit.SIDE.PLAYER,
  pos: Unit.POS.BACK,
  items: [{
    name: 'Blue Ring',
    statBonus: { MP: 1 },
    desc: '+1 MP'
  },
  {
    name: 'Magic Staff',
    statBonus: { MAGIC: 5 },
    desc: '+5 MAGIC'
  }
  ]
})

var spellsword = {
  name: 'Bastard Spellsword',
  desc: 'Use the average of MAGIC and MELEE in place of either stat when beneficial',
  // replacements[0] = { statName: 'MELEE', value: 0.5*(MELEE + MAGIC) }
  replacements: [
    {
      statName: 'MELEE',
      value: function (unit) {
        return 0.5 * (unit.convertedStatValues.MELEE + unit.convertedStatValues.MAGIC)
      }
      // value: 0.5 * (pen.convertedStatValues.MELEE + pen.convertedStatValues.MAGIC)
    },
    {
      statName: 'MAGIC',
      value: function (unit) {
        return 0.5 * (unit.convertedStatValues.MELEE + unit.convertedStatValues.MAGIC)
      }
      // value: 0.5 * (pen.convertedStatValues.MELEE + pen.convertedStatValues.MAGIC)
    }
  ]
}

// Object.defineProperty(spellsword.replacements[0], 'value', {
//   get () {
//     console.log('MELEE', pen.convertedStatValues.MELEE)
//     return 0.5 * (pen.convertedStatValues.MELEE + pen.convertedStatValues.MAGIC)
//   }
// })
// Object.defineProperty(spellsword.replacements[1], 'value', {
//   get () { return 0.5 * (pen.convertedStatValues.MELEE + pen.convertedStatValues.MAGIC) }
// })
console.log('Spellsword:', spellsword)

pen.items.push(spellsword)
playerTeam.back.push(pen)
// pen.souls = [pensoul]
// console.log('Outside of constructor...')
console.log(pen)

var lynnsoul = new Soul.LIB.LYNN()
var lynn = new Unit(gameObj, {
  name: lynnsoul.name,
  souls: [lynnsoul],
  hero: true,
  side: Unit.SIDE.PLAYER,
  pos: Unit.POS.FRONT,
  items: [{
    name: 'Bronze Ring',
    statBonus: { DRED: 1 },
    desc: '+1 DRED'
  },
  {
    name: 'Spikey Shield',
    statBonus: { DRED: 1, DREF: 2 },
    desc: '+1 DRED, +2 DREF'
  }]
})
playerTeam.front.push(lynn)
// lynn.souls = [lynnsoul]
lynn.actions = ['melee', 'ranged', 'lunge', 'block']

lynn.baseStats.HP.current -= 15
// console.log('Outside of constructor...')
console.log(lynn)

// console.log('Enumerability test...')
// for (let key in lynn.baseStats.DREF) {
//   console.log(key, ':', lynn.baseStats.DREF[key])
// }

var brosoul = new Soul.LIB.BROCANTRIP()
var bro = new Unit(gameObj, {
  name: brosoul.name,
  hero: true,
  souls: [brosoul],
  side: Unit.SIDE.PLAYER,
  pos: Unit.POS.FRONT,
  items: [{
    name: 'Martyr Staff',
    converts: [
      { from: 'DRED', to: 'DREF', value: 1 },
      { from: 'DRED', to: 'DRED', value: -1 },
      { from: 'DRED', to: 'MP', value: 0.1 },
      { from: 'DRED', to: 'MAGIC', value: 0.25 }
    ],
    desc: 'Nullifies base DRED, converting each point into 1 DREF, .1 MP, and .25 MAGIC.'
  },
  {
    name: 'YOLO Mace',
    converts: [
      { from: 'DRED', to: 'MELEE', value: 3 },
      { from: 'DRED', to: 'DRED', value: -1 }
    ],
    desc: 'Nullifies base 100% DRED, converting each point to 3 MELEE.\nYOLO!!!'
  },
  {
    name: 'Divine Barrier',
    converts: [
      { from: 'MAGIC', to: 'DRED', value: 0.15 },
      { from: 'MP', to: 'DRED', value: 2 },
      { from: 'MP', to: 'MP', value: -0.25 }
    ],
    desc: 'Lose 25% base MP, gaining 2 DRED per base MP and 0.15 DRED per base MAGIC.'
  }
  ]
})
playerTeam.front.push(bro)
// bro.souls = [brosoul]
// console.log('Outside of constructor...')
console.log(bro)

export { cpuTeam, playerTeam }
