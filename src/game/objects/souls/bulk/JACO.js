import { Soul } from '../Soul.js'

// console.log(Soul)
class Jaco {
  static NAME = 'JACO'
  static filename = 'JACO'

  constructor () {
    return new Soul({
      name: 'Vampire Jaco Pastorius',
      NAME: 'JACO',
      desc: `Played so many killer vamps that he became one.`,
      bonus: {
        HP: 10,
        MELEE: 6,
        MAGIC: 6
      },
      converts: [
        {
          from: 'HP',
          to: 'HP',
          value: -0.2
        },
        {
          from: 'DRED',
          to: 'DRED',
          value: -0.3 // -0.5
        },
        {
          from: 'MAGIC',
          to: 'MELEE',
          value: 0.25 // 0.2
        },
        {
          from: 'MELEE',
          to: 'MAGIC',
          value: 0.25 // 0.2
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          value: -0.25 // -0.2
        },
        {
          from: 'INIT',
          to: 'INIT',
          value: 0.35 // 0.5
        }
      ],
      skills: ['FRENZY', 'RESPITE', 'HOMINGBOLT', 'YOLOSTRIKE'],
      AISkills: ['FRENZY', 'RESPITE', 'MELEE', 'GUARD', 'HOMINGBOLT', 'YOLOSTRIKE'],
      AIRow: 'back',
      AIRoles: ['MAGE', 'KNIGHT', 'BERSERK'],
      passives: [
        {
          name: 'lifesteal',
          NAME: 'LIFESTEAL',
          params: {}
        }
      ]
    })
  }
}

export default Jaco
