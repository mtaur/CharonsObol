import { Status } from '../Status.js'

// console.log(Soul)
class CRANK {
  static NAME = 'CRANK'
  static filename = 'CRANK'

  constructor () {
    return new Status({
      NAME: 'CRANK',
      name: 'Arbalest Ready!',
      desc: 'TOTAL RANGED stat increased by 75% until damage is dealt or received.',
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
        // {
        //   from: 'MAGIC',
        //   to: 'RANGED',
        //   value: 0.5
        // },
        // {
        //   from: 'RANGED',
        //   to: 'MAGIC',
        //   value: 0.5
        // }
      ],
      replacements: [
        {
          statName: 'RANGED',
          value: function (unit) {
            // console.log(1.3 * unit.convertedStatValues.RANGED, 'ARBALEST!!!')
            return 1.75 * unit.convertedStatValues.RANGED
          }
        }
      ]
    })
  }
}
var obj = {
  filename: 'CRANK',
  exprt: CRANK
}
export default obj
// export default Yolomace
