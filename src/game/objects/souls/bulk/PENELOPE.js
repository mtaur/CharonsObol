import { Soul } from '../Soul.js'

// console.log(Soul)
class Penelope {
  static NAME = 'PENELOPE'
  static filename = 'PENELOPE'

  constructor () {
    return new Soul({
      name: 'Penelope the Pantsorcerer',
      NAME: 'PENELOPE',
      desc: `When a man wearing pants does sorcery, it's called sorcery.  ` +
      `When a woman wearing pants does sorcery, it's called pantsorcery.  ` +
      `It used to be taboo for women wearing pants to do ` +
      `sorcery, but now it's kind of accepted but not really...`,
      bonus: {
        // HP: -18,
        // MP: 3,
        // MP: 2,
        MELEE: 5,
        RANGED: 5,
        MAGIC: 5
      },
      converts: [
        {
          from: 'HP',
          to: 'MP',
          value: 0.02
        },
        {
          from: 'HP',
          to: 'HP',
          value: -0.2
        },
        {
          from: 'MELEE',
          to: 'MAGIC',
          value: 0.2 // 0.1
        },
        {
          from: 'RANGED',
          to: 'MAGIC',
          value: 0.2 // 0.1
        },
        {
          from: 'MAGIC',
          to: 'MAGIC',
          value: 0.1
        }
      ],
      skills: ['HOMINGBOLT', 'CHAINLGT', 'FLAMEFIST'],
      AISkills: ['HOMINGBOLT', 'CHAINLGT', 'FLAMEFIST', 'GUARD', 'HOMINGBOLT', 'MOVEBACK'],
      AIRow: 'back',
      AIRoles: ['MAGE'],
      passives: [
        {
          name: 'manabarrier',
          NAME: 'MANABARRIER',
          params: {}
        }
      ]
    })
  }
}

export default Penelope
