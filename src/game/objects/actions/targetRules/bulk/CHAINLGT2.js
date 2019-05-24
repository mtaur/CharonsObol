import { TargetRule } from '../TargetRule.js'

class CHAINLGT2 {
  static NAME = 'CHAINLGT2'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (obj) {
    return new TargetRule({
      caster: obj.caster,
      reqs: ['enemy', 'different'],
      nots: [],
      prefs: ['back'],
      playerTeam: obj.playerTeam,
      cpuTeam: obj.cpuTeam
      // Vast majority of skills use these, MUST overwrite as bool if not:
      // live: true,
      // dead: false,
      // field: true,
      // bench: false
    })
  }
}

export default CHAINLGT2
