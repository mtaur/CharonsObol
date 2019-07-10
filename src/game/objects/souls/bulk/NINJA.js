import { Soul } from '../Soul.js'

// console.log(Soul)
class Ninja {
  static NAME = 'NINJA'
  static filename = 'NINJA'

  constructor () {
    return new Soul({
      name: 'Generic Ninja',
      NAME: 'NINJA',
      desc: `A generic placeholder ninja archetype.`,
      bonus: {
        INIT: 5
      },
      converts: [
        {
          from: 'INIT',
          to: 'RANGED',
          value: 1
        },
        {
          from: 'INIT',
          to: 'MELEE',
          value: 1
        },
        {
          from: 'INIT',
          to: 'MAGIC',
          value: 1
        },
        {
          from: 'INIT',
          to: 'DRED',
          value: 0.25
        },
        {
          from: 'INIT',
          to: 'DREF',
          value: 0.25
        },
        {
          from: 'MELEE',
          to: 'MELEE',
          value: -0.25
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          value: -0.25
        },
        {
          from: 'MAGIC',
          to: 'MAGIC',
          value: -0.25
        },
        {
          from: 'DRED',
          to: 'DRED',
          value: -0.25
        },
        {
          from: 'DREF',
          to: 'DREF',
          value: -0.25
        }
      ],
      skills: []
    })
  }
}

export default Ninja
