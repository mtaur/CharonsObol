import { TargetRule } from '../TargetRule.js'

class NATLOG {
  static NAME = 'NATLOG'
  static filename = 'NATLOG'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (obj) {
    return new TargetRule({
      caster: obj.caster,
      reqs: ['enemy', 'different'],
      nots: [],
      prefs: [],
      playerTeam: obj.playerTeam,
      prevTargs: obj.prevTargs,
      cpuTeam: obj.cpuTeam
      // Vast majority of skills use these, MUST overwrite as bool if not:
      // live: true,
      // dead: false,
      // field: true,
      // bench: false
    })
  }
}

export default NATLOG
