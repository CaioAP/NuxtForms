export default {
  data: () => ({
    innerValue: '',
  }),
  watch: {
    value(value) {
      this.innerValue = value
    },
    innerValue(value) {
      this.$emit('input', value)
    },
  },
  mounted() {
    this.innerValue = this.value
  }
}