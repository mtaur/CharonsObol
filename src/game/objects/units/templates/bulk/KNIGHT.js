// import { Item } from '../Item.js'
import { UnitTemplate } from '../UnitTemplate.js'
import { Unit } from '../../Unit.js'

class KNIGHT {
  static NAME = 'KNIGHT'
  static filename = 'KNIGHT'

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
      NAME: 'KNIGHT',
      name: 'Knight of Caenenfoeder',
      // cost: 8,
      desc: 'Take those hits!',
      templ: {
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
        statWeights: {
          HP: 4, // 6,
          MP: 0,
          INIT: 1,
          MELEE: 3, // 5,
          RANGED: 0,
          DRED: 2, // 3,
          DREF: 2 // 3
        },
        actions: ['MELEE', 'GUARD', 'MOVEFRONT', 'YOLOSTRIKE'],
        passives: [],
        roles: ['KNIGHT'],
        souls: [],
        pos: Unit.POS.FRONT,
        items: []
      }
    }, gameObj)
  }
}

var obj = {
  filename: 'KNIGHT',
  exprt: KNIGHT
}
export default obj
