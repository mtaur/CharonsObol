let buyItem = (state, itemName) => {
  let itemIndx = -1
  for (let index in state.itemsForSale) {
    if (state.itemsForSale[index] === itemName) {
      itemIndx = index
    }
  }
  state.itemsForSale.splice(itemIndx, 1)
}

export { buyItem }
// export function someMutation (/* state */) {
// }
