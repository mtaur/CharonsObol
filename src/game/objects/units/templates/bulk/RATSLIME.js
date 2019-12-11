// import { Item } from '../Item.js'
import { UnitTemplate } from '../UnitTemplate.js'
import { Unit } from '../../Unit.js'

class RATSLIME {
  static NAME = 'RATSLIME'
  static filename = 'RATSLIME'

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
      NAME: 'RATSLIME',
      name: 'Slime Rat',
      // cost: 8,
      desc: 'Ratteus Slimeston III, Esq.',
      templ: {
        baseStats: {
          HP: {
            benScale: 0, // 15, // 10,
            start: 80 // 40
          },
          MP: {
            benScale: 0,
            start: 0
          },
          MELEE: {
            benScale: 0, // 3
            start: 21
          },
          RANGED: {
            benScale: 0, // 3
            start: 0
          },
          MAGIC: {
            benScale: 0, // 3
            start: 0
          },
          INIT: {
            benScale: 0,
            start: 2
          },
          DRED: {
            benScale: 0,
            start: 3
          },
          DREF: {
            benScale: 0,
            start: 3
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
        actions: ['MELEE', 'GUARD', 'CONTAGION'],
        passives: [
          {
            name: 'damagetopoisoninhalf',
            NAME: 'DAMAGETOPOISONINHALF',
            params: {}
          }, // 'DAMAGETOPOISONOUTHALF',
          {
            name: 'damagetopoisonouthalf',
            NAME: 'DAMAGETOPOISONOUTHALF',
            params: {}
          } // 'DAMAGETOPOISONINHALF'
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
  filename: 'RATSLIME',
  exprt: RATSLIME
}
export default obj
