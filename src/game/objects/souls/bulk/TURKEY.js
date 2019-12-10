import { Soul } from '../Soul.js'

// console.log(Soul)
class ChaosTurkey {
  static NAME = 'TURKEY'
  static filename = 'TURKEY'

  constructor () {
    return new Soul({
      name: 'Chaos Turkey',
      NAME: 'TURKEY',
      desc: `Gobbler of SOULS.`,
      bonus: {
        // HP: -8,
        // MP: 3,
        MP: 1,
        MELEE: 4,
        INIT: 2
      },
      converts: [
        {
          from: 'HP',
          to: 'HP',
          value: -0.2 // -0.3 // -0.5
        },
        {
          from: 'MP',
          to: 'MP',
          value: -0.5 // -0.3 // -0.5
        },
        {
          from: 'HP',
          to: 'MELEE',
          value: 0.1 // 4
        },
        {
          from: 'INIT',
          to: 'MELEE',
          value: 3 // 4
        },
        {
          from: 'DRED',
          to: 'DRED',
          value: -0.35 // -0.3 // -0.5
        },
        {
          from: 'DRED',
          to: 'DREF',
          value: 0.35 // 0.1 // 0.05
        }
      ],
      skills: ['WARBLE', 'SCRATCH', 'PECK'],
      AISkills: ['WARBLE', 'SCRATCH', 'PECK'],
      AIRow: 'front',
      AIRoles: ['BERSERK'],
      passives: []
    })
  }
}

export default ChaosTurkey
