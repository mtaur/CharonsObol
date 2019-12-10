let cpuJSON = (state, cpuJSON) => {
  state.cpuJSON = cpuJSON
}
let playerJSON = (state, playerJSON) => {
  state.playerJSON = playerJSON
}
let scrollJSON = (state, scrolls) => {
  state.scrollJSON = scrolls
}
let teamConfig = (state, teamConfig) => {
  state.teamConfig = teamConfig
}

export { playerJSON, cpuJSON, scrollJSON, teamConfig }
// export function someMutation (/* state */) {
// }
