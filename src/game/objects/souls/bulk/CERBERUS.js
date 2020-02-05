import { Soul } from '../Soul.js'

// console.log(Soul)
class Cerberus {
  static NAME = 'CERBERUS'
  static filename = 'CERBERUS'
  static restricted = true

  constructor () {
    return new Soul({
      name: 'Cerberus',
      NAME: 'CERBERUS',
      desc: `One very bad doggo...`,
      bonus: {
        HP: 20,
        MP: 4,
        INIT: 2,
        DREF: 4,
        DRED: 4,
        MELEE: 10,
        RANGED: 10,
        MAGIC: 10
      },
      converts: [
        // {
        //   from: 'HP',
        //   to: 'HP',
        //   // value: 0.25
        //   value: -0.3
        // },
        // {
        //   from: 'MP',
        //   to: 'MP',
        //   // value: 0.25
        //   value: -0.3
        // },
        {
          from: 'INIT',
          to: 'INIT',
          // value: 0.25
          value: -0.3
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          // value: 0.25
          value: -0.3
        },
        {
          from: 'MAGIC',
          to: 'MAGIC',
          // value: 0.25
          value: -0.3
        },
        {
          from: 'MELEE',
          to: 'MELEE',
          // value: 0.25
          value: -0.3
        },
        {
          from: 'DREF',
          to: 'DREF',
          // value: 0.25
          value: -0.3
        },
        {
          from: 'DRED',
          to: 'DRED',
          // value: 0.25
          value: -0.3
        }
      ],
      skills: [],
      AISkills: ['GUARD', 'HOMINGBOLT', 'MOVEBACK'],
      AIRow: 'back',
      AIRoles: ['MAGE'],
      passives: [
        {
          name: 'headofcerberus',
          NAME: 'HEADOFCERBERUS',
          params: {}
        }
      ]
    })
  }
}

export default Cerberus
