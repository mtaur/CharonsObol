import { Soul } from '../Soul.js'

// console.log(Soul)
class Lifehorn {
  static NAME = 'LIFEHORN'
  static filename = 'LIFEHORN'

  constructor () {
    return new Soul({
      name: 'Lifehorn',
      NAME: 'LIFEHORN',
      desc: `I am the light of friendship!  Wanna watch some anime? :)`,
      bonus: {
        // HP: 10,
        MP: 1,
        MAGIC: 8
        // DRED: 2,
        // DREF: 2,
      },
      converts: [
        {
          from: 'HP',
          to: 'HP',
          value: -0.1
        },
        {
          from: 'MELEE',
          to: 'MAGIC',
          value: 0.1
        },
        {
          from: 'RANGED',
          to: 'MAGIC',
          value: 0.1
        },
        {
          from: 'MP',
          to: 'MAGIC',
          value: 4
        },
        {
          from: 'MAGIC',
          to: 'MP',
          value: 0.025 // -0.35
        }
      ],
      skills: ['RAINBOW', 'SPARKLE', 'HOMINGBOLT', 'YOLOSTRIKE'],
      // skills: ['FASTING', 'TAURVEST', 'TAURBLAST', 'HOMINGBOLT'],
      AISkills: ['RAINBOW', 'SPARKLE', 'GUARD', 'HOMINGBOLT'],
      AIRow: 'front',
      AIRoles: ['MAGE', 'KNIGHT'],
      passives: [
        {
          name: 'friendship',
          NAME: 'FRIENDSHIP',
          params: {}
        }
      ]
    })
  }
}

export default Lifehorn
