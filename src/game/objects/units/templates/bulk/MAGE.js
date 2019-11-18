// import { Item } from '../Item.js'
import { UnitTemplate } from '../UnitTemplate.js'
import { Unit } from '../../Unit.js'

class MAGE {
  static NAME = 'MAGE'
  static filename = 'MAGE'

  constructor (gameObj) {
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

    return new UnitTemplate({
      NAME: 'MAGE',
      name: 'Mage of Caenenfoeder',
      // cost: 8,
      desc: 'A very magical boi or grrrl',
      templ: {
        baseStats: {
          HP: {
            benScale: 15, // 10,
            start: 60 // 40
          },
          MP: {
            start: 2
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
        statWeights: {
          HP: 1,
          MP: 1, // 3, // 4,
          INIT: 1,
          MELEE: 0,
          MAGIC: 4, // 6,
          RANGED: 2, // 6,
          DRED: 1,
          DREF: 1
        },
        actions: ['RANGED', 'HOMINGBOLT', 'HEAL', 'GUARD', 'CHAINLGT', 'REGEN', 'DRYAD', 'INSPIRE'],
        passives: [],
        roles: ['MAGE'],
        souls: [],
        pos: Unit.POS.BACK,
        items: ['BLUERING']
      }
    }, gameObj)
  }
}

var obj = {
  filename: 'MAGE',
  exprt: MAGE
}
export default obj
