// import { Unit, Team } from './objects/units/Unit.js'
import { Unit } from './objects/units/Unit.js'
// import { cloneDeep as clone } from 'lodash'
import { hasIn as hasProp } from 'lodash'
// import { Soul } from './objects/souls/Soul.js'
// import { CPUUnit } from './objects/units/CPUUnit.js'
// import { Item } from './objects/items/Item.js'
// import { Action } from './objects/actions/Action.js'
// import { Status } from './objects/statuses/Status.js'
// import { UnitTemplate } from './objects/units/templates/UnitTemplate'
//
// var playerTeam = new Team(Unit.SIDE.PLAYER)
// var cpuTeam = new Team(Unit.SIDE.CPU)
// var gameObj = { playerTeam: playerTeam, cpuTeam: cpuTeam }
//
// let unitTempl = {
//   constructor: 'HERO', // 'TURKEY' 'ARCHER' 'KNIGHT' etc.
//   passedObj: {
//     soulsArr: ['LYNN'],
//     itemsArr: ['DORY'],
//     side: Unit.SIDE.PLAYER
//   } // false
// }
//
// cpuJSON = [unitTemp1, unitTempl2, ...]
// playerJSON = [unitTemp1, unitTempl2, ...]

let heroDat = [
  {
    soulStr: 'MOZART',
    POS: 'FRONT',
    itemArr: [
    ],
    lvlUp: {
      HP: 2,
      DRED: 1,
      DREF: 1
    }
  },
  {
    soulStr: 'MINOTAUR',
    POS: 'FRONT',
    itemArr: [
      'BERSERKERAXE'
    ],
    lvlUp: {
      MELEE: 2,
      HP: 2
    }
  },
  {
    soulStr: 'MINOBISON',
    POS: 'FRONT',
    itemArr: [
      'BALANCESYM'
      // 'BERSERKERAXE'
    ],
    lvlUp: {
      HP: 2
    }
  },
  {
    soulStr: 'MANATAUR',
    POS: 'FRONT',
    itemArr: [
      'BLUERING'
    ],
    lvlUp: {
      HP: 1,
      MAGIC: 1,
      DRED: 1,
      DREF: 1
    }
  },
  {
    soulStr: 'JACO',
    POS: 'FRONT',
    itemArr: [
      'SPELLSWORD'
    ],
    lvlUp: {
      HP: 2,
      MAGIC: 1,
      MELEE: 1
    }
  },
  {
    soulStr: 'BROCANTRIP',
    POS: 'FRONT',
    itemArr: [
      'DIVINEBARRIER'
    ],
    lvlUp: {
      MP: 1,
      HP: 1
    }
  },
  {
    soulStr: 'NINJA',
    POS: 'FRONT',
    itemArr: [
      'PARRYKNIFE', 'DORY'
    ],
    lvlUp: {
      INIT: 1,
      HP: 1
    }
  },
  {
    soulStr: 'BARON',
    POS: 'FRONT',
    itemArr: [
      'SPIKEYSHIELD'
    ],
    lvlUp: {
      HP: 2,
      DREF: 1,
      DRED: 1
    }
  },
  {
    soulStr: 'PENELOPE',
    POS: 'BACK',
    itemArr: [
      'SPELLSWORD', 'BLUERING', 'MAGICSTAFF'
    ],
    lvlUp: {
      HP: 2,
      MAGIC: 1
    }
  },
  {
    soulStr: 'ANIMUS',
    POS: 'BACK',
    itemArr: [
      'BOW', 'BLUERING', 'MAGICSTAFF'
    ],
    lvlUp: {
      HP: 2,
      RANGED: 1,
      MAGIC: 1
    }
  },
  {
    soulStr: 'LYNN',
    POS: 'BACK',
    itemArr: [
      'BUCKLER', 'DORY'
    ]
  },
  {
    soulStr: 'PRIMORDAEA',
    POS: 'BACK',
    itemArr: [
      'BLUERING'
    ],
    lvlUp: {
      HP: 1,
      MELEE: 1,
      MAGIC: 1,
      RANGED: 1,
      DRED: 1
    }
  },
  {
    soulStr: 'GERALD',
    POS: 'BACK',
    itemArr: [
      'MAGICSTAFF'
    ],
    lvlUp: {
      HP: 2,
      MAGIC: 1
    }
  },
  {
    soulStr: 'THWIP',
    POS: 'BACK',
    itemArr: [
      'ARBALEST' // 'BOW'
    ],
    lvlUp: {
      HP: 1,
      RANGED: 2
    }
  },
  {
    soulStr: 'LIFEHORN',
    POS: 'FRONT',
    itemArr: [
      'DIVINEBARRIER'
    ],
    lvlUp: {
      HP: 1,
      MAGIC: 1,
      MELEE: 1
    }
  },
  {
    soulStr: 'WRAITH',
    POS: 'BACK',
    itemArr: [
      'MAGICSTAFF'
    ],
    lvlUp: {
      HP: 1,
      MAGIC: 2
    }
  },
  {
    soulStr: 'DEATHWING',
    POS: 'BACK',
    itemArr: [
      'BLUERING'
    ],
    lvlUp: {
      HP: 1,
      MAGIC: 1,
      MELEE: 1
    }
  },
  {
    soulStr: 'AHNWEI',
    POS: 'BACK',
    itemArr: [
      'PARRYKNIFE', 'BLUERING'
    ],
    lvlUp: {
      HP: 1,
      INIT: 1
    }
  }
]

