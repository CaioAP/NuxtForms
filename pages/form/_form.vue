<template>
  <main class="container">
    <div class="header-actions">
      <BaseButtonBack />
      
      <BaseRadioGroup
        v-if="false"
        v-model="view"
        :options="views"
        button-variant="outline-primary"
        buttons
      />
    </div>

    <BaseAlert 
      :show="alert.show"
      dismissible
      :variant="alert.variant"
      @dismissed="alert = { ...alert, show: false }"
    >
      {{ alert.message }}
    </BaseAlert>

    <FormHeader class="form-create-header">
      <template #title>
        <BaseInput v-model="title" placeholder="Your form title"/>
      </template>
      <template #action>
        <BaseButton 
          class="btn btn-primary btn-save" 
          :disabled="!!numberOfAnswers"
          @click="saveForm"
        >
          <fa-icon icon="floppy-disk" />
          Save Form
        </BaseButton>
      </template>
    </FormHeader>

    <section class="form-email" aria-label="Your email">
      <BaseCard>
        <span>Share your form: </span>
        <a :href="answersUrl">
          {{ answersUrl }}
        </a>
      </BaseCard>
    </section>

    <section class="form-questions" aria-label="Form questions">
      <FormQuestion
        v-for="question in questions" 
        :key="question.id" 
        v-bind="question"
        @title-updated="updateQuestionTitle"
        @answers-updated="updateQuestionAnswers"
        @remove="removeQuestion"
      />
    </section>

    <footer>
      <BaseButton class="btn btn-primary btn-save" @click="addQuestion">
        <fa-icon icon="plus" />
        Add question
      </BaseButton>
    </footer>
  </main>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const data = (await $axios.get(`/forms/${params.form}`)).data
    const id = data.form._id
    const title = data.form.title
    const numberOfAnswers = data.form.numberOfAnswers

    const questions = data.questions.map(quest => {
      quest.id = quest._id
      return quest
    })

    return { id, title, questions, numberOfAnswers }
  },
  data() {
    return {
      view: 'questions',
      alert: {
        show: false,
        message: '',
        variant: 'success'
      }
    }
  },
  computed: {
    answersUrl() {
      return `http://localhost:3000/answer/${this.id}`
    },

    views() {
      return [
        {
          text: 'Questions',
          value: 'questions'
        },
        {
          text: 'Answers',
          value: 'answers'
        },
      ]
    }
  },
  methods: {
    updateQuestionTitle(questionUpdated) {
      const question = this.findQuestionById(questionUpdated.id)
      question.title = questionUpdated.title
    },

    updateQuestionAnswers(questionUpdated) {
      const question = this.findQuestionById(questionUpdated.id)
      question.answers = questionUpdated.answers
    },

    findQuestionById(id) {
      return this.questions.find(quest => quest.id === id)
    },

    async saveForm() {
      const valid = this.validate()
      if (!valid) return

      try {
        const body = {
          title: this.title,
          questions: this.questions,
        }
        const { data } = await this.$axios.patch(`/forms/${this.id}`, body)

        if (data) this.alert = {
          show: true,
          message: 'Form saved successfuly!',
          variant: 'success'
        }
      } catch (error) {
        this.alert = {
          show: false,
          message: 'Error while trying to save the form!',
          variant: 'danger'
        }
      }
    },

    validate() {
      if (this.numberOfAnswers) {
        this.alert = {
          show: true,
          message: 'Cannot update, this form already has answers!',
          variant: 'danger'
        }
        return false
      }

      return true
    },

    async addQuestion() {
      const body = { formId: this.id }
      const { data } = await this.$axios.post('/questions', body)

      this.questions.push({
        formId: data.formId,
        id: data._id,
        title: data.title,
        possibleAnswers: data.possibleAnswers,
        questionAlert: {}
      })
    },

    async removeQuestion(id) {
      await this.$axios.delete(`/questions/${id}`)

      const questionIndex = this.questions.findIndex(question => question.id === id)

      if (this.questions.length > 1) {
        return this.questions.splice(questionIndex, 1)
      }
      
      const question = this.questions[questionIndex]
      question.questionAlert = {
        show: true,
        message: 'The form must have at least one question',
        variant: 'danger'
      }
    }
  },
}
</script>

<style scoped>
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 93.4%;
}

.form-create-header {
  margin-block: 1rem;
}

.form-create-header >>> .card-body {
  gap: 1rem;
}

.form-questions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

footer {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>