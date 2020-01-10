import { Status } from '../Status.js'

// console.log(Soul)
class REPRISAL {
  static NAME = 'REPRISAL'
  static filename = 'REPRISAL'

  constructor () {
    return new Status({
      NAME: 'REPRISAL',
      name: 'reprisal',
      desc: 'DREF stat scaling increased temporarily by 0.5x (DRED + DREF) + 0.1x (MELEE + ' +
        'RANGED + MAGIC).  Buff lasts until GUARD is consumed.',
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
          to: 'DREF',
          value: 0.5
        },
        {
          from: 'DREF',
          to: 'DREF',
          value: 0.5
        },
        {
          from: 'MELEE',
          to: 'DREF',
          value: 0.1
        },
        {
          from: 'MAGIC',
          to: 'DREF',
          value: 0.1
        },
        {
          from: 'RANGED',
          to: 'DREF',
          value: 0.1
        }
      ]
    })
  }
}
var obj = {
  filename: 'REPRISAL',
  exprt: REPRISAL
}
export default obj
// export default Yolomace
