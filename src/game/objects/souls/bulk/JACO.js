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
          value: -0.5
        },
        {
          from: 'MAGIC',
          to: 'MELEE',
          value: 0.25
        },
        {
          from: 'MELEE',
          to: 'MAGIC',
          value: 0.25
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          value: -0.25
        },
        {
          from: 'INIT',
          to: 'INIT',
          value: 0.5
        }
      ],
      skills: []
    })
  }
}

export default Jaco
