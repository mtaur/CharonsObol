import { Action } from '../Action.js'

class FLAMEFIST {
  static NAME = 'FLAMEFIST'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'FLAMEFIST',
      name: 'Flaming Fist',
      type: 'major',
      desc: 'Deal 1x(MELEE + MAGIC) damage to a target with a melee attack.',
      cost: 2,
      targetRules: ['MELEE'],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 1,
            MELEE: 1
          },
          DREDScale: 2,
          DREFScale: 2
        }
      ]
    })
  }
}

export default FLAMEFIST
