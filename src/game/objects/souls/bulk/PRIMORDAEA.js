import { Soul } from '../Soul.js'

// console.log(Soul)
class Primordaea {
  static NAME = 'PRIMORDAEA'
  static filename = 'PRIMORDAEA'

  constructor () {
    return new Soul({
      name: 'Primordaea',
      NAME: 'PRIMORDAEA',
      desc: `They are something, nothing, many things... idk...`,
      bonus: {
        // HP: 10,
        MP: 1,
        RANGED: 4,
        MELEE: 4,
        MAGIC: 4
        // HP: -18,
        // MP: 3,
        // MP: 2,
        // RANGED: 6,
        // MAGIC: 6
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
        }
      ],
      skills: []
    })
  }
}

export default Primordaea
