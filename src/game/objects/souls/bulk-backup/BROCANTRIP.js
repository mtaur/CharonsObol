import { Soul } from '../soul.js'

// console.log(Soul)
class Brocantrip {
  constructor () {
    return new Soul({
      name: 'Brother Cantrip',
      NAME: 'BROCANTRIP',
      desc: `He lost a bet with Pascal, and now he's here.`,
      bonus: {
        MP: 1,
        MAGIC: 6,
        DR: 2,
        INIT: 1
      },
      skills: []
    })
  }
}

export default Brocantrip
