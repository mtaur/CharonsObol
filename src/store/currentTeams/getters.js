// export function someGetter (/* state */) {
// }
function playerJSON (state) {
  return state.playerJSON
}
function cpuJSON (state) {
  return state.cpuJSON
}
function scrollJSON (state) {
  return state.scrollJSON
}
function teamConfig (state) {
  return state.teamConfig
}

export { playerJSON, cpuJSON, scrollJSON, teamConfig }
