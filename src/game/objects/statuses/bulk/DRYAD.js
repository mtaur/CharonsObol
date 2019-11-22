import { Status } from '../Status.js'

// console.log(Soul)
class DRYAD {
  static NAME = 'DRYAD'
  static filename = 'FERAL'

  constructor () {
    return new Status({
      NAME: 'DRYAD',
      name: 'dryad',
      desc: 'Increased MAGIC stat, at the cost of MELEE and DRED.',
      remove: [
        'FERAL',
        'BASEFORM'
      ],
      effects: [
        // { trigger: , effect: }
      ],
      bonus: [],
      converts: [
        {
          from: 'MELEE',
          to: 'MAGIC',
          value: 0.3 // 0.25
        },
        {
          from: 'MELEE',
          to: 'MELEE',
          value: -0.3 // -0.25
        },
        {
          from: 'DRED',
          to: 'MAGIC',
          value: 1.5 // 1
        },
        {
          from: 'DRED',
          to: 'DRED',
          value: -0.3 // -0.25
        }
      ]
    })
  }
}
var obj = {
  filename: 'DRYAD',
  exprt: DRYAD
}
export default obj
// export default Yolomace
