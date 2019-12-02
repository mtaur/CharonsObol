import { Soul } from '../Soul.js'

// console.log(Soul)
class Brocantrip {
  static NAME = 'BROCANTRIP'
  static filename = 'BROCANTRIP'

  constructor () {
    return new Soul({
      name: 'Brother Cantrip',
      NAME: 'BROCANTRIP',
      desc: `He lost a bet with Pascal, and now he's here.`,
      bonus: {
        MP: 1,
        MAGIC: 6,
        DRED: 2,
        INIT: 1
      },
      converts: [
        {
          from: 'MAGIC',
          to: 'DRED',
          value: 0.1
        },
        {
          from: 'MAGIC',
          to: 'DREF',
          value: 0.1
        },
        {
          from: 'DREF',
          to: 'DREF',
          value: -0.3 // -0.5
        },
        {
          from: 'DRED',
          to: 'DRED',
          value: -0.3 // -0.5
        }
      ],
      skills: ['HEAL', 'INSPIRE', 'YOLOSTRIKE', 'HOMINGBOLT'],
      AISkills: ['HEAL', 'INSPIRE', 'MELEE', 'GUARD', 'YOLOSTRIKE', 'HOMINGBOLT'],
      AIRow: 'front',
      AIRoles: ['MAGE', 'KNIGHT'],
      passives: []
    })
  }
}

export default Brocantrip
