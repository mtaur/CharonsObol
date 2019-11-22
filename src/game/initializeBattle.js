import { Unit, Team } from './objects/units/Unit.js'
// import { cloneDeep as clone } from 'lodash'
import { hasIn as hasProp } from 'lodash'
import { Soul } from './objects/souls/Soul.js'
// import { CPUUnit } from './objects/units/CPUUnit.js'
import { Item } from './objects/items/Item.js'
import { Action } from './objects/actions/Action.js'
import { Status } from './objects/statuses/Status.js'
import { UnitTemplate } from './objects/units/templates/UnitTemplate'

var playerTeam = new Team(Unit.SIDE.PLAYER)
var cpuTeam = new Team(Unit.SIDE.CPU)
var gameObj = { playerTeam: playerTeam, cpuTeam: cpuTeam }

function removeDuplicates (arr, propName = 'NAME') {
  console.log(arr)
  // let PROPNAME = propName
  for (let i = arr.length - 1; i > -1; i--) {
    let str = arr[i][propName]
    for (let j = i - 1; j > -1; j--) {
      if (arr[j][propName] === str) {
        arr.splice(j, 1)
        i--
      }
    }
  }
}

// function heroAdd = (soulstr, POS, actionArr, itemArr) {
let heroAdd = function (obj) {
  let soulStr = obj.soulStr
  // let POS = obj.POS
  // let actionArr = [] // obj.actionArr
  let itemArr = obj.itemArr
  console.log(soulStr)
  let unit = new UnitTemplate.LIB.HERO({ soulsArr: [soulStr], itemsArr: itemArr, side: Unit.SIDE.PLAYER }, gameObj)
  removeDuplicates(unit.actions)
  playerTeam.deploy(unit)
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
  removeDuplicates(unit.actions)
  // actionArr.forEach((actionStr) => {
  //   unit.actions.push(new Action.LIB[actionStr](unit))
  // })
  //
  if (hasProp(soul, 'passives')) {
    soul.passives.forEach((status) => unit.statuses.push(new Status.LIB[status.NAME]()))
  }
  unit.baseStats.HP.current = unit.baseStats.HP.max
  unit.baseStats.MP.current = unit.baseStats.MP.max
}

let heroDat = [
  {
    soulStr: 'MOZART',
    POS: 'FRONT',
    itemArr: [
    ]
  },
  {
    soulStr: 'MINOTAUR',
    POS: 'FRONT',
    itemArr: [
      'BERSERKERAXE'
    ]
  },
  {
    soulStr: 'MINOBISON',
    POS: 'FRONT',
    itemArr: [
      'BALANCESYM'
      // 'BERSERKERAXE'
    ]
  },
  {
    soulStr: 'MANATAUR',
    POS: 'FRONT',
    itemArr: [
      'BLUERING'
    ]
  },
  {
    soulStr: 'JACO',
    POS: 'FRONT',
    itemArr: [
      'SPELLSWORD'
    ]
  },
  {
    soulStr: 'BROCANTRIP',
    POS: 'FRONT',
    itemArr: [
      'DIVINEBARRIER'
    ]
  },
  {
    soulStr: 'NINJA',
    POS: 'FRONT',
    itemArr: [
      'PARRYKNIFE', 'DORY'
    ]
  },
  {
    soulStr: 'BARON',
    POS: 'FRONT',
    itemArr: [
      'SPIKEYSHIELD'
    ]
  },
  {
    soulStr: 'PENELOPE',
    POS: 'BACK',
    itemArr: [
      'SPELLSWORD', 'BLUERING', 'MAGICSTAFF'
    ]
  },
  {
    soulStr: 'ANIMUS',
    POS: 'BACK',
    itemArr: [
      'BOW', 'BLUERING', 'MAGICSTAFF'
    ]
  },
  {
    soulStr: 'LYNN',
    POS: 'BACK',
    itemArr: [
      'BRONZERING', 'DORY'
    ]
  },
  {
    soulStr: 'PRIMORDAEA',
    POS: 'BACK',
    itemArr: [
      'BLUERING'
    ]
  },
  {
    soulStr: 'GERALD',
    POS: 'BACK',
    itemArr: [
      'MAGICSTAFF'
    ]
  },
  {
    soulStr: 'THWIP',
    POS: 'BACK',
    itemArr: [
      'ARBALEST' // 'BOW'
    ]
  },
  {
    soulStr: 'AHNWEI',
    POS: 'BACK',
    itemArr: [
      'PARRYKNIFE', 'BLUERING'
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

playerTeam.field.forEach(
  (unit) => {
    heroMerge(unit, extras[0])
    extras.shift()
  }
)

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

let caenenArr = ['KNIGHT', 'ARCHER', 'MAGE', 'TURKEY', 'ARBALESTIER']
caenenArr.forEach((str) => {
  console.log(str)
  cpuTeam.deploy(new UnitTemplate.LIB[str](gameObj))
})
let crazyObj = { soulsArr: [], itemsArr: [] }
let dataArr = extras.slice(0, 4)
dataArr.forEach((datum) => { crazyObj.soulsArr.push(datum.soulStr) })
let itemList = []
for (let NamedItem in Item.LIB) {
  itemList.push(Item.LIB[NamedItem].NAME)
}
shuffle(itemList)
crazyObj.itemsArr = itemList.slice(0, 6)
let crazy = new UnitTemplate.LIB.HERO(crazyObj, gameObj)
if (crazy.pos !== Unit.POS.FRONT) { crazy.pos = Unit.POS.BACK }
cpuTeam.deploy(crazy)
// console.log(crazy.getScalingMatrix)

export { cpuTeam, playerTeam }
