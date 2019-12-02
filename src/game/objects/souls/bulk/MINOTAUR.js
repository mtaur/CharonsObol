import { Soul } from '../Soul.js'

// console.log(Soul)
class Minotaur {
  static NAME = 'MINOTAUR'
  static filename = 'MINOTAUR'

  constructor () {
    return new Soul({
      name: 'Minotaur',
      NAME: 'MINOTAUR',
      desc: `Um. I'm pretty sure he wasn't slain by Theseus. That wouldn't ` +
        `make sense at all. Grrr.`,
      bonus: {
        HP: 20,
        // DRED: 2,
        // DREF: 2,
        MELEE: 8
      },
      converts: [
        {
          from: 'MELEE',
          to: 'MELEE',
          value: 0.2 // 0.15
        },
        {
          from: 'MELEE',
          to: 'DREF',
          value: 0.15
        },
        {
          from: 'HP',
          to: 'HP',
          value: 0.1
        },
        {
          from: 'DRED',
          to: 'DREF',
          value: 0.25
        },
        {
          from: 'DRED',
          to: 'DRED',
          value: -0.25
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          value: -0.2
        },
        {
          from: 'MAGIC',
          to: 'MAGIC',
          value: -0.25
        }
      ],
      skills: ['BERSERK', 'AXETHROW', 'YOLOSTRIKE'],
      AISkills: ['BERSERK', 'AXETHROW', 'MELEE', 'GUARD', 'YOLOSTRIKE'],
      AIRow: 'front',
      AIRoles: ['KNIGHT', 'BERSERK'],
      passives: []
    })
  }
}

export default Minotaur
