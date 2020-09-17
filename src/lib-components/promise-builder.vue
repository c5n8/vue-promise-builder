<script>
export default {
  name: 'PromiseBuilder',

  props: {
    promise: {
      type: Promise,
      default: null,
    },
  },

  data() {
    return {
      error: undefined,
      result: undefined,
      status: 'standby',
    }
  },

  computed: {
    isStandby() {
      return this.status === 'standby'
    },
    isPending() {
      return this.status === 'pending'
    },
    isFulfilled() {
      return this.status === 'fulfilled'
    },
    isRejected() {
      return this.status === 'rejected'
    },
    isSettled() {
      return this.isFulfilled || this.isRejected
    },
    hasResult() {
      return this.isSettled ? this.result != null : undefined
    },
    hasError() {
      return this.isSettled ? this.error != null : undefined
    },
  },

  watch: {
    promise: {
      immediate: true,
      async handler(promise) {
        if (promise == null) {
          return
        }

        this.error = undefined
        this.result = undefined
        this.status = 'pending'

        let result

        try {
          result = await promise
        } catch (error) {
          this.error = error
          this.status = 'rejected'

          return
        }

        this.error = null
        this.result = result
        this.status = 'fulfilled'
      },
    },
  },

  render() {
    return this.$scopedSlots.default({
      error: this.error,
      result: this.result,
      status: this.status,
      isStandby: this.isStandby,
      isPending: this.isPending,
      isFulfilled: this.isFulfilled,
      isRejected: this.isRejected,
      isSettled: this.isSettled,
      hasResult: this.hasResult,
      hasError: this.hasError,
    })
  },
}
</script>