// let caenenArr = ['KNIGHT', 'ARCHER', 'MAGE', 'ARBALESTIER']
// let caenenArr = ['KNIGHT', 'ARCHER', 'MAGE', 'TURKEY', 'ARBALESTIER']
// let caenenArr = []

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

let jsonMerge = (dataNew, old = {}) => {
  let dataOld = old
  //  { soulsArr: [soulStr], itemsArr: itemArr, side: Unit.SIDE.PLAYER }, gameObj
  if (!hasProp(dataOld, 'soulsArr')) { dataOld.soulsArr = [] }
  if (!hasProp(dataOld, 'itemsArr')) { dataOld.itemsArr = [] }
  if (!hasProp(dataOld, 'lvlUp')) { dataOld.lvlUp = {} }
  if (!hasProp(dataOld, 'side')) { dataOld.side = Unit.SIDE.PLAYER }

  if (hasProp(dataNew, 'lvlUp')) {
    for (let statName in dataNew.lvlUp) {
      dataOld.lvlUp[statName] = hasProp(dataOld.lvlUp, statName)
        ? Math.ceil(Math.pow(dataOld.lvlUp[statName] * dataOld.lvlUp[statName] + dataNew.lvlUp[statName] * dataNew.lvlUp[statName], 0.5), 0.5)
        : dataNew.lvlUp[statName]
    }
  }

  dataOld.soulsArr.push(dataNew.soulStr)
  dataNew.itemArr.forEach((item) => { dataOld.itemsArr.push(item) })
  dataOld.POS = dataNew.POS
  return dataOld
}

let heroesFront = []
let heroesBack = []

heroDat.filter((obj) => obj.POS === 'FRONT').slice(0, 2).forEach((obj) => { heroesFront.push(jsonMerge(obj)) })
heroDat.filter((obj) => obj.POS === 'BACK').slice(0, 2).forEach((obj) => { heroesBack.push(jsonMerge(obj)) })
// heroDat.filter((obj) => obj.POS === 'FRONT').slice(0, 2).forEach((obj) => heroAdd(obj))
// heroDat.filter((obj) => obj.POS === 'BACK').slice(0, 2).forEach((obj) => heroAdd(obj))

let heroes = heroesFront.concat(heroesBack)

let extraFront = heroDat.filter((obj) => obj.POS === 'FRONT').slice(2)
let extraBack = heroDat.filter((obj) => obj.POS === 'BACK').slice(2)
let extras = extraFront.concat(extraBack)
shuffle(extras)

let playerJSON = []
heroes.forEach(
  (data) => {
    jsonMerge(extras[0], data)
    extras.shift()
  }
)
heroes.forEach((json) => {
  playerJSON.push({
    NAME: 'HERO',
    passedObj: json
  })
})

let cpuJSON = []

let dataArr = extras.slice(0, 3)
// let cerberusArr = extras.slice(0, 3)
let cerberusObj = { soulsArr: [], itemsArr: [], side: Unit.SIDE.CPU }
cerberusObj = jsonMerge({
  soulStr: 'CERBERUS',
  POS: 'BACK',
  itemArr: [
    'BALANCESYM', 'BLUERING', 'BERSERKERAXE'
  ],
  lvlUp: {
  }
}, cerberusObj)
dataArr.forEach((headData) => {
  let headObj = { soulsArr: [], itemsArr: [], side: Unit.SIDE.CPU }
  headObj = jsonMerge(headData, headObj)
  cerberusObj = jsonMerge(headData, cerberusObj)

  cpuJSON.push({
    NAME: 'HERO',
    passedObj: headObj
  })
})

cpuJSON.push({
  NAME: 'CERBERUS',
  passedObj: cerberusObj
})

// caenenArr.forEach((str) => {
//   cpuJSON.push({
//     NAME: str,
//     passedObj: false
//   })
// })
let scrolls = {
  // SMOKEBOMB: 1,
  // HEALTHPOT: 1,
  // LIZARDTAIL: 1,
  // MANAPOT: 1,
  // WRATHSCROLL: 1,
  // FLAMEFISTSCROLL: 1,
  // HEALSCROLL: 1,
  // ENLIGHTENSCROLL: 1
}

// let playerJSON = heroes
// let cpuJSON = caenenArr.push(crazyObj)
// console.log(playerJSON)
// console.log(cpuJSON, 'cpuJSON === 6???')

export { cpuJSON, playerJSON, scrolls }
