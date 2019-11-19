import { Status } from '../Status.js'

// console.log(Soul)
class ARCANESIGHT {
  static NAME = 'ARCANESIGHT'
  static filename = 'ARCANESIGHT'

  constructor () {
    return new Status({
      NAME: 'ARCANESIGHT',
      name: 'arcaneSight',
      desc: '50% base MAGIC added to RANGED and vice-versa until unit deals damage ' +
        'or battle ends.',
      remove: [
        'DAMAGE',
        'ENDBATTLE',
        'BEGINBATTLE'
      ],
      effects: [
        // { trigger: , effect: }
      ],
      bonus: [],
      converts: [
        {
          from: 'MAGIC',
          to: 'RANGED',
          value: 0.5
        },
        {
          from: 'RANGED',
          to: 'MAGIC',
          value: 0.5
        }
      ]
    })
  }
}
var obj = {
  filename: 'ARCANESIGHT',
  exprt: ARCANESIGHT
}
export default obj
// export default Yolomace
