<template>
  <q-drawer
    v-model="visible"
    bordered
    content-class="bg-grey-2"
    :width="300"
    :breakpoint="0"
  >
    <q-scroll-area class="fit">
      <div class="row justify-center q-pa-xs">
        <q-btn color="teal" @click="turnPoints = !turnPoints">{{ turnPoints ? 'Hide' : 'Show' }} initiative bars</q-btn>
      </div>
      <SPPanel :playerTeam="playerTeam"></SPPanel>
      <div v-if="turnPoints" class="sp">
        <div class="text-h5">
          Turn summary:
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" content-class="bg-teal" max-width="20vw">
            <div style="font-size: 14px">
              Between turns, the turn guages gain TURN POINTS until one of them is full, at which time that team takes a turn, with priority going to the player if both are full.
              Initiative (INIT) is used to generate these turn points.  Each unit contributes three "initiative tokens" carrying their INIT value at the start of each round.
              When a unit takes a minor/major/full action, that team's 1/2/3 highest value tokens are spent, as well as 350/650/100 turn points,
              delaying the next turn AND slowing the rate of the guage refill for the rest of the round, until the team runs out of actions and/or non-zero initiative tokens.
            </div>
            <div style="font-size: 14px">
              Full actions early in the round will delay your next turn a lot, so weigh your options.
            </div>
          </q-tooltip>
        </div>
        <!-- <div>
          <h6>Turn points</h6>
          <div>Player: {{ playerTeam.turnPoints }} / {{ playerTeam.maxTurnPoints }}</div>
          <div>CPU: {{ cpuTeam.turnPoints }} / {{ cpuTeam.maxTurnPoints }}</div>
        </div> -->
        <span v-if="selector.turnState === 'player'">
          <div v-if="selector.turnState === 'player'" class="col-12 row items-center">
            <div class="col-3">Player:</div>
            <div class="col-6">
              <q-linear-progress
              class="q-mt-sm"
              rounded style="height: 18px"
              :value="1" color="green"
              />
            </div>
            <div class="col-3">READY
              <div>
                {{ playerTeam.turnPoints }}/{{ playerTeam.maxTurnPoints }}
              </div>
            </div>
          </div>
          <div>{{ playerTeam.initTotal }} initiave points remaining</div>
          <div>Next three initiative marbles used: {{ playerTeam.checkInitArr[0] }}/{{ playerTeam.checkInitArr[1] }}/{{ playerTeam.checkInitArr[2] }}</div>
        </span>
        <span v-else-if="playerTeam.hasTurn && playerTeam.initTotal > 0">
          <div class="col-12 row items-center">
            <div class="col-3">Player:</div>
            <div class="col-6">
              <q-linear-progress
              class="q-mt-sm"
              rounded style="height: 18px"
              :value="playerTeam.turnPoints / playerTeam.maxTurnPoints" color="yellow"
              />
            </div>
            <div class="col-3">{{ playerTeam.turnPoints }}/{{ playerTeam.maxTurnPoints }}</div>
          </div>
          <div>{{ playerTeam.initTotal }} initiave points remaining</div>
          <div>Next three initiative marbles used: {{ playerTeam.checkInitArr[0] }}/{{ playerTeam.checkInitArr[1] }}/{{ playerTeam.checkInitArr[2] }}</div>
        </span>
        <span v-else>
          <div class="col-12 row items-center">
            <div class="col-3">Player:</div>
            <div class="col-6">
              <q-linear-progress
              class="q-mt-sm"
              rounded style="height: 18px"
              :value="playerTeam.turnPoints / playerTeam.maxTurnPoints" color="grey"
              />
            </div>
            <div class="col-3">{{ playerTeam.turnPoints }}/{{ playerTeam.maxTurnPoints }}</div>
          </div>
          <div>{{ playerTeam.initTotal }} initiave points remaining (turn gauge refill rate)</div>
          <div>Next three initiative marbles used: {{ playerTeam.checkInitArr[0] }}/{{ playerTeam.checkInitArr[1] }}/{{ playerTeam.checkInitArr[2] }}</div>
          <div>0 team initiative point total and/or no usable actions.</div>
        </span>
        <div v-if="cpuTeam.hasTurn && cpuTeam.initTotal > 0">
          <div class="col-12 row items-center">
            <div class="col-3">CPU:</div>
            <div class="col-6">
              <q-linear-progress
              class="q-mt-sm"
              rounded style="height: 18px"
              :value="cpuTeam.turnPoints / cpuTeam.maxTurnPoints" color="yellow"
              />
            </div>
            <div class="col-3">{{ cpuTeam.turnPoints }}/{{ cpuTeam.maxTurnPoints }}</div>
          </div>
          <div>{{ cpuTeam.initTotal }} initiave points remaining</div>
          <div>Next three initiative marbles used: {{ cpuTeam.checkInitArr[0] }}/{{ cpuTeam.checkInitArr[1] }}/{{ cpuTeam.checkInitArr[2] }}</div>
        </div>
        <div v-else>
          <div class="col-12 row items-center">
            <div class="col-3">CPU:</div>
            <div class="col-6">
              <q-linear-progress
              class="q-mt-sm"
              rounded style="height: 18px"
              :value="cpuTeam.turnPoints / cpuTeam.maxTurnPoints" color="grey"
              />
            </div>
            <div class="col-3">{{ cpuTeam.turnPoints }}/{{ cpuTeam.maxTurnPoints }}</div>
          </div>
          <div class="sp">
            <div>{{ cpuTeam.initTotal }} initiave points remaining</div>
            <div>Next three initiative marbles used: {{ cpuTeam.checkInitArr[0] }}/{{ cpuTeam.checkInitArr[1] }}/{{ cpuTeam.checkInitArr[2] }}</div>
            <div>0 team initiative point total and/or no usable actions.</div>
          </div>
        </div>
      </div>
        <!-- <div class="justify-center">
        <q-btn size='md' color="red" @click="enemyTurn">Enemy Turn</q-btn>
        <q-btn size='md' color="green" @click="newRound">New Round</q-btn>
      </div> -->

      <!-- Change this to allow a persistent 'inspected' unit to
      become the 'activeUnit' when your turn starts, if playerTeam unit -->
      <span v-if="selector.turnState !== 'player'" @click.stop=''>
      <unitdetail v-for="unit in activeUnit"
        :unit="unit"
        :cpuTeam = "cpuTeam"
        :playerTeam = "playerTeam"
        :selector = "selector"
        :key="unit.name">
      </unitdetail>
      </span>
      <span v-else>
      <unitdetail v-for="unit in activeUnit"
        :unit="unit"
        :cpuTeam = "cpuTeam"
        :playerTeam = "playerTeam"
        :selector = "selector"
        :key="unit.name">
      </unitdetail>
      </span>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { openURL } from 'quasar'
