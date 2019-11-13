import { classdir as templLib } from './jsload.js'
// import { hasIn as hasProp, cloneDeep as clone } from 'lodash'
import { hasIn as hasProp } from 'lodash'
// import { cloneDeep as clone } from 'lodash'
// import { Unit, Team } from './objects/units/Unit.js'
import { Unit } from '../Unit.js'
import { CPUUnit } from '../CPUUnit.js'
import { Action } from '../../actions/Action.js'
import { Status } from '../../statuses/Status.js'
import { Soul } from '../../souls/Soul.js'
import { Item } from '../../items/Item.js'

// console.log(Soul)
class UnitTemplate {
  // static NAME = 'BROCANTRIP'
  static LIB = {}

  // NAME = 'JAQEN'
  // name = 'Jaqen'
  // desc = 'A man is no one.'
  // templ = {}
  // roles = ['KNIGHT']

  static jaq (gameObj) {
    let templ = {
      NAME: 'JAQEN',
      name: 'Jaqen',
      desc: 'A man is no one.',
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

  static removeByNAME (arr, str, propName = 'NAME') {
    // let found = -1
    // let PROPNAME = propName
    console.log('searching', arr, str, propName)
    for (let i = arr.length - 1; i > -1; i--) {
      if (arr[i][propName] === str) {
        arr.splice(i, 1)
      }
    }
  }

  static removeDuplicates (arr, propName = 'NAME') {
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

  constructor (objPassed = {}, gameObj = {}) {
    let obj = objPassed
    //
    // passed.templ = {
    //  baseStats: { HP: { ... }, MP: { ... }, ... },
    //  statWeights: { HP, MP, ... }
    // }

    let templ = UnitTemplate.jaq(gameObj)
    if (!hasProp(templ, 'passives')) { templ.passives = [] }
    templ.statWeights = obj.templ.statWeights
    // overwrite default scaling and starting values where applicable
    for (let propName in obj.templ.baseStats) {
      for (let propSubname in obj.templ.baseStats[propName]) {
        templ.baseStats[propName][propSubname] = obj.templ.baseStats[propName][propSubname]
      }
    }
    if (hasProp(obj, 'templ.hero')) {
      templ.hero = obj.templ.hero
    }
    templ.name = obj.name
    templ.NAME = obj.NAME
    templ.desc = obj.desc
    //   if (hasProp(templ, propName)) {
    //     templ[propName] = obj.templ[propName]
    //   } else { alert('Item constructor: Missing prop', propName) }
    // }

    let unit = new CPUUnit(gameObj, templ)

    unit.statWeights = templ.statWeights
    // UnitTemplate.removeByNAME(unit.actions, 'RANGED')
    // UnitTemplate.removeByNAME(unit.actions, 'RUN')
    // UnitTemplate.removeByNAME(unit.actions, 'MOVE')
    unit.actions = []
    // if (hasProp(templ, 'actions')) {
    //   templ.actions.forEach((actionStr) => unit.actions.push(new Action.LIB[actionStr](unit)))
    // }
    obj.templ.actions.forEach((actionStr) => unit.actions.push(new Action.LIB[actionStr](unit)))
    obj.templ.passives.forEach((status) => unit.statuses.push(new Status.LIB[status.NAME]()))
    obj.templ.souls.forEach((soulStr) => unit.souls.push(new Soul.LIB[soulStr]()))
    obj.templ.items.forEach((itemStr) => {
      let item = new Item.LIB[itemStr]()
      item.equipTo(unit)
      // unit.items.push(new Item.LIB[itemStr](unit))
    })

    unit.pos = obj.pos
    // unit.pos = hasProp(obj, 'pos') ? obj.pos : ['BACK']
    unit.roles = hasProp(obj, 'roles') ? obj.roles : ['KNIGHT']
    unit.raiseAll()
    //
    // cpuTeam.front.push(unit)
    //
    unit.baseStats.HP.current = unit.baseStats.HP.max
    unit.baseStats.MP.current = unit.baseStats.MP.max
    console.log(unit)
    return unit
  }
}

// populate library using jsload from ./bulk
for (let key in templLib) {
  let NamedTempl = templLib[key]
  // Redundant functionality with constructor, but ESLint
  // doesn't like 'unused' objects:
  if (!UnitTemplate.LIB[NamedTempl.NAME]) { UnitTemplate.LIB[NamedTempl.NAME] = NamedTempl }
}

export { UnitTemplate }
