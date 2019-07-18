import { Unit, Team } from './objects/units/Unit.js'
// import { cloneDeep as clone } from 'lodash'
import { Soul } from './objects/souls/Soul.js'
import { CPUUnit } from './objects/units/CPUUnit.js'
import { Item } from './objects/items/Item.js'
import { Action } from './objects/actions/Action.js'

// function uniqClone (unit) {
//   let copy = clone(unit)
//   copy.id = Unit.id
//   return copy
// }

var playerTeam = new Team(Unit.SIDE.PLAYER)
var cpuTeam = new Team(Unit.SIDE.CPU)
var gameObj = { playerTeam: playerTeam, cpuTeam: cpuTeam }
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

function removeByNAME (arr, str) {
  // let found = -1
  for (let index in arr) {
    if (arr[index].NAME === str) {
      arr.splice(index, 1)
    }
  }
}

// Knight of Caenenfoeder
for (let i = 1; i < 4; i++) {
// for (let i = 1; i < 4; i++) {
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
    unit.name = 'Knight of Caenenfoeder'
    unit.raiseAll()
    //
    cpuTeam.front.push(unit)
    //
    // console.log('Outside of constructor...')
    removeByNAME(unit.actions, 'RANGED')
    removeByNAME(unit.actions, 'RUN')
    removeByNAME(unit.actions, 'MOVE')
    console.log(unit)
  } else if (i < 3) {
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
    unit.pos = Unit.POS.BACK
    unit.name = 'Archer of Caenenfoeder'
    unit.raiseAll()
    //
    cpuTeam.back.push(unit)
    //
    // console.log('Outside of constructor...')
    removeByNAME(unit.actions, 'MELEE')
    removeByNAME(unit.actions, 'MOVE')
    removeByNAME(unit.actions, 'RUN')
    console.log(unit)
  } else {
    let unit = new CPUUnit(gameObj, caenenTemplate())
    unit.statWeights = {
      HP: 2,
      MP: 4,
      INIT: 1,
      MELEE: 0,
      MAGIC: 6,
      RANGED: 6,
      DRED: 1,
      DREF: 1
    }
    unit.pos = Unit.POS.BACK
    unit.name = 'Mage of Caenenfoeder'
    unit.raiseAll()
    //
    cpuTeam.back.push(unit)
    //
    // console.log('Outside of constructor...')
    removeByNAME(unit.actions, 'MELEE')
    removeByNAME(unit.actions, 'RANGED')
    removeByNAME(unit.actions, 'MOVE')
    removeByNAME(unit.actions, 'RUN')
    unit.actions.push(new Action.LIB.HOMING(unit))
    unit.actions.push(new Action.LIB.REGEN(unit))
    unit.actions.push(new Action.LIB.HEAL(unit))
    unit.actions.push(new Action.LIB.CHAINLGT(unit))
    console.log(unit)
  }
}

var jaq = new CPUUnit(gameObj)
// console.log('Outside of constructor...')
console.log(jaq)
jaq.raiseAll()
//
removeByNAME(jaq.actions, 'RUN')
removeByNAME(jaq.actions, 'MELEE')
removeByNAME(jaq.actions, 'GUARD')
// removeByNAME(jaq.actions, 'MOVE')
// jaq.actions.push(new Action.LIB.CHAINLGT(jaq))
// jaq.actions.push(new Action.LIB.FLAMEFIST(jaq))
jaq.actions.push(new Action.LIB.REGEN(jaq))
// jaq.actions.push(new Action.LIB.HEAL(jaq))
jaq.actions.push(new Action.LIB.VENOMSTRIKE(jaq))
// jaq.actions.push(new Action.LIB.LUNGE(jaq))
cpuTeam.front.push(jaq)
//
// jaq.hasAction.major = false
// jaq.hasAction.minor = false
//

let deadGuy = new CPUUnit(gameObj, caenenTemplate())
deadGuy.statWeights = {
  HP: 3,
  MP: 1,
  INIT: 2,
  MELEE: 0,
  RANGED: 8,
  DRED: 2,
  DREF: 0
}
deadGuy.raiseAll()
deadGuy.baseStats.HP.current = 0
deadGuy.live = false
deadGuy.pos = Unit.POS.DEAD
deadGuy.name = 'Archer of Caenenfoeder (deceased)'
cpuTeam.dead.push(deadGuy)
console.log(deadGuy)

let benchGuy = new CPUUnit(gameObj, caenenTemplate())
deadGuy.statWeights = {
  HP: 3,
  MP: 1,
  INIT: 2,
  MELEE: 0,
  RANGED: 8,
  DRED: 2,
  DREF: 0
}

