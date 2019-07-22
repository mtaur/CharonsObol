import { Status } from '../Status.js'

// console.log(Soul)
class STORMCLOUDBUFF {
  static NAME = 'STORMCLOUDBUFF'
  static filename = 'STORMCLOUDBUFF'

  constructor () {
    return new Status({
      NAME: 'STORMCLOUDBUFF',
      name: 'stormcloudbuff',
      desc: 'Add one stack of Stormcloud. Gain 10% base MAGIC and increase ' +
        'number of bolts cast, with diminishing power per bolt.',
      remove: [
        'ENDBATTLE',
        'BEGINBATTLE'
      ],
      // stacks: 1,
      effects: [
        // { trigger: , effect: }
      ],
      bonus: [],
      converts: [
        {
          from: 'MAGIC',
          to: 'MAGIC',
          value: 0.1
        }
      ]
    })
  }
}
var obj = {
  filename: 'STORMCLOUDBUFF',
  exprt: STORMCLOUDBUFF
}
export default obj
// export default Yolomace
