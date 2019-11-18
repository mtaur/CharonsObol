// import { Item } from '../Item.js'
import { UnitTemplate } from '../UnitTemplate.js'
import { Unit } from '../../Unit.js'

class ARCHER {
  static NAME = 'ARCHER'
  static filename = 'ARCHER'

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
      NAME: 'ARCHER',
      name: 'Archer of Caenenfoeder',
      // cost: 8,
      desc: 'Pew pew pew!',
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
          HP: 3,
          MP: 1,
          INIT: 2,
          MELEE: 0,
          MAGIC: 0,
          RANGED: 8,
          DRED: 2,
          DREF: 0
        },
        actions: ['RANGED', 'GUARD', 'LONGSHOT', 'MOVEBACK'],
        passives: [],
        roles: ['ARCHER'],
        souls: [],
        pos: Unit.POS.BACK,
        items: ['BOW']
      }
    }, gameObj)
  }
}

var obj = {
  filename: 'ARCHER',
  exprt: ARCHER
}
export default obj
