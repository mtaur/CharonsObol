import { Action } from '../Action.js'

class HOMINGBOLT {
  static NAME = 'HOMINGBOLT'
  static filename = 'HOMINGBOLT'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'HOMINGBOLT',
      // filename: 'LUNGE',
      name: 'Homing Bolt',
      type: 'both', // major
      desc: 'Fire a magic bolt that deals damage equal to the AVERAGE of MAGIC ' +
        'and RANGED damage to any enemy (not restricted by GUARD). HALF the ' +
        'usual amount of DRED and DREF apply.',
      targetRules: ['HOMING'],
      // prereqs: [],
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 0.5,
            RANGED: 0.5
          },
          DREDScale: 0.5,
          DREFScale: 0.5
        }
      ]
    })
  }
}

export default HOMINGBOLT
