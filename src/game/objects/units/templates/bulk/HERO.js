// import { Item } from '../Item.js'
import { UnitTemplate } from '../UnitTemplate.js'
import { hasIn as hasProp } from 'lodash'
import { Soul } from '../../../souls/Soul.js'
import { Unit } from '../../Unit.js'

class HERO {
  static NAME = 'HERO'
  static filename = 'HERO'

  constructor (unitObj = { soulsArr: [], itemsArr: [] }, gameObj) {
    let soulsArr = hasProp(unitObj, 'soulsArr') ? unitObj.soulsArr : []
    let itemsArr = hasProp(unitObj, 'itemsArr') ? unitObj.itemsArr : []
    // from Stat.js:
    // static template = {
    //   name: '',
    //   start: 0,
    //   counters: 1,
    //   costScale: 1,
    //   benScale: 1,
    //   isResource: false
    // }

    // templ.baseStats.HP.benScale = 10 // 15
    // templ.baseStats.HP.start = 40 // 60
    // templ.baseStats.HP.current = templ.baseStats.HP.value // 60
    // templ.baseStats.MELEE.benScale = 3 // 4
    // templ.baseStats.RANGED.benScale = 3 // 4
    // templ.baseStats.MAGIC.benScale = 3 // 4

    let souls = []
    soulsArr.forEach((soulStr) => souls.push(new Soul.LIB[soulStr]()))

    let statWeights = {
      HP: 1,
      MP: 0,
      INIT: 1,
      MELEE: 1,
      RANGED: 1,
      MAGIC: 1,
      DRED: 1,
      DREF: 1
    }
    let roles = []

    let weights = {}
    weights.KNIGHT = {
      HP: 4,
      MP: 0,
      INIT: 1,
      MELEE: 4,
      RANGED: 0,
      MAGIC: 0,
      DRED: 3,
      DREF: 3
    }
    weights.ARCHER = {
      HP: 3,
      MP: 0,
      INIT: 3,
      MELEE: 0,
      RANGED: 5,
      MAGIC: 0,
      DRED: 1,
      DREF: 1
    }
    weights.MAGE = {
      HP: 2,
      MP: 3,
      INIT: 1,
      MELEE: 0,
      RANGED: 3,
      MAGIC: 5,
      DRED: 1,
      DREF: 1
    }
    weights.BERSERK = {
      HP: 6,
      MP: 0,
      INIT: 3,
      MELEE: 6,
      RANGED: 0,
      MAGIC: 0,
      DRED: 1,
      DREF: 4
    }
    for (let soulIndx in souls) {
      let soul = souls[soulIndx]
      for (let roleIndx in soul.AIRoles) {
        let role = soul.AIRoles[roleIndx]
        roles.push(role)
        for (let propName in statWeights) {
          statWeights[propName] += weights[role][propName]
        }
      }
    }

    let actions = []
    let passives = []
    souls.forEach((soul) => {
      soul.AISkills.forEach((skillName) => actions.push(skillName))
      if (hasProp(soul, 'passives')) {
        soul.passives.forEach((passiveStr) => { passives.push(passiveStr) })
      }
    })

    let unit = new UnitTemplate({
      NAME: souls[0].NAME,
      name: souls[0].name,
      // cost: 8,
      desc: souls[0].desc,
      templ: {
        hero: true,
        baseStats: {
          HP: {
            benScale: 15, // 10,
            start: 60 // 40
          },
          MELEE: {
            benScale: 4 // 3
          },
          RANGED: {
            benScale: 4 // 3
          },
          MAGIC: {
            benScale: 4 // 3
          }
        },
        statWeights: statWeights,
        actions: actions,
        passives: passives,
        roles: roles,
        souls: soulsArr,
        pos: souls[0].AIRow === 'front' ? Unit.POS.FRONT : Unit.POS.BACK,
        items: itemsArr
      }
    }, gameObj)
    return unit
  }
}

var obj = {
  filename: 'HERO',
  exprt: HERO
}
export default obj
