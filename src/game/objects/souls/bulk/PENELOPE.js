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
        RANGED: 6,
        MAGIC: 6
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

export default Penelope
