import { Soul } from '../Soul.js'

// console.log(Soul)
class YOLT {
  static NAME = 'YOLT'
  static filename = 'YOLT'

  constructor () {
    return new Soul({
      name: 'YOLT the Metanecromancer',
      NAME: 'YOLT',
      desc: `Meta-raiser of the un-undead.`,
      bonus: {
        HP: -12,
        // MP: 3,
        MP: 1, // ,
        // MELEE: 4,
        INIT: 2
      },
      converts: [
        {
          from: 'HP',
          to: 'HP',
          value: -0.25 // -0.3 // -0.5
        },
        {
          from: 'MP',
          to: 'MP',
          value: 0.25 // -0.3 // -0.5
        },
        {
          from: 'MP',
          to: 'HEALTH',
          value: 4
        },
        {
          from: 'MAGIC',
          to: 'MP',
          value: 0.05
        },
        {
          from: 'MAGIC',
          to: 'MAGIC',
          value: -0.15
        },
        {
          from: 'MP',
          to: 'DRED',
          value: 2
        },
        {
          from: 'MP',
          to: 'DREF',
          value: 1
        }
      ],
      skills: ['RAISE', 'HOMINGBOLT'],
      AISkills: ['RAISE', 'HOMINGBOLT', 'MOVEBACK'],
      AIRow: 'back',
      AIRoles: ['MAGE'],
      passives: []
    })
  }
}

export default YOLT
