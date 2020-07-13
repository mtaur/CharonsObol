<template>
  <div class="q-gutter-md grow">
    <q-carousel
      v-model="slide"
      transition-prev="jump-right"
      transition-next="jump-left"
      swipeable
      animated
      control-color="white"
      prev-icon="arrow_left"
      next-icon="arrow_right"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      arrows
      height="400px"
      class="bg-grey text-white shadow-1 rounded-borders grow"
    >
      <q-carousel-slide name="0" class="column no-wrap flex-center grow">
        <q-card class="bg-grey-9 text-white grow">
          <q-card-section>
            <span class="text-h6">
              NECROMANCY COOL TIPS
            </span>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-3 q-pa-sm">
                <q-img src="statics/gameIcons/souls/YOLT.png"></q-img>
              </div>
              <div class="col-9 q-pa-sm">
                <div>
                  <span class="text-h6">
                    YOLT the Metanecromancer, raiser of the un-undead
                  </span>
                  <span class="text-italic text-body1">
                    is a unique character whose RAISE skill comes with many
                    unique balancing mechanisms. Read more to make the most of it.
                  </span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="1" class="column no-wrap flex-center">
        <q-card class="bg-grey-9 text-white">
          <q-card-section>
            <span class="text-h6">
              NECROMANCY COOL TIPS
            </span>
          </q-card-section>
          <q-card-section>
            <div class="text-italic text-body1">
              When YOLT summons a ZOMBIE, that ZOMBIE
              has FREE, NON-TRANSFERABLE SP to spend on its base stats.
              You should probably spend some points in MELEE, RANGED, MAGIC, and/or
              MP right away. Sometimes hoarding some SP for later turns is an option.
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="2" class="column no-wrap flex-center">
        <q-card class="bg-grey-9 text-white">
          <q-card-section>
            <span class="text-h6">
              NECROMANCY COOL TIPS
            </span>
          </q-card-section>
          <q-card-section>
            <div class="text-italic text-body1">
              The ZOMBIE has ALL of the active abilities of its summoner EXCEPT for
              the RAISE ability (for balance reasons which should be obvious).
              Try experimenting with an additional soul or two in the sandbox setups!
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-italic text-body1">
              Budgeting just enough SP into MP to cast the skills you plan to use is
              an important part of necromancing efficiently.  Alternately, you may
              find it effective to raise a ZOMBIE with the right stat configuration
              to use your consumables.
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="3" class="column no-wrap flex-center">
        <q-card class="bg-grey-9 text-white">
          <q-card-section>
            <span class="text-h6">
              NECROMANCY COOL TIPS
            </span>
          </q-card-section>
          <q-card-section>
            <div class="text-italic text-body1">
              A summoned ZOMBIE will DECAY at the start of each round.  This means
              that their POISON amount will be set to match their CURRENT HP, unless
              they already have at least that much poison.  This also cancels
              regeneration effects, so don't bother!  Spending SP on a ZOMBIE's HP,
              will add maximum AND current HP, but getting too much before you need
              it will accelerate the DECAY with no benefit to you.
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-italic text-body1">
              Also, damage dealt by a ZOMBIE is converted to POISON, while incoming
              damage is treated normally.
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="4" class="column no-wrap flex-center">
        <q-card class="bg-grey-9 text-white">
          <q-card-section>
            <span class="text-h6">
              NECROMANCY COOL TIPS
            </span>
          </q-card-section>
          <q-card-section>
            <div class="text-italic text-body1">
              ZOMBIES have no INITIATIVE of their own, and their INIT is 0, period.
              Essentially, every action taken by a ZOMBIE is "borrowed" from an ally with
              non-zero INITIATIVE. In general, turns consume team INITIATIVE, and you'd normally
              run out of INITIATIVE and TURN POINTS at the same time.  Not so with summoned
              ZOMBIE units!  They spend INITIATIVE but contribute none! (continued)
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="5" class="column no-wrap flex-center">
        <q-card class="bg-grey-9 text-white">
          <q-card-section>
            <span class="text-h6">
              NECROMANCY COOL TIPS
            </span>
          </q-card-section>
          <q-card-section>
            <div class="text-italic text-body1">
              Each unit contributes three "initiative marbles".  A major action consumes two marbles,
              and a minor action consumes one. When the total remaining initiative is 0, no more actions
              can be taken, even when action points are available.  A unit with 0 initiative contributes
              three "initiative marble" of value 0.  So when you get down to your last three marbles, it
              is impossible to use any of them. As long as you have at least 1 initiative total, you may perform
              actions of any type.  For example, if you have a minor action on one unit and both actions on
              a zombie, the zombie may use a "BOTH" type action, which will only leave the remaining minor action
              unused.
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="6" class="column no-wrap flex-center">
        <q-card class="bg-grey-9 text-white">
          <q-card-section>
            <span class="text-h6">
              NECROMANCY COOL TIPS
            </span>
          </q-card-section>
          <q-card-section>
            <div class="text-italic text-body1">
              The initiative problem for ZOMBIEs gets worse if you summon more
              at the same time, making it impractical to rush damage this way.
              You do NOT increase the total amount of actions in this way, so you
              it can be impractical unless you intend to leave actions and/or
              get good use out of minor actions, such as by GUARDing.
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="7" class="column no-wrap flex-center">
        <q-card class="bg-grey-9 text-white">
          <q-card-section>
            <span class="text-h6">
              NECROMANCY COOL TIPS
            </span>
          </q-card-section>
          <q-card-section>
            <div class="text-italic text-body1">
              It is rumored that there are legendary blends of COFFEE so strong that even a
              ZOMBIE will benefit from it.
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'

export default {
  name: 'necrotips',
  props: [], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
      slide: '0'
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
    // unitdetail
  }
}
</script>

<style>
  .grow {
    flex: '1 0 auto';
    width: 100%;
  }
</style>
