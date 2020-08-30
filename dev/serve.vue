<script>
import Vue from 'vue';
import { VuePromiseBuilderSample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VuePromiseBuilderSample,
  }
});
</script>

<template>
  <div id="app">
    <vue-promise-builder-sample />
  </div>
</template>
