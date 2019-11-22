import { Soul } from '../Soul.js'

// console.log(Soul)
class Ahnwei {
  static NAME = 'AHNWEI'
  static filename = 'AHNWEI'

  constructor () {
    return new Soul({
      name: 'Ahn Wei',
      NAME: 'AHNWEI',
      desc: `Whatever...`,
      bonus: {
        // HP: -18,
        // MP: 3,
        // MP: 2,
        MP: 1,
        MAGIC: 4,
        INIT: 1
      },
      converts: [
        {
          from: 'MP',
          to: 'MP',
          value: -0.25 // -0.3 // -0.5
        },
        {
          from: 'INIT',
          to: 'MAGIC',
          value: 3 // 4
        },
        {
          from: 'INIT',
          to: 'INIT',
          value: -0.25 // -0.3 // -0.5
        },
        {
          from: 'MAGIC',
          to: 'INIT',
          value: 0.15 // 0.1 // 0.05
        },
        {
          from: 'MAGIC',
          to: 'MAGIC',
          value: -0.25 // -0.3 // -0.5
        }
      ],
      skills: ['NIRVANA', 'DISILLUSION', 'HOMINGBOLT'],
      AISkills: ['RANGED', 'NIRVANA', 'DISILLUSION', 'MOVEBACK', 'GUARD', 'HOMINGBOLT'],
      AIRow: 'back',
      AIRoles: ['MAGE']
    })
  }
}

export default Ahnwei
