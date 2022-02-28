<template>
  <div class="possible-answers-input">
    <span>{{ getAnswerNumber() }}. </span>
    <BaseInput v-model="answerValue"/>
    <BaseButton 
      variant="outline-danger"
      class="btn btn-remove"
      @click="remove(id)"
    >
      <fa-icon icon="trash" />
    </BaseButton>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      answerValue: ''
    }
  },
  watch: {
    value(newValue) {
      this.answerValue = newValue
    },

    answerValue(newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted () {
    this.answerValue = this.value
  },
  methods: {
    getAnswerNumber() {
      return this.index + 1
    },

    remove() {
      this.$emit('remove', this.id)
    }
  },
}
</script>

<style scoped>
.possible-answers-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-remove {
  height: 100%;
}
</style>