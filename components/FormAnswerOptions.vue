<template>
  <b-form-group v-slot="{ ariaDescribedby }" :label="label">
    <BaseRadioGroup
      v-model="selected"
      :options="possibleAnswers"
      :aria-describedby="ariaDescribedby"
    />
  </b-form-group>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    possibleAnswers: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      selected: ''
    }
  },
  watch: {
    selected(newValue) {
      this.$emit('input', newValue)
    }
  },
}
</script>