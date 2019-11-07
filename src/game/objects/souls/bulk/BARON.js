import { Soul } from '../Soul.js'

// console.log(Soul)
class Baron {
  static NAME = 'BARON'
  static filename = 'BARON'

  constructor () {
    return new Soul({
      name: 'Baron von Sentry',
      NAME: 'BARON',
      desc: `A very pious dude, and quite furious that he wasn't provided his obol after death.`,
      bonus: {
        HP: 15,
        DRED: 2,
        DREF: 2,
        MELEE: 6
      },
      converts: [
        {
          from: 'HP',
          to: 'DRED',
          value: 0.02
        },
        {
          from: 'HP',
          to: 'DREF',
          value: 0.02
        },
        {
          from: 'MELEE',
          to: 'DRED',
          value: 0.05
        },
        {
          from: 'MELEE',
          to: 'DREF',
          value: 0.05
        },
        {
          from: 'MAGIC',
          to: 'MAGIC',
          value: -0.15
        }
      ],
      skills: ['ADVANCE', 'REBUKE', 'YOLOSTRIKE'],
      AISkills: ['ADVANCE', 'REBUKE', 'MELEE', 'GUARD', 'YOLOSTRIKE'],
      AIRow: 'front',
      AIRoles: ['KNIGHT']
    })
  }
}

export default Baron
