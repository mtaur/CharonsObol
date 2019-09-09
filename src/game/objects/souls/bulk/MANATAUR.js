import { Soul } from '../Soul.js'

// console.log(Soul)
class Manataur {
  static NAME = 'MANATAUR'
  static filename = 'MANATAUR'

  constructor () {
    return new Soul({
      name: 'Manataur',
      NAME: 'MANATAUR',
      desc: `The only way a minotaur could be even scarier is if it somehow ` +
        `learned magic...`,
      bonus: {
        HP: 10,
        MP: 1
        // DRED: 2,
        // DREF: 2,
      },
      converts: [
        {
          from: 'MELEE',
          to: 'MAGIC',
          value: 0.1
        },
        {
          from: 'MELEE',
          to: 'MELEE',
          value: -0.1
        },
        {
          from: 'RANGED',
          to: 'MAGIC',
          value: 0.1
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          value: -0.1
        },
        {
          from: 'MP',
          to: 'MAGIC',
          value: 4
        },
        {
          from: 'MP',
          to: 'MP',
          value: -0.35
        }
      ],
      skills: []
    })
  }
}

export default Manataur