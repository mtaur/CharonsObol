import { Soul } from '../Soul.js'

// console.log(Soul)
class Primordaea {
  static NAME = 'PRIMORDAEA'
  static filename = 'PRIMORDAEA'

  constructor () {
    return new Soul({
      name: 'Primordaea',
      NAME: 'PRIMORDAEA',
      desc: `They are something, nothing, many things... idk...`,
      bonus: {
        HP: 10,
        MP: 1,
        INIT: 1,
        RANGED: 5,
        MELEE: 5,
        MAGIC: 5
        // MP: 1,
        // RANGED: 4,
        // MELEE: 4,
        // MAGIC: 4
      },
      converts: [
        // {
        //   from: 'HP',
        //   to: 'MP',
        //   value: 0.02
        // },
        // {
        //   from: 'HP',
        //   to: 'HP',
        //   value: -0.2
        // }
      ],
      skills: ['REGEN', 'DRYAD', 'FERAL', 'BASEFORM', 'NATLOG', 'HOMINGBOLT', 'YOLOSTRIKE', 'LONGSHOT'],
      AISkills: ['REGEN', 'DRYAD', 'NATLOG', 'HOMINGBOLT'],
      // AISkills: ['REGEN', 'DRYAD', 'FERAL', 'NATLOG', 'MELEE'],
      AIRow: 'back',
      AIRoles: ['MAGE']
    })
  }
}

export default Primordaea
