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
      HP: 1,
      DREF: 1 // ,
      // DRED: 1,
      // DREF: 1
    }
  },
  {
    soulStr: 'MINOTAUR',
    POS: 'FRONT',
    itemArr: [
      // 'BERSERKERAXE'
    ],
    lvlUp: {
      HP: 1,
      MELEE: 1
      // MELEE: 2,
      // HP: 2
    }
  },
  {
    soulStr: 'MINOBISON',
    POS: 'FRONT',
    itemArr: [
      // 'BALANCESYM'
      // 'BERSERKERAXE'
    ],
    lvlUp: {
      HP: 1,
      DRED: 1
    }
  },
  {
    soulStr: 'MANATAUR',
    POS: 'FRONT',
    itemArr: [
      // 'BLUERING'
    ],
    lvlUp: {
      HP: 1,
      MAGIC: 1 // ,
      // DRED: 1,
      // DREF: 1
    }
  },
  {
    soulStr: 'JACO',
    POS: 'FRONT',
    itemArr: [
      // 'SPELLSWORD'
    ],
    lvlUp: {
      HP: 1,
      MELEE: 1
      // HP: 2,
      // MAGIC: 1,
      // MELEE: 1
    }
  },
  {
    soulStr: 'BROCANTRIP',
    POS: 'FRONT',
    itemArr: [
      // 'DIVINEBARRIER'
    ],
    lvlUp: {
      // MP: 1,
      HP: 1,
      RANGED: 1
    }
  },
  {
    soulStr: 'NINJA',
    POS: 'FRONT',
    itemArr: [
      // 'PARRYKNIFE', 'DORY'
    ],
    lvlUp: {
      // INIT: 1,
      HP: 1
    }
  },
  {
    soulStr: 'BARON',
    POS: 'FRONT',
    itemArr: [
      // 'SPIKEYSHIELD'
    ],
    lvlUp: {
      HP: 1,
      MELEE: 1
      // HP: 2,
      // DREF: 1,
      // DRED: 1
    }
  },
  {
    soulStr: 'PENELOPE',
    POS: 'BACK',
    itemArr: [
      // 'SPELLSWORD', 'BLUERING', 'MAGICSTAFF'
    ],
    lvlUp: {
      HP: 1,
      MAGIC: 1
      // HP: 2,
      // MAGIC: 1
    }
  },
  {
    soulStr: 'ANIMUS',
    POS: 'BACK',
    itemArr: [
      // 'BOW', 'BLUERING', 'MAGICSTAFF'
    ],
    lvlUp: {
      HP: 1,
      RANGED: 1
      // HP: 2,
      // RANGED: 1,
      // MAGIC: 1
    }
  },
  {
    soulStr: 'LYNN',
    POS: 'BACK',
    itemArr: [
      // 'BRONZERING', 'DORY'
    ],
    lvlUp: {
      HP: 1,
      MELEE: 1,
      RANGED: 1
    }
  },
  {
    soulStr: 'PRIMORDAEA',
    POS: 'BACK',
    itemArr: [
      // 'BLUERING'
    ],
    lvlUp: {
      HP: 1,
      MAGIC: 1
      // MELEE: 1,
      // RANGED: 1,
      // DRED: 1
    }
  },
  {
    soulStr: 'GERALD',
    POS: 'BACK',
    itemArr: [
      // 'MAGICSTAFF'
    ],
    lvlUp: {
      HP: 1,
      MAGIC: 1
    }
  },
  {
    soulStr: 'THWIP',
    POS: 'BACK',
    itemArr: [
      // 'ARBALEST' // 'BOW'
    ],
    lvlUp: {
      HP: 1,
      RANGED: 1
      // RANGED: 2
    }
  },
  {
    soulStr: 'AHNWEI',
    POS: 'BACK',
    itemArr: [
      // 'PARRYKNIFE', 'BLUERING'
    ],
    lvlUp: {
      HP: 1,
      MAGIC: 1
      // INIT: 1
    }
  }
]

// let caenenArr = ['KNIGHT', 'ARCHER', 'MAGE', 'TURKEY', 'ARBALESTIER']
let caenenArr = ['KNIGHT', 'ARCHER', 'RATSLIME', 'MAGE']

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
shuffle(caenenArr)
caenenArr = caenenArr.slice(0, 2)

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

let row = Math.random() > 0.5 ? 'front' : 'back'
if (row === 'front') {
  heroDat.filter((obj) => obj.POS === 'FRONT').slice(0, 1).forEach((obj) => { heroesFront.push(jsonMerge(obj)) })
} else {
  heroDat.filter((obj) => obj.POS === 'BACK').slice(0, 1).forEach((obj) => { heroesBack.push(jsonMerge(obj)) })
}
// heroDat.filter((obj) => obj.POS === 'FRONT').slice(0, 2).forEach((obj) => heroAdd(obj))
// heroDat.filter((obj) => obj.POS === 'BACK').slice(0, 2).forEach((obj) => heroAdd(obj))

let heroes = heroesFront.concat(heroesBack)

// let extraFront = heroDat.filter((obj) => obj.POS === 'FRONT').slice(2)
// let extraBack = heroDat.filter((obj) => obj.POS === 'BACK').slice(2)
// let extras = extraFront.concat(extraBack)
// shuffle(extras)

// heroes.forEach(
//   (data) => {
//     jsonMerge(extras[0], data)
//     extras.shift()
//   }
// )

// let crazyObj = { soulsArr: [], itemsArr: [], side: Unit.SIDE.CPU }
// let dataArr = extras.slice(0, 4)
// crazyObj = jsonMerge(dataArr[0], crazyObj)
// dataArr.shift()
// // console.log(crazyObj, 'crazyObj step 1')
// dataArr.forEach((datum) => {
//   crazyObj = jsonMerge(datum, crazyObj)
// })

let playerJSON = []
let cpuJSON = []

heroes.forEach((json) => {
  playerJSON.push({
    NAME: 'HERO',
    passedObj: json
  })
})
caenenArr.forEach((str) => {
  cpuJSON.push({
    NAME: str,
    passedObj: false
  })
})
// cpuJSON.push({
//   NAME: 'HERO',
//   passedObj: crazyObj
// })
let scrolls = {
  HEALTHPOT: 1,
  LIZARDTAIL: 1,
  MANAPOT: 1
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
