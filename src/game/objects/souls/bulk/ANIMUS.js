import { Soul } from '../Soul.js'

// console.log(Soul)
class Animus {
  static NAME = 'ANIMUS'
  static filename = 'ANIMUS'

  constructor () {
    return new Soul({
      name: 'Animus',
      NAME: 'ANIMUS',
      desc: `Mage archery dude who glows a lot. You know the type.`,
      bonus: {
        MP: 1,
        INIT: 1,
        RANGED: 6,
        MAGIC: 6
        // DRED: 2,
        // DREF: 2,
      },
      converts: [
        {
          from: 'RANGED',
          to: 'MAGIC',
          value: 0.15 // 0.1
        },
        {
          from: 'MAGIC',
          to: 'RANGED',
          value: 0.15 // 0.1
        },
        {
          from: 'MELEE',
          to: 'MELEE',
          value: -0.25 // -0.25
        },
        {
          from: 'HP',
          to: 'HP',
          value: -0.15 // -0.1
        },
        {
          from: 'HP',
          to: 'MP',
          value: 0.025
        }
      ],
      skills: ['MISSILE', 'ARCANESIGHT', 'HOMINGBOLT'],
      // skills: ['FASTING', 'TAURVEST', 'TAURBLAST', 'HOMINGBOLT'],
      AISkills: ['MISSILE', 'ARCANESIGHT', 'MOVEBACK', 'HOMINGBOLT', 'RANGED'],
      AIRow: 'back',
      AIRoles: ['MAGE', 'ARCHER']
    })
  }
}

export default Animus
