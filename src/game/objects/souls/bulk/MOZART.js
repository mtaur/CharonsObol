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
          // value: 0.25
          value: 0.2
        },
        {
          from: 'DRED',
          to: 'DRED',
          // value: -0.25
          value: -0.3 // -0.5
        },
        {
          from: 'DRED',
          to: 'DREF',
          // value: 0.25
          value: 0.3 // 0.5
        },
        {
          from: 'RANGED',
          to: 'RANGED',
          value: -0.2
        },
        {
          from: 'MELEE',
          to: 'MELEE',
          value: 0.2
        },
        {
          from: 'INIT',
          to: 'INIT',
          value: -0.3 // -0.5
        }
      ],
      skills: ['CONTAGION', 'BRAINS', 'YOLOSTRIKE'],
      AISkills: ['CONTAGION', 'BRAINS', 'MELEE', 'GUARD', 'YOLOSTRIKE'],
      AIRow: 'front',
      AIRoles: ['KNIGHT'],
      passives: [
        {
          name: 'damagetopoisonin',
          NAME: 'DAMAGETOPOISONIN',
          params: {}
        },
        {
          name: 'damagetopoisonout',
          NAME: 'DAMAGETOPOISONOUT',
          params: {}
        }
      ]
    })
  }
}

export default Mozart
