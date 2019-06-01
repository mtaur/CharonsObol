import { Action } from '../Action.js'

class LUNGE {
  static NAME = 'LUNGE'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'LUNGE',
      name: 'Lunge',
      type: 'both',
      desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.',
      targetRules: ['MELEE'],
      prereqs: ['BACK'], // TargetRules.LIB.BACK ...
      after: [{
        NAME: 'ROWFRONT'
      }],
      // after: [{
      //   NAME: 'ROWSWAP'
      // }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            min: {
              MELEE: 2,
              RANGED: 2
            }
          },
          DREDScale: 2,
          DREFScale: 2
        }
      ]
    })
  }
}

export default LUNGE
