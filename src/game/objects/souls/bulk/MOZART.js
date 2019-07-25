import { Soul } from '../Soul.js'

// console.log(Soul)
class Mozart {
  static NAME = 'MOZART'
  static filename = 'MOZART'

  constructor () {
    return new Soul({
      name: 'Zombie Mozart',
      NAME: 'MOZART',
      desc: `He hasn't written anything good in a while...`,
      bonus: {
        HP: 10,
        DREF: 2,
        MELEE: 6
      },
      converts: [
        {
          from: 'HP',
          to: 'HP',
          value: 0.25
        },
        {
          from: 'DRED',
          to: 'DRED',
          value: -0.25
        },
        {
          from: 'DRED',
          to: 'DREF',
          value: 0.25
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          value: -0.2
        },
        {
          from: 'INIT',
          to: 'INIT',
          value: -0.5
        }
      ],
      skills: []
    })
  }
}

export default Mozart