import unitdetail from 'src/components/unitdetail'
import SPPanel from 'src/components/SPPanel'

export default {
  name: 'leftDrawer',
  props: ['visible', 'activeUnit', 'playerTeam', 'cpuTeam', 'selector'],
  data () {
    return {
      turnPoints: true
      // leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    newRound () {
      this.playerTeam.field.forEach(
        (unit) => {
          // if (!unit.hasAction.major) { this.playerTeam.SP += 2 }
          // if (!unit.hasAction.minor) { this.playerTeam.SP += 1 }
          unit.hasAction.major = true
          unit.hasAction.minor = true
        })
      this.cpuTeam.field.forEach(
        (unit) => {
          if (unit.hasAction.major) { this.playerTeam.SP -= 5 }
          if (unit.hasAction.minor) { this.playerTeam.SP -= 3 }
          if (!unit.hasAction.major) { this.playerTeam.SP += 2 }
          if (!unit.hasAction.minor) { this.playerTeam.SP += 1 }
          unit.hasAction.major = true
          unit.hasAction.minor = true
        })
      this.selector.changeState('ChooseUnit')
    },

    enemyTurn () {
      let remainingTurn = false
      for (let index in this.cpuTeam.field) {
        let unit = this.cpuTeam.field[index]
        if (unit.hasAction.major || unit.hasAction.minor) {
          remainingTurn = true
        }
      }
      if (remainingTurn) {
        this.playerTeam.SP += 1
        this.selector.changeState('EnemyTurn')
      }
    }
  },
  components: { unitdetail, SPPanel }
}
</script>

<style>
  .sp {
    /* justify-content: center; */
    text-align: center;
  }
</style>
