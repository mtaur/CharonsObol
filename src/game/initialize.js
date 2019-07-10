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

// test script
// var jaq2 = new CPUUnit(gameObj)
// // console.log('Outside of constructor...')
// console.log(jaq2)
// jaq2.raiseAll()
// cpuTeam.front.push(jaq2)
// jaq2.hasAction.major = true
// jaq2.hasAction.minor = true
//
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
    //
    cpuTeam.front.push(unit)
    //
    // console.log('Outside of constructor...')
    removeByNAME(unit.actions, 'RANGED')
    removeByNAME(unit.actions, 'RUN')
    removeByNAME(unit.actions, 'MOVE')
    console.log(unit)
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
    unit.pos = Unit.POS.BACK
    unit.name = 'Archer of Caenenfoeder ' + i
    unit.raiseAll()
    //
    cpuTeam.back.push(unit)
    //
    // console.log('Outside of constructor...')
    removeByNAME(unit.actions, 'MELEE')
    removeByNAME(unit.actions, 'MOVE')
    removeByNAME(unit.actions, 'RUN')
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
jaq.actions.push(new Action.LIB.CHAINLGT(jaq))
// jaq.actions.push(new Action.LIB.FLAMEFIST(jaq))
jaq.actions.push(new Action.LIB.HEAL(jaq))
jaq.actions.push(new Action.LIB.LUNGE(jaq))
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
deadGuy.pos = Unit.POS.BENCH
deadGuy.name = 'Archer of Caenenfoeder (deceased)'
cpuTeam.bench.push(deadGuy)
// console.log('Outside of constructor...')
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
// lynn.souls = [lynnsoul]

let spikeyShield = new Item.LIB.SPIKEYSHIELD()
let bronzeRing = new Item.LIB.BRONZERING()

spikeyShield.equipTo(lynn)
bronzeRing.equipTo(lynn)
// lynn.equip(new Item.LIB.BERSERKERAXE())
// lynn.equip(new Item.LIB.YOLOMACE())
// lynn.equip(new Item.LIB.SPELLSWORD())
// lynn.actions.push({ name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }) // = ['melee', 'ranged', 'lunge', 'block']
lynn.actions.push(new Action.LIB.LUNGE(lynn)) // = ['melee', 'ranged', 'lunge', 'block']
lynn.actions.push(new Action.LIB.HARRY(lynn)) // = ['melee', 'ranged', 'lunge', 'block']

// lynn.baseStats.HP.current -= 15
// console.log('Outside of constructor...')
console.log(lynn)

// lynn.hasAction.major = false

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
let yoloMace = new Item.LIB.YOLOMACE()
let martyrStaff = new Item.LIB.MARTYRSTAFF()
divineBarrier.equipTo(bro)
yoloMace.equipTo(bro)
martyrStaff.equipTo(bro)
// bro.equip(new Item.LIB.YOLOMACE())
// bro.equip(new Item.LIB.MARTYRSTAFF())
// bro.equip(divineBarrier)
// bro.hasAction.minor = false
bro.actions.push(new Action.LIB.INSPIRE(bro))
bro.actions.push(new Action.LIB.HEAL(bro))
// bro.actions.push(new Action.LIB.NATLOG(bro))
// bro.items.push(new Item.LIB.DIVINEBARRIER())

// bro.baseStats.HP.current -= 40

playerTeam.front.push(bro)

// playerTeam.all.forEach((unit) => { unit.baseStats.HP.current = 1 })
// bro.souls = [brosoul]
// console.log('Outside of constructor...')
console.log(bro)

var primsoul = new Soul.LIB.PRIMORDAEA()
var prim = new Unit(gameObj, {
  name: primsoul.name,
  hero: true,
  souls: [primsoul],
  side: Unit.SIDE.PLAYER,
  pos: Unit.POS.FRONT,
  items: []
})
let balsym = new Item.LIB.BALANCESYM()
balsym.equipTo(prim)
prim.actions.push(new Action.LIB.DRYAD(prim))
prim.actions.push(new Action.LIB.FERAL(prim))
prim.actions.push(new Action.LIB.BASEFORM(prim))
prim.actions.push(new Action.LIB.HEAL(prim))
prim.actions.push(new Action.LIB.NATLOG(prim))

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
// let balsym = new Item.LIB.BALANCESYM()
// balsym.equipTo(prim)
ninja.actions.push(new Action.LIB.HEAL(ninja))
// ninja.actions.push(new Action.LIB.FLAMEFIST(ninja))
ninja.actions.push(new Action.LIB.HOMING(ninja))

playerTeam.back.push(ninja)
console.log(ninja)

export { cpuTeam, playerTeam }
