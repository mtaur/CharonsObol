import { Soul } from '../soul.js'

// console.log(Soul)
class Lynn {
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
      skills: []
    })
  }
}

export default Lynn
