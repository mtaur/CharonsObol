import { Soul } from '../Soul.js'

// console.log(Soul)
class Deathwing {
  static NAME = 'DEATHWING'
  static filename = 'DEATHWING'

  constructor () {
    return new Soul({
      name: 'Deathwing',
      NAME: 'DEATHWING',
      desc: `Um. I am the darkness... Wanna watch some anime?`,
      bonus: {
        // HP: 10,
        MAGIC: 4,
        MELEE: 4,
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
          from: 'RANGED',
          to: 'MAGIC',
          value: 0.1
        },
        {
          from: 'MP',
          to: 'MAGIC',
          value: 4
        },
        {
          from: 'MAGIC',
          to: 'MP',
          value: 0.025 // -0.35
        }
      ],
      skills: ['VOID', 'REAPER', 'HOMINGBOLT', 'YOLOSTRIKE'],
      // skills: ['FASTING', 'TAURVEST', 'TAURBLAST', 'HOMINGBOLT'],
      AISkills: ['VOID', 'REAPER', 'GUARD', 'HOMINGBOLT', 'YOLOSTRIKE'],
      AIRow: 'front',
      AIRoles: ['MAGE', 'KNIGHT'],
      passives: [
        {
          name: 'enmity',
          NAME: 'ENMITY',
          params: {}
        }
      ]
    })
  }
}

export default Deathwing
