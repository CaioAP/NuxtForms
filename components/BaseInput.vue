<template>
  <b-input 
    v-model="innerValue"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import BaseInputMixin from '@/mixins/BaseInput.js'

export default {
  mixins: [BaseInputMixin],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
  },
}
</script>