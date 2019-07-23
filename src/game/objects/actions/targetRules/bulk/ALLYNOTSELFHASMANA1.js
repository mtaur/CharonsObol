import { TargetRule } from '../TargetRule.js'

class ALLYNOTSELFHASMANA1 {
  static NAME = 'ALLYNOTSELFHASMANA1'
  static filename = 'ALLYNOTSELFHASMANA1'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (obj) {
    return new TargetRule({
      caster: obj.caster,
      reqs: ['ally', 'hasMana1'],
      nots: ['caster'],
      prefs: [],
      playerTeam: obj.playerTeam,
      // prevTargs: obj.prevTargs,
      cpuTeam: obj.cpuTeam
      // Vast majority of skills use these, MUST overwrite as bool if not:
      // live: true,
      // dead: false,
      // field: true,
      // bench: false
    })
  }
}

export default ALLYNOTSELFHASMANA1
