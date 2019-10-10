import { CtrlState } from '../CtrlState.js'

// A unit is selected, but no action has been chosen.
class ChooseAction extends CtrlState {
  // static NAME = 'CHOOSEACTION'
  // static name = 'ChooseAction'
  static filename = 'ChooseAction'
  //
  // change to getClickJSON (unit) { ... }
  getClickJSON (selector, unit) {
    if (selector.isSelected(unit)) {
      // change to obj, { viewState: '', onClick: ''}
      return {
        viewState: 'active',
        onClick: 'deactivate'
      }
    } else if (selector.game.playerTeam.field.indexOf(unit) > -1) {
      return {
        viewState: 'idle',
        onClick: 'makeActive'
      }
    } else if (selector.game.cpuTeam.field.indexOf(unit) > -1) {
      return {
        viewState: 'idle',
        onClick: 'inspect'
      }
    }
  }

  constructor (selector, obj) {
    super(selector, obj)
    selector.getClickJSON = this.getClickJSON
    selector.turnState = 'player'
    selector.promptVerbose = selector.stateData.activeUnit.name + ' selected! Use left panel to choose a skill or item ability. Some skills (like Guard) are auto-targetted and will execute immediately upon selection. You may spend SP to enhance stats on the fly without using a turn!'
    selector.prompt = selector.stateData.activeUnit.name + ' selected!'
    selector.resetSkill()
  }
  // constructor (selector, unit) {
  //   // return new Soul({
  //   //   name: 'Lynneth Javelle',
  //   //   NAME: 'LYNN',
  //   //   desc: `Lynneth Javelle, or Lynn if you're a friend.  She does not respond to "Javelin"...`,
  //   //   bonus: {
  //   //     HP: 12,
  //   //     RANGED: 6,
  //   //     MELEE: 6,
  //   //     INIT: 1
  //   //   },
  //   //   skills: []
  //   // })
  // }
}

export default ChooseAction
