import { Soul } from '../Soul.js'

// console.log(Soul)
class Lynn {
  static NAME = 'LYNN'
  static filename = 'LYNN'

  constructor () {
    return new Soul({
      name: 'Lynneth Javelle',
      NAME: 'LYNN',
      desc: `Lynneth Javelle, or Lynn if you're a friend.  She does not respond to "Javelin"...`,
      bonus: {
        HP: 12,
        RANGED: 6,
        MELEE: 6,
        INIT: 1
      },
      converts: [
        {
          from: 'MELEE',
          to: 'RANGED',
          value: 0.25 // 0.15 // 0.1
        },
        {
          from: 'RANGED',
          to: 'MELEE',
          value: 0.25 // 0.15 // 0.1
        },
        {
          from: 'MAGIC',
          to: 'MAGIC',
          value: -0.25 // -0.15
        }
      ],
      skills: ['LUNGE', 'HARRY', 'YOLOSTRIKE', 'LONGSHOT'],
      AISkills: ['LUNGE', 'HARRY', 'RANGED', 'GUARD', 'MOVEBACK', 'YOLOSTRIKE', 'LONGSHOT'],
      AIRow: 'back',
      AIRoles: ['KNIGHT', 'ARCHER']
    })
  }
}

export default Lynn
