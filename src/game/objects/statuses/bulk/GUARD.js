import { Status } from '../Status.js'

// console.log(Soul)
class GUARD {
  static NAME = 'GUARD'
  static filename = 'GUARD'

  constructor () {
    return new Status({
      NAME: 'GUARD',
      name: 'guard',
      desc: 'Increased DRED stat.  Interrupts targeting of melee or ranged skills.',
      remove: [
        'TAKEDAMAGE',
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
          from: 'DRED',
          to: 'DRED',
          value: 1
        }
      ]
    })
  }
}
var obj = {
  filename: 'GUARD',
  exprt: GUARD
}
export default obj
// export default Yolomace
