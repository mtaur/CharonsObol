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
      type: 'major',
      desc: 'Fire a magic bolt that deals damage equal to the lesser of MAGIC ' +
        'and RANGED. HALF the usual amount of DRED and DREF apply.',
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
            min: {
              MAGIC: 1,
              RANGED: 1
            }
          },
          DREDScale: 0.5,
          DREFScale: 0.5
        }
      ]
    })
  }
}

export default HOMINGBOLT
