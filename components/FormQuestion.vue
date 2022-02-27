<template>
  <BaseCard class="question">
    <div class="question-title">
      <BaseInput 
        v-model="questionTitle" 
        class="question-title--input"
        placeholder="Question description"
      />
      <BaseButton 
        variant="danger"
        class="btn btn-remove"
        @click="remove"
      >
        <fa-icon icon="trash" />
        Remove question
      </BaseButton>
    </div>

    <div class="question-answers">
      <p>Possible answers:</p>

      <div class="possible-answers">
        <FormQuestionAnswer 
          v-for="(answer, idx) in questionAnswers"
          :key="answer.id"
          v-model="answer.value"
          v-bind="answer"
          :index="idx"
          @remove="removeAnswer"
        />

        <BaseButton 
          class="btn btn-outline-primary btn-add"
          @click="addAnswer"
        >
          <fa-icon icon="plus" />
          Add answer
        </BaseButton>

        <BaseAlert 
          :show="alert.show"
          dismissible
          :variant="alert.variant"
          @dismissed="alert = { ...alert, show: false }"
        >
          {{ alert.message }}
        </BaseAlert>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseAlert from '@/components/BaseAlert.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import FormQuestionAnswer from '@/components/FormQuestionAnswer.vue'

export default {
  components: {
    BaseAlert,
    BaseInput,
    BaseButton,
    FormQuestionAnswer,
  },
  props: {
    formId: {
      type: String,
      required: true,
    },
    id: {
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
    questionAlert: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      questionTitle: '',
      questionAnswers:  [],
      alert: {
        show: false,
        message: '',
        variant: 'danger'
      },
    }
  },
  watch: {
    questionTitle(newValue) {
      this.$emit('title-updated', {id: this.id, title: newValue })
    },
    
    questionAnswers(newValue) {
      this.$emit('answers-updated', {id: this.id, answers: newValue })
    },

    questionAlert(newValue) {
      this.alert = newValue
    }
  },
  created() {
    this.questionTitle = this.title
    this.questionAnswers = this.possibleAnswers
  },
  methods: {
    addAnswer() {
      const lastAnswerId = this.questionAnswers[this.questionAnswers.length - 1].id
      this.questionAnswers.push({
        id: lastAnswerId + 1,
        value: '',
      })
    },

    remove() {
      this.$emit('remove', this.id)
    },

    removeAnswer(id) {
      if (this.questionAnswers.length > 2) {
        const answerIdx = this.questionAnswers.findIndex(answer => answer.id === id)
        return this.questionAnswers.splice(answerIdx, 1)
      }

      this.alert = {
        show: true,
        message: "The question must have at least two options of answer",
        variant: 'danger'
      }
    },
  },
}
</script>

<style scoped>
.question-title {
  display: flex;
  gap: 1rem;
}

.question-answers {
  margin-top: 1rem;
}

.question-answers > p {
  margin-bottom: 1rem;
}

.possible-answers {
  display: grid;
  gap: 0.5rem;
}

.btn-add {
  margin-top: 1rem;
}
</style>