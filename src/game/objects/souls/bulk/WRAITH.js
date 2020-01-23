import { Soul } from '../Soul.js'

// console.log(Soul)
class Wraith {
  static NAME = 'WRAITH'
  static filename = 'WRAITH'

  constructor () {
    return new Soul({
      name: 'Wraith',
      NAME: 'WRAITH',
      desc: `Once a famous naturalist, now known as Wraithy McWraithface.`,
      bonus: {
        MAGIC: 6
        // HP: 10,
        // MP: 1
        // DRED: 2,
        // DREF: 2,
      },
      converts: [
        {
          from: 'HP',
          to: 'HP',
          value: -0.15
        },
        {
          from: 'MAGIC',
          to: 'MAGIC',
          value: 0.1
        },
        {
          from: 'MELEE',
          to: 'MELEE',
          value: -0.1
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          value: -0.1
        },
        {
          from: 'MP',
          to: 'HP',
          value: 10
        }
      ],
      skills: ['HOMINGBOLT', 'ESSENCEBLAST', 'DISSIPATE'],
      // skills: ['FASTING', 'TAURVEST', 'TAURBLAST', 'HOMINGBOLT'],
      AISkills: ['GUARD', 'HOMINGBOLT', 'MOVEFRONT'],
      AIRow: 'front',
      AIRoles: ['MAGE', 'KNIGHT'],
      passives: [
        {
          name: 'essenceuser',
          NAME: 'ESSENCEUSER',
          params: {}
        },
        {
          name: 'essenceshield',
          NAME: 'ESSENCESHIELD',
          params: {}
        }
      ]
    })
  }
}

export default Wraith
