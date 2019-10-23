import { CtrlState } from '../CtrlState.js'
// import { hasIn as hasProp } from 'lodash'

// A unit is selected, but no target has been chosen.
class ChooseTarget extends CtrlState {
  // static NAME = 'CHOOSETARGET'
  // static name = 'ChooseTarget'
  static filename = 'ChooseTarget'
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
    selector.turnState = 'player'
    console.log(selector.stateData.activeUnit)
    let rule = new selector.stateData.activeSkill.targetRules[0]({
      caster: selector.stateData.activeUnit,
      playerTeam: selector.stateData.activeUnit.playerTeam,
      cpuTeam: selector.stateData.activeUnit.cpuTeam,
      prevTargs: selector.stateData.activeSkill.prevTargs
    })
    let currentStep = selector.stateData.activeSkill.prevTargs.length
    let nextEffect = selector.stateData.activeSkill.effects[currentStep]
    selector.prompt = selector.stateData.activeUnit.name + ` is preparing the ability: ${selector.stateData.activeSkill.name}` +
    `. Choose a target for the effect: ${nextEffect.NAME}`
    selector.promptVerbose = selector.stateData.activeUnit.name + ` is preparing the ability: ${selector.stateData.activeSkill.name}` +
    `. Choose a target for the effect: ${nextEffect.NAME}` +
    // ` ${selector.stateData.activeSkill.targetRules.length} targets left to pick.` +
    `. Legal targets are green. Otherwise, targets of previous effects are PURPLE.` +
    `CANCEL the ability by clicking its button, or begin casting a different ability by clicking its button, ` +
    `or by clicking any allied unit who is not a legal target for the next effect.`
    // if (selector.stateData.activeSkill.targetRules.length > 0) { selector.prompt += ' targets left to pick.' }
    // if (hasProp(nextEffect, 'tooltip')) {
    //   console.log('yay!')
    // }
    console.log(rule)
    if (rule.auto) {
      let legalTargs = rule.find()
      let targ = legalTargs[Math.floor(Math.random() * legalTargs.length)]
      console.log(targ, 'AUTO targ!!!')
      if (selector.stateData.activeSkill.targetRules.length === 1) {
        selector.onClicks.execute(selector, targ)
      } else {
        selector.stateData.activeSkill.prevTargs.push(targ)
        selector.stateData.activeSkill.targetRules.shift()
        selector.changeState('ChooseTarget')
      }
      // this.selector.stateData.activeUnit = this.unit
      // this.selector.stateData.activeSkill = clone(this.unit.actions.filter((action) => action.NAME === 'RESTMINOR')[0])
      // selector.stateData.activeSkill.prevTargs.push(this.unit)
      // selector.stateData.activeSkill.targetRules.length > 1 ? 'pickTarget' : 'execute'
    }
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
