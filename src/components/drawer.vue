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
      <div class="sp">
        <div>
          <h5 key='SP'>Team SP: {{ playerTeam.SP }} / {{ playerTeam.SPTotal }}</h5>
        </div>
        <div>
          Essence total: {{ playerTeam.RSP }}
        </div>
        <div class="text-caption">
          (Essence converts to total SP with diminishing returns, starting from {{ playerTeam.SPEff * 100 }}% efficiency.)
        </div>
      </div>
      <div v-if="turnPoints">
        <!-- <div>
          <h6>Turn points</h6>
          <div>Player: {{ playerTeam.turnPoints }} / {{ playerTeam.maxTurnPoints }}</div>
          <div>CPU: {{ cpuTeam.turnPoints }} / {{ cpuTeam.maxTurnPoints }}</div>
        </div> -->
        <span v-if="selector.turnState === 'player'">
          <div v-if="selector.turnState === 'player'" class="col-12 row items-center">
            <div class="col-2">Player:</div>
            <div class="col-7">
              <q-linear-progress
              class="q-mt-sm"
              rounded style="height: 30px"
              :value="1" color="green"
              />
            </div>
            <div class="col-3">READY
              <div>
                {{ playerTeam.turnPoints }}/{{ playerTeam.maxTurnPoints }}
              </div>
            </div>
          </div>
          <div>{{ playerTeam.initTotal }} initiave points remaining (turn gauge refill rate)</div>
        </span>
        <span v-else-if="playerTeam.hasTurn && playerTeam.initTotal > 0">
          <div class="col-12 row items-center">
            <div class="col-2">Player:</div>
            <div class="col-7">
              <q-linear-progress
              class="q-mt-sm"
              rounded style="height: 30px"
              :value="playerTeam.turnPoints / playerTeam.maxTurnPoints" color="yellow"
              />
            </div>
            <div class="col-3">{{ playerTeam.turnPoints }}/{{ playerTeam.maxTurnPoints }}</div>
          </div>
          <div>{{ playerTeam.initTotal }} initiave points remaining (turn gauge refill rate)</div>
        </span>
        <span v-else>
          <div class="col-12 row items-center">
            <div class="col-2">Player:</div>
            <div class="col-7">
              <q-linear-progress
              class="q-mt-sm"
              rounded style="height: 30px"
              :value="playerTeam.turnPoints / playerTeam.maxTurnPoints" color="grey"
              />
            </div>
            <div class="col-3">{{ playerTeam.turnPoints }}/{{ playerTeam.maxTurnPoints }}</div>
          </div>
          <div>{{ playerTeam.initTotal }} initiave points remaining (turn gauge refill rate)</div>
          <div>0 team initiative point total and/or no usable actions.</div>
        </span>
        <div v-if="cpuTeam.hasTurn && cpuTeam.initTotal > 0" class="col-12 row items-center">
          <div class="col-2">CPU:</div>
          <div class="col-7">
            <q-linear-progress
            class="q-mt-sm"
            rounded style="height: 30px"
            :value="cpuTeam.turnPoints / cpuTeam.maxTurnPoints" color="yellow"
            />
          </div>
          <div class="col-3">{{ cpuTeam.turnPoints }}/{{ cpuTeam.maxTurnPoints }}</div>
          <div>{{ cpuTeam.initTotal }} initiave points remaining (turn gauge refill rate)</div>
        </div>
        <div v-else class="col-12 row items-center">
          <div class="col-2">CPU:</div>
          <div class="col-7">
            <q-linear-progress
            class="q-mt-sm"
            rounded style="height: 30px"
            :value="cpuTeam.turnPoints / cpuTeam.maxTurnPoints" color="grey"
            />
          </div>
          <div class="col-3">{{ cpuTeam.turnPoints }}/{{ cpuTeam.maxTurnPoints }}</div>
          <div>{{ cpuTeam.initTotal }} initiave points remaining</div>
          <div>0 team initiative point total and/or no usable actions.</div>
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
  components: { unitdetail }
}
</script>

<style>
  .sp {
    /* justify-content: center; */
    text-align: center;
  }
</style>
