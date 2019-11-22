import { Status } from '../Status.js'

// console.log(Soul)
class FERAL {
  static NAME = 'FERAL'
  static filename = 'FERAL'

  constructor () {
    return new Status({
      NAME: 'FERAL',
      name: 'feral',
      desc: 'Increased MELEE and DREF stats, at the cost of MAGIC and RANGED.' +
        'Also increase base HP multiplier by 0.15.',
      remove: [
        'DRYAD',
        'BASEFORM'
      ],
      effects: [
        // { trigger: , effect: }
      ],
      bonus: [],
      converts: [
        {
          from: 'HP',
          to: 'HP',
          value: 0.15
        },
        {
          from: 'MAGIC',
          to: 'MELEE',
          value: 0.3 // 0.2
        },
        {
          from: 'MAGIC',
          to: 'DREF',
          value: 0.1 // 0.05
        },
        {
          from: 'MAGIC',
          to: 'MAGIC',
          value: -0.3 // -0.4
        },
        {
          from: 'RANGED',
          to: 'DREF',
          value: 0.1 // 0.05
        },
        {
          from: 'RANGED',
          to: 'MELEE',
          value: 0.3 // 0.2
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          value: -0.3 // -0.4
        }
      ]
    })
  }
}
var obj = {
  filename: 'FERAL',
  exprt: FERAL
}
export default obj
// export default Yolomace
