import { Soul } from '../soul.js'

// console.log(Soul)
class Penelope {
  constructor () {
    return new Soul({
      name: 'Penelope the Pantsorcerer',
      NAME: 'PENELOPE',
      desc: `When a man wearing pants does sorcery, it's called sorcery.  ` +
      `When a woman wearing pants does sorcery, it's called pantsorcery.  ` +
      `It used to be taboo for women wearing pants to do ` +
      `sorcery, but now it's kind of accepted but not really...`,
      bonus: {
        HP: -18,
        MP: 3,
        RANGED: 6,
        MAGIC: 6
      },
      skills: []
    })
  }
}

export default Penelope
