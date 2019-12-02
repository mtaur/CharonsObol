import { Soul } from '../Soul.js'

// console.log(Soul)
class Gerald {
  static NAME = 'GERALD'
  static filename = 'GERALD'

  constructor () {
    return new Soul({
      name: 'Gerald Atricus',
      NAME: 'GERALD',
      desc: `Don't call him Gerry...`,
      bonus: {
        // HP: -18,
        // MP: 3,
        // MP: 2,
        MAGIC: 4,
        INIT: 1,
        MELEE: 4
      },
      converts: [
        {
          from: 'INIT',
          to: 'MP',
          value: 0.35 // 0.25
        },
        {
          from: 'INIT',
          to: 'INIT',
          value: -0.35 // -0.3 // -0.5
        },
        {
          from: 'MELEE',
          to: 'MAGIC',
          value: 0.25 // 0.2
        },
        {
          from: 'MELEE',
          to: 'MELEE',
          value: -0.25
        },
        {
          from: 'INIT',
          to: 'MAGIC',
          value: 3 // 2
        },
        {
          from: 'HP',
          to: 'HP',
          value: -0.2 // -0.25
        },
        {
          from: 'HP',
          to: 'MP',
          value: 0.025
        }
      ],
      skills: ['STORMCLOUD', 'GUILTTRIP', 'HOMINGBOLT'],
      AISkills: ['STORMCLOUD', 'GUILTTRIP', 'MOVEBACK', 'GUARD', 'HOMINGBOLT'],
      AIRow: 'back',
      AIRoles: ['MAGE'],
      passives: []
    })
  }
}

export default Gerald
