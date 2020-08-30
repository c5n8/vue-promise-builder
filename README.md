# Vue Promise Builder

Component that builds itself based on the latest snapshot of interaction with a Promise.

## Usage

```html
<template>
  <PromiseBuilder #default="snapshot" :promise="calculation">
    <section>
      <template v-if="snapshot.isStandby">
        <div>Generate number 1-1000</div>
        <div>
          <button @click="startCalculation()">Start</button>
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
          <button @click="startCalculation()">Retry</button>
        </div>
      </template>
    </section>
  </PromiseBuilder>
</template>

<script>
import { PromiseBuilder } from 'vue-promise-builder'
import { sample, random } from 'lodash-es'

export default {
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
  },
}

export async function calculate() {
  const duration = random(200, 2000)

  await new Promise((resolve) => setTimeout(resolve, duration))

  if (sample([true, false])) {
    throw new Error('Failed to generate')
  }

  return random(0, 1000)
}
</script>
```

## API Reference

#### Props

| Prop    | Type    | Default |
| ------- | ------- | ------- |
| promise | Promise | null    |

#### Slots

| Slot    | Prop        | Type                                                  |
| ------- | ----------- | ----------------------------------------------------- |
| default | status      | string: 'standby', 'pending', 'fulfilled', 'rejected' |
|         | result      | any                                                   |
|         | error       | any                                                   |
|         | isStandby   | boolean                                               |
|         | isPending   | boolean                                               |
|         | isFulfilled | boolean                                               |
|         | isRejected  | boolean                                               |
|         | isSettled   | boolean                                               |
|         | hasResult   | boolean                                               |
|         | hasError    | boolean                                               |

## License

[MIT](http://opensource.org/licenses/MIT)
