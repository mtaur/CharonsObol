import { Action } from '../Action.js'
// import { Stat } from '../../units/Stat.js'

class CHAINLGT {
  static NAME = 'CHAINLGT'
  static filename = 'CHAINLGT'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'CHAINLGT',
      // filename: 'CHAINLGT',
      name: 'Arcing Bolt',
      type: 'major',
      desc: 'Deal 1xMAGIC damage to two targets, hitting one each from the front and back rows if possible.',
      cost: 2,
      targetRules: ['CHAINLGT1', 'CHAINLGT2'],
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 1
          },
          DREDScale: 1,
          DREFScale: 1
        },
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 1
          },
          DREDScale: 1,
          DREFScale: 1
        }
      ]
    })
  }
}

export default CHAINLGT
