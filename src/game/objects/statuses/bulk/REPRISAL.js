import { Status } from '../Status.js'

// console.log(Soul)
class REPRISAL {
  static NAME = 'REPRISAL'
  static filename = 'REPRISAL'

  constructor () {
    return new Status({
      NAME: 'REPRISAL',
      name: 'reprisal',
      desc: 'DREF stat increased temporarily by 1x (DRED + DREF) + 0.2x (MELEE + ' +
        'RANGED + MAGIC).  Buff lasts until GUARD is used.',
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
          value: 1
        },
        {
          from: 'DREF',
          to: 'DREF',
          value: 1
        },
        {
          from: 'MELEE',
          to: 'DREF',
          value: 0.2
        },
        {
          from: 'MAGIC',
          to: 'DREF',
          value: 0.2
        },
        {
          from: 'RANGED',
          to: 'DREF',
          value: 0.2
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
