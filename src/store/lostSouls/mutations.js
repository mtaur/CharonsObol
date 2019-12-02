let claimSoul = (state, soulName) => {
  let soulIndx = -1
  for (let index in state.lostSouls) {
    if (state.lostSouls[index] === soulName) {
      soulIndx = index
    }
  }
  state.lostSouls.splice(soulIndx, 1)
}

export { claimSoul }
// export function someMutation (/* state */) {
// }
