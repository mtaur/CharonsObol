import { CtrlState } from '../ctrlstates.js'

// A unit is selected, but no action has been chosen.
class ChooseAction {
  static NAME = 'CHOOSEACTION'

  // change to getClickJSON (unit) { ... }
  function getClickMode (unit) {

    if (selector.isSelected(unit)) {
      // change to obj, { viewState: '', onClick: ''}
      return 'deactivate'
    }
    else if (game.playerTeam.field.indexOf(unit) > -1) {
      return 'makeActive'
    }
    else if (game.cpuTeam.field.indexOf(unit) > -1) {
      return 'inspect'
    }
  }

  constructor (selector, unit) {
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

export default ChooseAction
