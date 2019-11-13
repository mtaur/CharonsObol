import { Unit, Team } from './objects/units/Unit.js'
// import { cloneDeep as clone } from 'lodash'
import { hasIn as hasProp } from 'lodash'
import { Soul } from './objects/souls/Soul.js'
import { CPUUnit } from './objects/units/CPUUnit.js'
import { Item } from './objects/items/Item.js'
import { Action } from './objects/actions/Action.js'
import { Status } from './objects/statuses/Status.js'
import { UnitTemplate } from './objects/units/templates/UnitTemplate'

var playerTeam = new Team(Unit.SIDE.PLAYER)
var cpuTeam = new Team(Unit.SIDE.CPU)
var gameObj = { playerTeam: playerTeam, cpuTeam: cpuTeam }

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

function removeByNAME (arr, str, propName = 'NAME') {
  // let found = -1
  // let PROPNAME = propName
  console.log('searching', arr, str, propName)
  for (let i = arr.length - 1; i > -1; i--) {
    if (arr[i][propName] === str) {
      arr.splice(i, 1)
    }
  }
}

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

// Knight of Caenenfoeder
for (let i = 1; i <= 3; i++) {
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
    unit.roles = ['KNIGHT']
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
    unit.name = 'Archer of Caenenfoeder ' + (i - 1)
    unit.roles = ['ARCHER']
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
    unit.roles = ['MAGE']
    unit.raiseAll()

    cpuTeam.back.push(unit)
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
  removeDuplicates(unit.actions)
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

let cpuMerge = function (unit, obj) {
  let soulStr = obj.soulStr
  // let actionArr = obj.actionArr
  let actionArr = [] // obj.actionArr
  let itemArr = obj.itemArr
  console.log(soulStr, 'added?')
  let soul = new Soul.LIB[soulStr]()
  unit.souls.push(soul)
  unit.name = soul.name

  itemArr.forEach((itemStr) => {
    let item = new Item.LIB[itemStr]()
    item.equipTo(unit)
  })

  if (hasProp(soul, 'AISkills')) {
    actionArr = soul.AISkills
    console.log(soul.AISkills)
  }
  actionArr.forEach((actionStr) => {
    console.log(actionStr)
    unit.actions.push(new Action.LIB[actionStr](unit))
  })
  removeDuplicates(unit.actions)
  // actionArr.forEach((actionStr) => {
  //   unit.actions.push(new Action.LIB[actionStr](unit))
  // })

  if (hasProp(soul, 'passives')) {
    soul.passives.forEach((status) => unit.statuses.push(new Status.LIB[status.NAME]()))
  }

  unit.baseStats.HP.current = unit.baseStats.HP.max
  unit.baseStats.MP.current = unit.baseStats.MP.max
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
      // 'BERSERKERAXE'
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
      'PARRYKNIFE'
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
    soulStr: 'LYNN',
    POS: 'BACK',
    itemArr: [
      'BRONZERING', 'BRONZERING'
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
      'PARRYKNIFE'
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

let hasMatch = (arr1, arr2) => {
  return arr1.some((str1) => arr2.some((str2) => str1 === str2))
}

cpuTeam.field.forEach((unit) => {
  console.log(unit.name)
  let roleFiltered = extras.filter((obj) => {
    let soul = new Soul.LIB[obj.soulStr]()
    return hasMatch(unit.roles, soul.AIRoles)
  })
  console.log('roleFiltered:', roleFiltered, unit.roles)
  if (roleFiltered.length > 0) {
    cpuMerge(unit, roleFiltered[0])
    removeByNAME(extras, roleFiltered[0].soulStr, 'soulStr')
    removeByNAME(extraFront, roleFiltered[0].soulStr, 'soulStr')
    removeByNAME(extraBack, roleFiltered[0].soulStr, 'soulStr')
  } else {
    cpuMerge(unit, extras[0])
    removeByNAME(extraFront, extras[0].soulStr, 'soulStr')
    removeByNAME(extraBack, extras[0].soulStr, 'soulStr')
    extras.shift()
  }
  console.log(unit.name)
  // extraIndx++
})

playerTeam.field.forEach(
  (unit) => {
    heroMerge(unit, extras[0])
    extras.shift()
    // extraIndx++
    // heroMerge(unit, extras[extraIndx])
    // extraIndx++
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

let knight = new UnitTemplate.LIB.KNIGHT(gameObj)
cpuTeam.front.push(knight)
let archer = new UnitTemplate.LIB.ARCHER(gameObj)
cpuTeam.back.push(archer)
let mage = new UnitTemplate.LIB.MAGE(gameObj)
cpuTeam.back.push(mage)
let zom = new UnitTemplate.LIB.HERO({ soulsArr: ['MOZART', 'JACO'], itemsArr: ['SPELLSWORD', 'PARRYKNIFE', 'BALANCESYM'] }, gameObj)
cpuTeam.front.push(zom)

export { cpuTeam, playerTeam }
