import { Unit, Team } from './objects/units/Unit.js'
// import { cloneDeep as clone } from 'lodash'
import { Soul } from './objects/souls/Soul.js'
import { CPUUnit } from './objects/units/CPUUnit.js'
import { Item } from './objects/items/Item.js'

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
  items: []
})

let spellsword = new Item.LIB.SPELLSWORD()
let blueRing = new Item.LIB.BLUERING()
let magicStaff = new Item.LIB.MAGICSTAFF()

spellsword.equipTo(pen)
blueRing.equipTo(pen)
magicStaff.equipTo(pen)
// pen.items.push(spellsword)

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
  items: []
})
playerTeam.front.push(lynn)
// lynn.souls = [lynnsoul]

let spikeyShield = new Item.LIB.SPIKEYSHIELD()
let bronzeRing = new Item.LIB.BRONZERING()

spikeyShield.equipTo(lynn)
bronzeRing.equipTo(lynn)
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
  items: []
})
let divineBarrier = new Item.LIB.DIVINEBARRIER()
// divineBarrier.equipTo(bro)
// bro.items.push(new Item.LIB.YOLOMACE())
// bro.items.push(new Item.LIB.MARTYRSTAFF())
bro.equip(new Item.LIB.YOLOMACE())
bro.equip(new Item.LIB.MARTYRSTAFF())
bro.equip(divineBarrier)
// bro.items.push(new Item.LIB.DIVINEBARRIER())
playerTeam.front.push(bro)
// bro.souls = [brosoul]
// console.log('Outside of constructor...')
console.log(bro)

export { cpuTeam, playerTeam }
