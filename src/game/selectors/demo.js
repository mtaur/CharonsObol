export default class Team {
  side = '' // player cpu
  front = []
  back = []
  get all () { return this.front.concat(this.back) }
  // constructor() {
  // }
}

var player = new Team()
var cpu = new Team()

player.front = ['Lynn', 'Minotaur']
player.back = ['Thwip', 'Penelope']
player.side = 'player'
cpu.front = ['Knight', 'Mozart']
cpu.back = ['Archer1', 'Archer2']
cpu.side = 'cpu'

export { player, cpu }

console.log(player.all)
console.log(cpu.all)