benchGuy.raiseAll()
benchGuy.pos = Unit.POS.BENCH
benchGuy.name = 'Archer of Caenenfoeder (benched)'
cpuTeam.bench.push(benchGuy)
// console.log('Outside of constructor...')
console.log(benchGuy)

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
pen.actions.push(new Action.LIB.FLAMEFIST(pen))
pen.actions.push(new Action.LIB.CHAINLGT(pen))
pen.actions.push(new Action.LIB.HOMING(pen))

// pen.souls = [pensoul]
// console.log('Outside of constructor...')
console.log(pen)

var lynnsoul = new Soul.LIB.LYNN()
var lynn = new Unit(gameObj, {
  name: lynnsoul.name,
  souls: [lynnsoul],
  hero: true,
  side: Unit.SIDE.PLAYER,
  pos: Unit.POS.BACK,
  items: []
})
playerTeam.back.push(lynn)

let spikeyShield = new Item.LIB.SPIKEYSHIELD()
let bronzeRing = new Item.LIB.BRONZERING()

spikeyShield.equipTo(lynn)
bronzeRing.equipTo(lynn)
lynn.actions.push(new Action.LIB.LUNGE(lynn)) // = ['melee', 'ranged', 'lunge', 'block']
lynn.actions.push(new Action.LIB.HARRY(lynn)) // = ['melee', 'ranged', 'lunge', 'block']

console.log(lynn)

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
let yoloMace = new Item.LIB.YOLOMACE()
let martyrStaff = new Item.LIB.MARTYRSTAFF()
divineBarrier.equipTo(bro)
yoloMace.equipTo(bro)
martyrStaff.equipTo(bro)
bro.actions.push(new Action.LIB.INSPIRE(bro))
bro.actions.push(new Action.LIB.HEAL(bro))

playerTeam.front.push(bro)
console.log(bro)

var primsoul = new Soul.LIB.PRIMORDAEA()
var prim = new Unit(gameObj, {
  name: primsoul.name,
  hero: true,
  souls: [primsoul],
  side: Unit.SIDE.PLAYER,
  pos: Unit.POS.BACK,
  items: []
})
// let balsym = new Item.LIB.BALANCESYM()
// balsym.equipTo(prim)
prim.actions.push(new Action.LIB.DRYAD(prim))
prim.actions.push(new Action.LIB.FERAL(prim))
prim.actions.push(new Action.LIB.BASEFORM(prim))
// prim.actions.push(new Action.LIB.HEAL(prim))
prim.actions.push(new Action.LIB.REGEN(prim))
prim.actions.push(new Action.LIB.NATLOG(prim))
let blueRing2 = new Item.LIB.BLUERING()
blueRing2.equipTo(prim)

playerTeam.back.push(prim)
console.log(prim)

var ninjasoul = new Soul.LIB.NINJA()
var ninja = new Unit(gameObj, {
  name: ninjasoul.name,
  hero: true,
  souls: [ninjasoul],
  side: Unit.SIDE.PLAYER,
  pos: Unit.POS.FRONT,
  items: []
})
let parry = new Item.LIB.PARRYKNIFE()
parry.equipTo(ninja)
// ninja.actions.push(new Action.LIB.HEAL(ninja))
// ninja.actions.push(new Action.LIB.HOMING(ninja))
ninja.actions.push(new Action.LIB.VENOMSTRIKE(ninja))
ninja.actions.push(new Action.LIB.NIGHTSTRIKE(ninja))

playerTeam.front.push(ninja)
console.log(ninja)

var baronsoul = new Soul.LIB.BARON()
var baron = new Unit(gameObj, {
  name: baronsoul.name,
  hero: true,
  souls: [baronsoul],
  side: Unit.SIDE.PLAYER,
  pos: Unit.POS.FRONT,
  items: []
})
let axe = new Item.LIB.BERSERKERAXE()
axe.equipTo(baron)
baron.actions.push(new Action.LIB.REBUKE(baron))
// baron.actions.push(new Action.LIB.HOMING(baron))
// baron.actions.push(new Action.LIB.NIGHTSTRIKE(baron))

playerTeam.front.push(baron)
console.log(baron)
console.log('Clone JSON of Baron von Sentry:', baron.cloneJSON)
console.log('Clone JSON of CPU team:', cpuTeam.cloneJSON)
console.log('Clone JSON of player team:', playerTeam.cloneJSON)

export { cpuTeam, playerTeam }
