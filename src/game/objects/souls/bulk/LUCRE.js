import { Soul } from '../Soul.js'

// console.log(Soul)
class Lucre {
  static NAME = 'LUCRE'
  static filename = 'LUCRE'

  constructor () {
    return new Soul({
      name: 'Lucre',
      NAME: 'LUCRE',
      desc: `Wasn't able to take it with him.  No matter.`,
      bonus: {
        HP: 10,
        INIT: 1
        // MP: 1
        // DRED: 2,
        // DREF: 2,
      },
      converts: [
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
          from: 'MAGIC',
          to: 'MAGIC',
          value: -0.1
        }
      ],
      skills: ['BREWOIL', 'BREWVENOM'],
      // skills: ['FASTING', 'TAURVEST', 'TAURBLAST', 'HOMINGBOLT'],
      AISkills: ['MOVEFRONT', 'GUARD', 'MELEE'],
      AIRow: 'front',
      AIRoles: ['KNIGHT'],
      passives: [
        {
          name: 'essenceuser',
          NAME: 'ESSENCEUSER',
          params: {}
        }
      ]
    })
  }
}

export default Lucre
