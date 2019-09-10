import { Unit, Team } from './objects/units/Unit.js'
// import { cloneDeep as clone } from 'lodash'
import { Soul } from './objects/souls/Soul.js'
import { CPUUnit } from './objects/units/CPUUnit.js'
import { Item } from './objects/items/Item.js'
import { Action } from './objects/actions/Action.js'
import { Status } from './objects/statuses/Status.js'

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
for (let i = 1; i < 5; i++) {
// for (let i = 1; i < 4; i++) {
  if (i < 2) {
    let unit = new CPUUnit(gameObj, caenenTemplate())
    unit.statWeights = {
      HP: 4, // 6,
      MP: 0,
      INIT: 1,
      MELEE: 3, // 5,
      RANGED: 0,
      DRED: 2, // 3,
      DREF: 2 // 3
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
  } else if (i < 4) {
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
    unit.name = 'Archer of Caenenfoeder ' + (i - 1)
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
      MP: 3, // 4,
      INIT: 1,
      MELEE: 0,
      MAGIC: 4, // 6,
      RANGED: 3, // 6,
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

// let front = []
// let back = []

// function heroAdd = (soulstr, POS, actionArr, itemArr) {
let heroAdd = function (obj) {
  let soulStr = obj.soulStr
  let POS = obj.POS
  let actionArr = obj.actionArr
  let itemArr = obj.itemArr
  console.log(soulStr)
  let soul = new Soul.LIB[soulStr]()
  let unit = new Unit(gameObj, {
    name: soul.name,
    hero: true,
    souls: [soul],
    side: Unit.SIDE.PLAYER,
    pos: Unit.POS[POS],
    items: []
  })
  itemArr.forEach((itemStr) => {
    let item = new Item.LIB[itemStr]()
    item.equipTo(unit)
  })
  actionArr.forEach((actionStr) => {
    unit.actions.push(new Action.LIB[actionStr](unit))
  })
  if (unit.pos === Unit.POS.FRONT) {
    playerTeam.front.push(unit)
  } else if (unit.pos === Unit.POS.BACK) {
    playerTeam.back.push(unit)
  }
}

let heroDat = [
  {
    soulStr: 'PENELOPE',
    POS: 'BACK',
    actionArr: [
      'FLAMEFIST', 'CHAINLGT', 'HOMING'
    ],
    itemArr: [
      'SPELLSWORD', 'BLUERING', 'MAGICSTAFF'
    ]
  },
  {
    soulStr: 'LYNN',
    POS: 'BACK',
    actionArr: [
      'HARRY', 'LUNGE'
    ],
    itemArr: [
      'BRONZERING', 'BRONZERING'
    ]
  },
  {
    soulStr: 'BROCANTRIP',
    POS: 'FRONT',
    actionArr: [
      'INSPIRE', 'HEAL'
    ],
    itemArr: [
      'DIVINEBARRIER'
    ]
  },
  {
    soulStr: 'PRIMORDAEA',
    POS: 'BACK',
    actionArr: [
      'DRYAD', 'FERAL', 'BASEFORM', 'REGEN', 'NATLOG'
    ],
    itemArr: [
      'BLUERING'
    ]
  },
  {
    soulStr: 'NINJA',
    POS: 'FRONT',
    actionArr: [
      'VENOMSTRIKE', 'NIGHTSTRIKE'
    ],
    itemArr: [
      'PARRYKNIFE'
    ]
  },
  {
    soulStr: 'BARON',
    POS: 'FRONT',
    actionArr: [
      'REBUKE', 'ADVANCE'
    ],
    itemArr: [
      'SPIKEYSHIELD'
    ]
  },
  {
    soulStr: 'GERALD',
    POS: 'BACK',
    actionArr: [
      'STORMCLOUD', 'GUILTTRIP'
    ],
    itemArr: [
      'MAGICSTAFF'
    ]
  },
  {
    soulStr: 'THWIP',
    POS: 'BACK',
    actionArr: [
      'ALERT', 'SNIPE'
    ],
    itemArr: [
      'PARRYKNIFE'
    ]
  },
  {
    soulStr: 'AHNWEI',
    POS: 'BACK',
    actionArr: [
      'DISILLUSION', 'NIRVANA'
    ],
    itemArr: [
      'PARRYKNIFE', 'BLUERING'
    ]
  },
  {
    soulStr: 'MOZART',
    POS: 'FRONT',
    actionArr: [
      'BRAINS', 'CONTAGION'
    ],
    itemArr: [
    ]
  },
  {
    soulStr: 'MINOTAUR',
    POS: 'FRONT',
    actionArr: [
      'BERSERK', 'AXETHROW'
    ],
    itemArr: [
      // 'BERSERKERAXE'
    ]
  },
  {
    soulStr: 'MANATAUR',
    POS: 'FRONT',
    actionArr: [
      'TAURBLAST', 'TAURVESTLIFE', 'TAURVESTMANA'
    ],
    itemArr: [
      'BLUERING'
    ]
  }
]

// var pensoul = new Soul.LIB.PENELOPE()
// var pen = new Unit(gameObj, { name: pensoul.name,
//   hero: true,
//   souls: [pensoul],
//   side: Unit.SIDE.PLAYER,
//   pos: Unit.POS.BACK,
//   items: []
// })
//
// let spellsword = new Item.LIB.SPELLSWORD()
// let blueRing = new Item.LIB.BLUERING()
// let magicStaff = new Item.LIB.MAGICSTAFF()
//
// spellsword.equipTo(pen)
// blueRing.equipTo(pen)
// magicStaff.equipTo(pen)
//
// pen.actions.push(new Action.LIB.FLAMEFIST(pen))
// pen.actions.push(new Action.LIB.CHAINLGT(pen))
// pen.actions.push(new Action.LIB.HOMING(pen))
//
// back.push(pen)
// console.log(pen)

// var lynnsoul = new Soul.LIB.LYNN()
// var lynn = new Unit(gameObj, {
//   name: lynnsoul.name,
//   souls: [lynnsoul],
//   hero: true,
//   side: Unit.SIDE.PLAYER,
//   pos: Unit.POS.BACK,
//   items: []
// })
//
// let bronzeRing = new Item.LIB.BRONZERING()
//
// bronzeRing.equipTo(lynn)
// lynn.actions.push(new Action.LIB.LUNGE(lynn)) // = ['melee', 'ranged', 'lunge', 'block']
// lynn.actions.push(new Action.LIB.HARRY(lynn)) // = ['melee', 'ranged', 'lunge', 'block']
//
// back.push(lynn)
// console.log(lynn)

// var brosoul = new Soul.LIB.BROCANTRIP()
// var bro = new Unit(gameObj, {
//   name: brosoul.name,
//   hero: true,
//   souls: [brosoul],
//   side: Unit.SIDE.PLAYER,
//   pos: Unit.POS.FRONT,
//   items: []
// })
// let divineBarrier = new Item.LIB.DIVINEBARRIER()
// divineBarrier.equipTo(bro)
// bro.actions.push(new Action.LIB.INSPIRE(bro))
// bro.actions.push(new Action.LIB.HEAL(bro))
//
// front.push(bro)
// console.log(bro)

// var primsoul = new Soul.LIB.PRIMORDAEA()
// var prim = new Unit(gameObj, {
//   name: primsoul.name,
//   hero: true,
//   souls: [primsoul],
//   side: Unit.SIDE.PLAYER,
//   pos: Unit.POS.BACK,
//   items: []
// })
// prim.actions.push(new Action.LIB.DRYAD(prim))
// prim.actions.push(new Action.LIB.FERAL(prim))
// prim.actions.push(new Action.LIB.BASEFORM(prim))
// //
// prim.actions.push(new Action.LIB.REGEN(prim))
// prim.actions.push(new Action.LIB.NATLOG(prim))
// let blueRing2 = new Item.LIB.BLUERING()
// blueRing2.equipTo(prim)
//
// back.push(prim)
// console.log(prim)

// var ninjasoul = new Soul.LIB.NINJA()
// var ninja = new Unit(gameObj, {
//   name: ninjasoul.name,
//   hero: true,
//   souls: [ninjasoul],
//   side: Unit.SIDE.PLAYER,
//   pos: Unit.POS.FRONT,
//   items: []
// })
// let parry = new Item.LIB.PARRYKNIFE()
// parry.equipTo(ninja)
// // ninja.actions.push(new Action.LIB.HEAL(ninja))
// // ninja.actions.push(new Action.LIB.HOMING(ninja))
// ninja.actions.push(new Action.LIB.VENOMSTRIKE(ninja))
// ninja.actions.push(new Action.LIB.NIGHTSTRIKE(ninja))
//
// front.push(ninja)
// console.log(ninja)

// var baronsoul = new Soul.LIB.BARON()
// var baron = new Unit(gameObj, {
//   name: baronsoul.name,
//   hero: true,
//   souls: [baronsoul],
//   side: Unit.SIDE.PLAYER,
//   pos: Unit.POS.FRONT,
//   items: []
// })
// let spikeyShield = new Item.LIB.SPIKEYSHIELD()
// spikeyShield.equipTo(baron)
// baron.actions.push(new Action.LIB.REBUKE(baron))
//
// front.push(baron)
// console.log(baron)

// var geraldsoul = new Soul.LIB.GERALD()
// var gerald = new Unit(gameObj, { name: geraldsoul.name,
//   hero: true,
//   souls: [geraldsoul],
//   side: Unit.SIDE.PLAYER,
//   pos: Unit.POS.BACK,
//   items: []
// })
//
// let blueRing3 = new Item.LIB.BLUERING()
// let magicStaff3 = new Item.LIB.MAGICSTAFF()
//
// blueRing3.equipTo(gerald)
// magicStaff3.equipTo(gerald)
//
// back.push(gerald)
// gerald.actions.push(new Action.LIB.STORMCLOUD(gerald))
// gerald.actions.push(new Action.LIB.GUILTTRIP(gerald))

// var thwipsoul = new Soul.LIB.THWIP()
// var thwip = new Unit(gameObj, { name: thwipsoul.name,
//   hero: true,
//   souls: [thwipsoul],
//   side: Unit.SIDE.PLAYER,
//   pos: Unit.POS.BACK,
//   items: []
// })
//
// let parryknife2 = new Item.LIB.PARRYKNIFE()
// parryknife2.equipTo(thwip)
//
// thwip.actions.push(new Action.LIB.ALERT(thwip))
// thwip.actions.push(new Action.LIB.SNIPE(thwip))
// back.push(thwip)

// var minotaursoul = new Soul.LIB.MINOTAUR()
// var minotaur = new Unit(gameObj, { name: minotaursoul.name,
//   hero: true,
//   souls: [minotaursoul],
//   side: Unit.SIDE.PLAYER,
//   pos: Unit.POS.FRONT,
//   items: []
// })
//
// let tauraxe = new Item.LIB.BERSERKERAXE()
//
// tauraxe.equipTo(minotaur)
// front.push(minotaur)
// minotaur.actions.push(new Action.LIB.BERSERK(minotaur))
// minotaur.actions.push(new Action.LIB.AXETHROW(minotaur))

let shuffle = function (array) {
  let currentIndex = array.length
  let temporaryValue, randomIndex
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

// let front = playerTeam.bench.filter((unit) => unit.pos === 'front')
// let back = playerTeam.bench.filter((unit) => unit.pos === 'back')
// shuffle(front)
// shuffle(back)
shuffle(heroDat)
heroDat.filter((obj) => obj.POS === 'FRONT').slice(0, 3).forEach((obj) => heroAdd(obj))
heroDat.filter((obj) => obj.POS === 'BACK').slice(0, 3).forEach((obj) => heroAdd(obj))

// playerTeam.front = front.slice(0, 3)
// playerTeam.back = back.slice(0, 3)
// playerTeam.front.forEach((unit) => {
//   let mergeObj = {
//     NAME: 'HEALTHOVERTIME',
//     name: 'healthovertime',
//     scale: {},
//     flat: -100,
//     virulence: 0.05
//   }
//   unit.statuses.push(new Status.LIB.HEALTHOVERTIME(mergeObj, unit, unit))
//   // unit.statuses.push(new Status.LIB.HEALTHOVERTIME({ flat: -50, virulence: 0.05 }))
// })

playerTeam.front.forEach((unit) => {
  if (unit.souls[0].NAME === 'MOZART') {
    unit.statuses.push(new Status.LIB.DAMAGETOPOISONIN())
    unit.statuses.push(new Status.LIB.DAMAGETOPOISONOUT())
  }
})
// playerTeam.front.forEach((unit) => { unit.statuses.push(new Status.LIB.DAMAGETOPOISONOUT()) })
// playerTeam.front.forEach((unit) => { unit.statuses.push(new Status.LIB.DAMAGETOPOISONIN()) })
// playerTeam.front.forEach((unit) => { unit.actions.push(new Action.LIB.CONTAGION(unit)) })

playerTeam.all.forEach((unit) => {
  unit.actions.push(new Action.LIB.RESTMAJOR(unit))
  unit.actions.push(new Action.LIB.RESTMINOR(unit))
})

playerTeam.inventory.SMOKEBOMB = 1
playerTeam.inventory.HEALTHPOT = 1
playerTeam.inventory.LIZARDTAIL = 1
playerTeam.inventory.MANAPOT = 2

console.log('Clone JSON of CPU team:', cpuTeam.cloneJSON)
console.log('Clone JSON of player team:', playerTeam.cloneJSON)

export { cpuTeam, playerTeam }
