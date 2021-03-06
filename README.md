<p align="center"><img width="100" height="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></p>

<h2 align="center">Vue Promise Builder</h2>

<p align="center">
  Component that builds itself based on the latest snapshot of state of a Promise.
</p>

#

## News

Checkout [vue-promise-snapshot](https://github.com/c5n8/vue-promise-snapshot), if you want same functionality using composition, with Vue 2 and Vue 3 compatible versions available.

## Installation

- Using NPM
```
npm install vue-promise-builder
```

- Using Yarn
```
yarn add vue-promise-builder
```

## Usage

⚠️ Component must contain only one root element!

```html
<template>
  <PromiseBuilder v-slot="snapshot" :promise="generation">
    <div>
      <div v-if="snapshot.isStandby">
        <div>Generate number 1-1000</div>
        <button @click="generate()">Start</button>
      </div>
      <div v-else-if="snapshot.isPending">
        Generating...
      </div>
      <div v-else-if="snapshot.isSettled">
        <div v-if="snapshot.isFulfilled">
          {{ snapshot.result }}
        </div>
        <div v-else-if="snapshot.isRejected">
          {{ snapshot.error }}
        </div>

        <button @click="generate()">Retry</button>
      </div>
    </div>
  </PromiseBuilder>
</template>

<script>
import { PromiseBuilder } from 'vue-promise-builder'

export default {
  components: {
    PromiseBuilder,
  },

  data() {
    return {
      generation: null,
    }
  },

  methods: {
    async generate() {
      this.generation = generate(1, 1000)

      try {
        await this.generation
      } catch (error) {
        //
      }
    },
  },
}

async function generate(min, max) {
  await new Promise((resolve) => setTimeout(resolve, random(200, 2000)))

  if (random(0, 1)) {
    throw new Error('Failed to generate')
  }

  return random(min, max)
}

function random(min, max) {
  return Math.floor(Math.random() * Math.floor(max - min + 1)) + min
}
</script>
```

## API Reference

#### Props

| Prop    | Type    | Default |
| ------- | ------- | ------- |
| promise | Promise | null    |

#### Slots

| Slot    | Prop        | Type                                                |
| ------- | ----------- | --------------------------------------------------- |
| default | status      | 'standby' \| 'pending' \| 'fulfilled' \| 'rejected' |
|         | result      | any                                                 |
|         | error       | any                                                 |
|         | isStandby   | boolean                                             |
|         | isPending   | boolean                                             |
|         | isSettled   | boolean                                             |
|         | isFulfilled | boolean \| undefined                                |
|         | isRejected  | boolean \| undefined                                |
|         | hasResult   | boolean \| undefined                                |
|         | hasError    | boolean \| undefined                                |

## License

[MIT](http://opensource.org/licenses/MIT)
