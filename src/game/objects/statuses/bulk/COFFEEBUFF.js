import { Status } from '../Status.js'

// console.log(Soul)
class COFFEEBUFF {
  static NAME = 'COFFEEBUFF'
  static filename = 'COFFEEBUFF'

  constructor () {
    return new Status({
      NAME: 'COFFEEBUFF',
      name: 'coffeebuff',
      desc: '+2 base INIT for this battle.',
      remove: [
        'ENDBATTLE',
        'BEGINBATTLE'
      ],
      // stacks: 1,
      effects: [
        // { trigger: , effect: }
      ],
      statBonus: { INIT: 2 },
      converts: []
    })
  }
}
var obj = {
  filename: 'COFFEEBUFF',
  exprt: COFFEEBUFF
}
export default obj
// export default Yolomace
