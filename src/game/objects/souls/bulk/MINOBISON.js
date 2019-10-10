import { Soul } from '../Soul.js'

// console.log(Soul)
class Minobison {
  static NAME = 'MINOBISON'
  static filename = 'MINOBISON'

  constructor () {
    return new Soul({
      name: 'Minobison',
      NAME: 'MINOBISON',
      desc: `I'm retired. It's the best gig there is.`,
      bonus: {
        HP: 10,
        MP: 1,
        INIT: 2
        // HP: -18,
        // MP: 3,
        // MP: 2,
        // MP: 1,
        // MAGIC: 4,
        // INIT: 1
      },
      converts: [
        {
          from: `INIT`,
          to: 'INIT',
          value: -0.5
        },
        {
          from: 'INIT',
          to: 'MAGIC',
          value: 1
        },
        {
          from: 'INIT',
          to: 'MELEE',
          value: 1
        },
        {
          from: 'INIT',
          to: 'RANGED',
          value: 1
        },
        {
          from: 'HP',
          to: 'HP',
          value: 0.1
        }
      ],
      skills: []
    })
  }
}

export default Minobison
