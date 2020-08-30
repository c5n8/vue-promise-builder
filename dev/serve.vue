<script>
import Vue from 'vue'
import { PromiseBuilder } from '@/entry'
import { calculate } from './calculate'

export default Vue.extend({
  name: 'ServeDev',

  components: {
    PromiseBuilder,
  },

  data() {
    return {
      calculation: null,
    }
  },
  
  methods: {
    async startCalculation() {
      this.calculation = calculate()

      try {
        await this.calculation
      } catch (error) {
        //
      }
    },
  }
})
</script>

<template>
  <div id="app">
    <PromiseBuilder #default="snapshot" :promise="calculation">
      <section class="flex flex-col items-center p-4">
        <template v-if="snapshot.isStandby">
          <div>Generate number 1-1000</div>
          <div>
            <button class="underline" @click="startCalculation()">Start</button>
          </div>
        </template>

        <template v-if="snapshot.isPending">
          <div>Generating...</div>
        </template>
        <template v-else-if="snapshot.isFulfilled">
          <div>{{ snapshot.result }}</div>
        </template>
        <template v-else-if="snapshot.isRejected">
          <div>{{ snapshot.error }}</div>
        </template>

        <template v-if="snapshot.isSettled">
          <div>
            <button class="underline" @click="startCalculation()">Retry</button>
          </div>
        </template>
      </section>
    </PromiseBuilder>
  </div>
</template>
