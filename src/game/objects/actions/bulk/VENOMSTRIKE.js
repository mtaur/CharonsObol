import { Action } from '../Action.js'

class VENOMSTRIKE {
  static NAME = 'VENOMSTRIKE'
  static filename = 'VENOMSTRIKE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'VENOMSTRIKE',
      // filename: 'MELEE',
      name: 'Venom Strike',
      type: 'both',
      desc: 'Melee attack which deals 1xMELEE damage and applies 5xINIT poison. Caster also swaps rows.',
      targetRules: ['MELEE', 'SAME'],
      prereqs: ['OTHERROWNOTFULL'],
      after: [{
        NAME: 'CASTERROWSWAP'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 1
          },
          DREDScale: 1,
          DREFScale: 1
        },
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            INIT: -5
          }
        }
      ]
    })
  }
}

export default VENOMSTRIKE
