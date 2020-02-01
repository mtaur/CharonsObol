// import { Item } from '../Item.js'
import { UnitTemplate } from '../UnitTemplate.js'
import { Unit } from '../../Unit.js'

class EMPRESS {
  static NAME = 'EMPRESS'
  static filename = 'EMPRESS'

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
      name: 'Ratslime Empress',
      // cost: 8,
      desc: 'The empress of the ratslimes.  Skills:  Spawning, festering, blighting.',
      templ: {
        baseStats: {
          HP: {
            benScale: 0, // 15, // 10,
            start: 400 // 40
          },
          MP: {
            benScale: 0,
            start: 7
          },
          MELEE: {
            benScale: 0, // 3
            start: 25
          },
          RANGED: {
            benScale: 0, // 3
            start: 25
          },
          MAGIC: {
            benScale: 0, // 3
            start: 25
          },
          INIT: {
            benScale: 0,
            start: 4
          },
          DRED: {
            benScale: 0,
            start: 5
          },
          DREF: {
            benScale: 0,
            start: 5
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
        // actions: ['MELEE', 'GUARD', 'CONTAGION'],
        actions: ['SPAWNRATSLIME', 'BLIGHTMISSILE', 'MOVEBACK', 'RECONSTITUTE'],
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
          }, // 'DAMAGETOPOISONINHALF'
          {
            name: 'manaregen1',
            NAME: 'MANAREGEN1',
            params: {}
          } // 'DAMAGETOPOISONINHALF'
        ],
        roles: ['MAGE', 'ARCHER'],
        souls: [],
        pos: Unit.POS.BACK,
        items: []
      }
    }, gameObj)
  }
}

var obj = {
  filename: 'EMPRESS',
  exprt: EMPRESS
}
export default obj
