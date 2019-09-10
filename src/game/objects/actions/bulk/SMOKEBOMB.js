import { Action } from '../Action.js'

class SMOKEBOMB {
  static NAME = 'SMOKEBOMB'
  static filename = 'SMOKEBOMB'
  static isConsumable = true

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'SMOKEBOMB',
      name: 'Smoke Bomb',
      type: 'both',
      desc: `Perform a ranged attack against one enemy, bypassing DREF and dealing damage ` +
        `equal to the LARGEST of: MELEE, RANGED, MAGIC, 5x INIT. Then the ` +
        `caster or an ally escapes the battle. Delay enemy turn by 100% of a ` +
        `turn gauge.`,
      isConsumable: true,
      SPCost: 4,
      targetRules: ['RANGED', 'SAME', 'ALLY'],
      // prereqs: ['FRONT'], // TargetRules.LIB.BACK ...
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      // after: [{
      //   NAME: 'CASTERBACK'
      // }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            max: {
              MELEE: 1,
              RANGED: 1,
              MAGIC: 1,
              INIT: 5
            }
          },
          DREDScale: 1,
          DREFScale: 0
        },
        {
          NAME: 'DAZE',
          name: 'daze',
          delayFrac: 1
        },
        {
          NAME: 'RUN',
          name: 'run'
        } // ,
        // {
        //   NAME: 'ROWBACK',
        //   name: 'rowback'
        // }
      ]
    })
  }
}

export default SMOKEBOMB
