<template>
  <BaseCard class="answer">
    <h2 class="answer-title">{{ title }}</h2>

    <div class="answer-options">
      <div class="possible-answers">
        <FormAnswerOptions
          label="Choose one option:"
          :possible-answers="possibleAnswers"
          @input="answerSelected"
        />
      </div>
    </div>
  </BaseCard>
</template>

<script>
export default {
  props: {
    questionId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: ''
    },
    possibleAnswers: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      alert: {
        show: false,
        message: '',
        variant: 'danger'
      },
    }
  },
  methods: {
    answerSelected(answer) {
      this.$emit('answer-updated', { 
        questionId: this.questionId, 
        value: answer 
      })
    }
  },
}
</script>

<style scoped>
.answer-title {
  font-size: 1.5rem;
}

.answer-options {
  margin-top: 1rem;
}
</style>