// import x from y.js
import { cloneDeep as clone } from 'lodash'

var pickSkill = function (selector, skill) {
  // stateData = {
  //   // activeUnit = {}
  //   // skill = {}
  //   // (skill will have info about valid click targets and number of steps)
  //   // targets[i] = target clicked at step i
  // }
  // selector.stateData.activeUnit = unit
  selector.stateData.activeSkill = clone(skill)
  // console.log('Pick skill', skill)
  selector.changeState('ChooseTarget')
}
var obj = {
  filename: 'pickSkill',
  exprt: pickSkill
}
export default obj
// export default pickSkill
