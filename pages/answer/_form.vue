<template>
  <main class="container">
    <BaseAlert 
      :show="alert.show"
      dismissible
      :variant="alert.variant"
      @dismissed="alert = { ...alert, show: false }"
    >
      {{ alert.message }}
    </BaseAlert>

    <FormHeader class="form-answer-header">
      <template #title>
        <h1 class="form-answer-title">{{ title }}</h1>
      </template>
      <template #action>
        <BaseButton class="btn btn-primary btn-save" @click="saveAnswers">
          <fa-icon icon="floppy-disk" />
          Save Answers
        </BaseButton>
      </template>
    </FormHeader>

    <section class="form-email" aria-label="Your email">
      <BaseCard>
        <label class="form-email-label" for="email">
          Your email: <span>*</span>
        </label>
        <BaseInput 
          id="email" 
          v-model="email" 
          placeholder="Your email" 
          required
          trim
        />
      </BaseCard>
    </section>

    <section class="form-questions" aria-label="Form questions">
      <FormAnswer
        v-for="question in questions" 
        :key="question.questionId" 
        v-bind="question"
        @answer-updated="updateAnswer"
      />
    </section>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, params}) {
    const data = (await $axios.get(`/forms/${params.form}`)).data
    const id = data.form._id
    const title = data.form.title

    const questions = data.questions.map(question => {
      question.questionId = question._id
      question.selected = null

      question.possibleAnswers = question.possibleAnswers.map(possAns => {
        possAns.text = possAns.value
        possAns.value = possAns.id
        return possAns
      })

      return question
    })

    return { id, title, questions }
  },
  data() {
    return {
      email: '',
      alert: {
        show: false,
        message: '',
        variant: 'success'
      }
    }
  },
  methods: {
    updateAnswer(answerData) {
      const question = this.questions.find(quest => quest.questionId === answerData.questionId)
      question.selected = answerData.value
    },

    async saveAnswers() {
      const valid = this.validate()
      if (!valid) return

      try {
        const body = {
          answers: this.questions.map(question => ({
            questionId: question.questionId,
            value: question.selected
          }))
        }
        const { data } = await this.$axios.post(
          `/answers/${this.id}/${this.email}`,
          body
        )

        if (data) {
          this.alert = {
          show: true,
          message: 'Answers saved successfully!',
          variant: 'success'
          }
        }
      } catch (error) {
        this.alert = {
          show: true,
          message: error.message,
          variant: 'danger'
        }
      }
    },

    validate() {
      const allQuestionsAnswered = this.questions.reduce((selected, question) => {
        if (selected && !question.selected) return (selected = 0)
        return selected
      }, 1)
      
      if (!this.email || !this.email.match(/@/)) {
        this.alert = {
          show: true,
          message: 'Email cannot be empty and must be valid',
          variant: 'danger'
        }
        return false
      }

      if (!allQuestionsAnswered) {
        this.alert = {
          show: true,
          message: 'All questions must be answered',
          variant: 'danger'
        }
        return false
      }

      return true
    }
  },
}
</script>

<style scoped>
.form-answer-header {
  margin-block: 1rem;
}

.form-answer-header >>> .card-body {
  gap: 1rem;
}

.form-answer-title {
  font-size: 2rem;
}

.form-email-label > span {
  color: var(--red);
}

.form-questions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
</style>