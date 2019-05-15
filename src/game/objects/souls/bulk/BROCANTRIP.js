import { Soul } from '../Soul.js'

// console.log(Soul)
class Brocantrip {
  static NAME = 'BROCANTRIP'

  constructor () {
    return new Soul({
      name: 'Brother Cantrip',
      NAME: 'BROCANTRIP',
      desc: `He lost a bet with Pascal, and now he's here.`,
      bonus: {
        MP: 1,
        MAGIC: 6,
        DRED: 2,
        INIT: 1
      },
      skills: []
    })
  }
}

export default Brocantrip
