import { CtrlState } from '../CtrlState.js'

// A unit is selected, but no target has been chosen.
class ChooseTarget extends CtrlState {
  // static NAME = 'CHOOSETARGET'
  // static name = 'ChooseTarget'
  //
  getClickJSON (selector, unit) {
    if (selector.canTarget(unit)) {
      return {
        viewState: 'canTarget',
        onClick: selector.stateData.activeSkill.targetRules.length > 1 ? 'pickTarget' : 'execute'
      }
    } else if (selector.isSelected(unit)) {
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
  }
  // constructor (selector, unit, action) {
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

export default ChooseTarget
