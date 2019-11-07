import { Unit, Team } from './objects/units/Unit.js'
// import { cloneDeep as clone } from 'lodash'
import { hasIn as hasProp } from 'lodash'
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
// for (let i = 4; i < 5; i++) {
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
  // } else if (i < 3) {
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
      HP: 1,
      MP: 1, // 3, // 4,
      INIT: 1,
      MELEE: 0,
      MAGIC: 3, // 6,
      RANGED: 2, // 6,
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
    // for (let j = 0; j < 2; j++) {
    //   let item = new Item.LIB.BLUERING()
    //   item.equipTo(unit)
    // }
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
jaq.actions.push(new Action.LIB.REGEN(jaq))
jaq.actions.push(new Action.LIB.HEAL(jaq))
jaq.actions.push(new Action.LIB.VENOMSTRIKE(jaq))
jaq.actions.push(new Action.LIB.NIGHTSTRIKE(jaq))
jaq.actions.push(new Action.LIB.INSPIRE(jaq))
//
// Include for larger battle
cpuTeam.front.push(jaq)
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
  let actionArr = [] // obj.actionArr
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
  if (hasProp(soul, 'skills')) {
    actionArr = soul.skills
    console.log(soul.skills)
  }
  actionArr.forEach((actionStr) => {
    console.log(actionStr)
    unit.actions.push(new Action.LIB[actionStr](unit))
  })
  // actionArr.forEach((actionStr) => {
  //   unit.actions.push(new Action.LIB[actionStr](unit))
  // })
  if (unit.pos === Unit.POS.FRONT) {
    playerTeam.front.push(unit)
  } else if (unit.pos === Unit.POS.BACK) {
    playerTeam.back.push(unit)
  }
  for (let soulIndx in unit.souls) {
    let soul = unit.souls[soulIndx]
    if (hasProp(soul, 'passives')) {
      soul.passives.forEach((status) => unit.statuses.push(new Status.LIB[status.NAME]()))
    }
  }
}

let heroMerge = function (unit, obj) {
  let soulStr = obj.soulStr
  // let actionArr = obj.actionArr
  let actionArr = [] // obj.actionArr
  let itemArr = obj.itemArr
  console.log(soulStr, 'added?')
  let soul = new Soul.LIB[soulStr]()
  unit.souls.push(soul)

  itemArr.forEach((itemStr) => {
    let item = new Item.LIB[itemStr]()
    item.equipTo(unit)
  })

  if (hasProp(soul, 'skills')) {
    actionArr = soul.skills
    console.log(soul.skills)
  }
  actionArr.forEach((actionStr) => {
    console.log(actionStr)
    unit.actions.push(new Action.LIB[actionStr](unit))
  })
  // actionArr.forEach((actionStr) => {
  //   unit.actions.push(new Action.LIB[actionStr](unit))
  // })

  if (hasProp(soul, 'passives')) {
    soul.passives.forEach((status) => unit.statuses.push(new Status.LIB[status.NAME]()))
  }

  unit.baseStats.HP.current = unit.baseStats.HP.max
  unit.baseStats.MP.current = unit.baseStats.MP.max
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
    soulStr: 'MINOBISON',
    POS: 'FRONT',
    actionArr: [
      'COFFEE', 'REPRISAL'
    ],
    itemArr: [
      'BALANCESYM'
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
  },
  {
    soulStr: 'JACO',
    POS: 'FRONT',
    actionArr: [
      'FRENZY', 'RESPITE'
    ],
    itemArr: [
      'SPELLSWORD'
    ]
  }
]

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

shuffle(heroDat)

heroDat.filter((obj) => obj.POS === 'FRONT').slice(0, 2).forEach((obj) => heroAdd(obj))
heroDat.filter((obj) => obj.POS === 'BACK').slice(0, 2).forEach((obj) => heroAdd(obj))

let extraFront = heroDat.filter((obj) => obj.POS === 'FRONT').slice(2)
let extraBack = heroDat.filter((obj) => obj.POS === 'BACK').slice(2)
let extras = extraFront.concat(extraBack)
let extraIndx = 0
playerTeam.field.forEach(
  (unit) => {
    heroMerge(unit, extras[extraIndx])
    extraIndx++
  }
)

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

// playerTeam.front.forEach((unit) => {
//   if (unit.souls[0].NAME === 'MOZART') {
//     unit.statuses.push(new Status.LIB.DAMAGETOPOISONIN())
//     unit.statuses.push(new Status.LIB.DAMAGETOPOISONOUT())
//   }
//   if (unit.souls[0].NAME === 'JACO') {
//     unit.statuses.push(new Status.LIB.LIFESTEAL())
//   }
// })

// playerTeam.front.forEach((unit) => {
// })
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
playerTeam.inventory.MANAPOT = 1
playerTeam.inventory.WRATHSCROLL = 1
playerTeam.inventory.FLAMEFISTSCROLL = 1
playerTeam.inventory.HEALSCROLL = 1
playerTeam.inventory.ENLIGHTENSCROLL = 1

console.log('Clone JSON of CPU team:', cpuTeam.cloneJSON)
console.log('Clone JSON of player team:', playerTeam.cloneJSON)

export { cpuTeam, playerTeam }
