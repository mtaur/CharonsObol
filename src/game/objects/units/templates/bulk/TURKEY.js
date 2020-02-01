// import { Item } from '../Item.js'
import { UnitTemplate } from '../UnitTemplate.js'
import { Unit } from '../../Unit.js'

class TURKEY {
  static NAME = 'TURKEY'
  static filename = 'TURKEY'

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
      NAME: 'TURKEY',
      name: 'Chaos Turkey',
      // cost: 8,
      desc: 'This bird has a death wish.',
      templ: {
        baseStats: {
          HP: {
            benScale: 0, // 15, // 10,
            start: 120 // 40
          },
          MP: {
            benScale: 0,
            start: 2
          },
          MELEE: {
            benScale: 0, // 3
            start: 30
          },
          RANGED: {
            benScale: 0, // 3
            start: 15
          },
          MAGIC: {
            benScale: 0, // 3
            start: 15
          },
          INIT: {
            benScale: 0,
            start: 8
          },
          DRED: {
            benScale: 0,
            start: 0
          },
          DREF: {
            benScale: 0,
            start: 8
          }
        },
        statWeights: {
          HP: 4, // 6,
          MP: 0,
          INIT: 1,
          MELEE: 3, // 5,
          MAGIC: 0,
          RANGED: 0,
          DRED: 2, // 3,
          DREF: 2 // 3
        },
        actions: ['PECK', 'SCRATCH', 'WARBLE'],
        passives: [
          {
            name: 'manaregen1',
            NAME: 'MANAREGEN1',
            params: {}
          }
        ],
        roles: ['KNIGHT'],
        souls: [],
        pos: Unit.POS.FRONT,
        items: []
      }
    }, gameObj)
  }
}

var obj = {
  filename: 'TURKEY',
  exprt: TURKEY
}
export default obj
