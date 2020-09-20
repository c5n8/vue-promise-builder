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
    isSettled() {
      return this.status === 'fulfilled' || this.status === 'rejected'
    },
    isFulfilled() {
      return this.isSettled ? this.status === 'fulfilled' : undefined
    },
    isRejected() {
      return this.isSettled ? this.status === 'rejected' : undefined
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
        this.error = undefined
        this.result = undefined

        if (promise == null) {
          this.status = 'standby'

          return
        }

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
