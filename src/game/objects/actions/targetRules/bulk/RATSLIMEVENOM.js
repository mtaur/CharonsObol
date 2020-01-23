import { TargetRule } from '../TargetRule.js'

class RATSLIMEVENOM {
  static NAME = 'RATSLIMEVENOM'
  static filename = 'RATSLIMEVENOM'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (obj) {
    return new TargetRule({
      caster: obj.caster,
      reqs: ['caster'],
      nots: ['ratslimevenom'],
      prefs: [],
      playerTeam: obj.playerTeam,
      // prevTargs: obj.prevTargs,
      cpuTeam: obj.cpuTeam,
      auto: true
      // Vast majority of skills use these, MUST overwrite as bool if not:
      // live: true,
      // dead: false,
      // field: true,
      // bench: false
    })
  }
}

export default RATSLIMEVENOM
