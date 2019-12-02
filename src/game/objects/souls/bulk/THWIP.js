import { Soul } from '../Soul.js'

// console.log(Soul)
class Thwip {
  static NAME = 'THWIP'
  static filename = 'THWIP'

  constructor () {
    return new Soul({
      name: 'Thwip',
      NAME: 'THWIP',
      desc: `When you let your bow do the talking, this is the sort of name you ` +
        `end up with.`,
      bonus: {
        INIT: 2,
        RANGED: 8
      },
      converts: [
        {
          from: 'HP',
          to: 'HP',
          value: -0.2 // -0.25
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          value: 0.2 // 0.15
        },
        {
          from: 'INIT',
          to: 'DRED',
          value: 1 // 0.5
        }
      ],
      skills: ['ALERT', 'SNIPE', 'LONGSHOT'],
      AISkills: ['ALERT', 'SNIPE', 'RANGED', 'MOVEBACK', 'LONGSHOT'],
      AIRow: 'front',
      AIRoles: ['ARCHER'],
      passives: []
    })
  }
}

export default Thwip
