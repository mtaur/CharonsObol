import { Action } from '../Action.js'

class MISSILE {
  static NAME = 'MISSILE'
  static filename = 'MISSILE'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'MISSILE',
      // filename: 'LUNGE',
      name: 'Missile',
      type: 'both', // major
      desc: 'Fire a RANGED attack that deals damage equal to the SUM of MAGIC ' +
        'and RANGED. DRED and DREF scaling are both 2.',
      targetRules: ['RANGED'],
      cost: 1,
      // prereqs: [],
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 1,
            RANGED: 1
          },
          DREDScale: 2,
          DREFScale: 2
        }
      ]
    })
  }
}

export default MISSILE
