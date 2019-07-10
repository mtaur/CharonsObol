import { Action } from '../Action.js'

class HARRY {
  static NAME = 'HARRY'
  static filename = 'HARRY'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'HARRY',
      // filename: 'LUNGE',
      name: 'Harry',
      type: 'minor',
      desc: `Wizard or not, you can use a minor action point to perform a lesser ranged attack from the front row, 1/4 as much as the lesser of RANGED and MELEE.`,
      targetRules: ['RANGED'],
      prereqs: ['FRONT'], // TargetRules.LIB.BACK ...
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      // after: [{
      //   NAME: 'ROWSWAP'
      // }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            min: {
              MELEE: 0.25,
              RANGED: 0.25
            }
          },
          DREDScale: 0.25,
          DREFScale: 0.25
        }
      ]
    })
  }
}

export default HARRY
