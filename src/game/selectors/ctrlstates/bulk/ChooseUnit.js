import { CtrlState } from '../ctrlstates.js'

// Nothing is selected.  No action in progress.
class ChooseUnit {
  static NAME = 'CHOOSEUNIT'

  function getClickMode (unit) {
    if (game.playerTeam.active.indexOf(unit) > -1) {
      return 'makeActive'
    }
    if (game.cpuTeam.active.indexOf(unit) > -1) {
      return 'inspect'
    }
  }

  constructor (selector) {

    selector.getClickMode = this.getClickMode
    // return new Soul({
    //   name: 'Lynneth Javelle',
    //   NAME: 'LYNN',
    //   desc: `Lynneth Javelle, or Lynn if you're a friend.  She does not respond to "Javelin"...`,
    //   bonus: {
    //     HP: 12,
    //     RANGED: 6,
    //     MELEE: 6,
    //     INIT: 1
    //   },
    //   skills: []
    // })
  }
}

export default ChooseUnit
